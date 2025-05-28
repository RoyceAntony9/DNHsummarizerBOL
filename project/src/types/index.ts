export interface Article {
  category: string;
  title: string;
  summary: string;
  url?: string;
  source?: string;
  publishedAt?: string;
}

export interface NewsData {
  [category: string]: Article[];
}