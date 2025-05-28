from flask import Flask, request, jsonify
import sys
import os
import re

# Add path to import your summarizer.py
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../server/python')))
from summarizer import (
    fetch_dnh_api_articles,
    classify_article,
    textrank_like_summary,
    flan_t5_summarize,
    load_model
)

app = Flask(__name__)

# Initialize model once globally so it loads only once per app instance
tokenizer, model, device = load_model()

@app.route('/api/summarize', methods=['POST'])
def summarize_route():
    data = request.get_json()
    text = data.get('text', '')
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    # Your existing summarize_text uses global tokenizer/model/device
    from summarizer import summarize_text
    summary = summarize_text(text)
    return jsonify({'summary': summary})

@app.route('/api/news-summaries', methods=['GET'])
def news_summaries():
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
    
    # Fetch articles
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

    return jsonify(category_map)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
