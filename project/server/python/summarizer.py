import requests
import re
import torch
import html
import json
from transformers import T5Tokenizer, T5ForConditionalGeneration

def load_model(model_name="google/flan-t5-base"):
    tokenizer = T5Tokenizer.from_pretrained(model_name)
    model = T5ForConditionalGeneration.from_pretrained(model_name)
    device = torch.device("cpu")
    model.to(device)
    return tokenizer, model, device

def textrank_like_summary(text):
    sentences = re.split(r'(?<=[.!?]) +', text)
    top_sentences = sorted(sentences, key=len, reverse=True)[:2]
    return ' '.join(top_sentences)

def flan_t5_summarize(text, tokenizer, model, device):
    cleaned_text = re.sub(r'<.*?>', '', text)
    input_text = "summarize: " + cleaned_text.strip().replace("\n", " ")
    inputs = tokenizer(input_text, return_tensors="pt", max_length=512, truncation=True).to(device)
    outputs = model.generate(
        inputs.input_ids,
        max_length=100,
        num_beams=8,
        length_penalty=2.0,
        no_repeat_ngram_size=3,
        repetition_penalty=3.0,
        early_stopping=True
    )
    raw_summary = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return html.unescape(raw_summary)

def parse_dnh_response(text):
    lines = text.strip().split('\n')
    articles = []
    for i in range(0, len(lines), 3):
        try:
            category = lines[i].strip()
            title = lines[i+1].strip()
            body = lines[i+2].strip()
            articles.append({"category": category, "title": title, "text": body})
        except IndexError:
            continue
    return articles

def fetch_dnh_api_articles():
    url = "https://api.dailynewshighlights.com/country/india/summary"
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return parse_dnh_response(response.text)
    else:
        return []

def classify_article(text, title, category_keywords, allowed_categories, default_category="others"):
    text_to_categorize = (title + " " + text).lower()
    text_to_categorize = re.sub(r'[^a-z0-9\s]', '', text_to_categorize)

    category_scores = {cat.lower(): 0 for cat in allowed_categories}
    for cat, keywords in category_keywords.items():
        for kw in keywords:
            if re.search(rf'\b{re.escape(kw)}\b', text_to_categorize):
                category_scores[cat] += 1

    best_category = max(category_scores, key=category_scores.get)
    
    if category_scores[best_category] == 0:
        return default_category

    if any(re.search(rf'\b{re.escape(kw)}\b', text_to_categorize) for kw in category_keywords.get("sports", [])):
        return "sports"

    return best_category

def main():
    tokenizer, model, device = load_model()

    allowed_categories = {"Business", "Technology", "Entertainment", "Sports", "Health/Lifestyle", "Education", "Politics"}
    category_keywords = {
        "business": ["economy", "finance", "market", "stock", "ipo", "investment", "trading", "inflation", "banking"],
        "technology": ["ai", "artificial intelligence", "software", "hardware", "cybersecurity", "cloud", "tech"],
        "entertainment": ["movie", "film", "actor", "actress", "music", "concert", "bollywood", "hollywood"],
        "sports": ["football", "cricket", "soccer", "olympics", "tennis", "match", "tournament", "league"],
        "health/lifestyle": ["health", "fitness", "wellness", "diet", "nutrition", "yoga", "medical"],
        "education": ["school", "college", "university", "exam", "student", "teacher", "education"],
        "politics": ["election", "vote", "government", "policy", "law", "parliament", "minister"]
    }

    try:
        dnh_articles = fetch_dnh_api_articles()
        max_articles = 10
        dnh_articles = dnh_articles[:max_articles]

        category_map = {}
        unwanted_sentence = "If you're looking for a place to stay in San Diego, look no further than Expedia.com."
        irrelevant_patterns = [
            r"it's been a while",
            r"i thought i would give it a try",
            r"if you're looking for a place to stay",
            r"thank you for having me"
        ]

        for article in dnh_articles:
            try:
                extractive = textrank_like_summary(article['text'])
                final_summary = flan_t5_summarize(extractive, tokenizer, model, device)

                if final_summary.strip() == unwanted_sentence or any(re.search(pat, final_summary.lower()) for pat in irrelevant_patterns):
                    continue

                best_category = classify_article(article['text'], article['title'], category_keywords, allowed_categories)
                if best_category not in category_map:
                    category_map[best_category] = []

                category_map[best_category].append({
                    "title": article['title'],
                    "summary": final_summary.strip()
                })
            except Exception:
                continue

        print(json.dumps(category_map))

    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()

# Initialize model once (so you don't load every request)
tokenizer, model, device = load_model()

def summarize_text(text: str) -> str:
    # Run extractive summary (TextRank-like)
    extractive = textrank_like_summary(text)
    # Run abstractive summary (Flan-T5)
    final_summary = flan_t5_summarize(extractive, tokenizer, model, device)
    
    # Filter out unwanted sentences (similar to main)
    unwanted_sentence = "If you're looking for a place to stay in San Diego, look no further than Expedia.com."
    irrelevant_patterns = [
        r"it's been a while",
        r"i thought i would give it a try",
        r"if you're looking for a place to stay",
        r"thank you for having me"
    ]
    if final_summary.strip() == unwanted_sentence or any(re.search(pat, final_summary.lower()) for pat in irrelevant_patterns):
        return "Summary not available due to irrelevant content."
    
    return final_summary.strip()
