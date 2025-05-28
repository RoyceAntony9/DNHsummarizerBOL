import React from 'react';
import { Article, NewsData } from '../types';
import NewsCard from './NewsCard';
import { Loader2, AlertTriangle, Newspaper } from 'lucide-react';

interface NewsSummarySectionProps {
  news: NewsData;
  loading: boolean;
  error: string | null;
  shouldDisplay: boolean;
}

const NewsSummarySection: React.FC<NewsSummarySectionProps> = ({ 
  news, 
  loading, 
  error,
  shouldDisplay
}) => {
  if (!shouldDisplay) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Newspaper className="h-16 w-16 text-primary-200 mb-4" />
        <h2 className="text-2xl font-semibold text-neutral-400 mb-2">
          No News Summaries Yet
        </h2>
        <p className="text-neutral-500 text-center max-w-md">
          Click the "Summarize News" button above to fetch and summarize the latest news articles.
        </p>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-12 w-12 text-primary-600 animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-neutral-700">
          Summarizing News Articles...
        </h2>
        <p className="text-neutral-500 mt-2">
          Our AI is working on creating concise summaries for you.
        </p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-red-700 mb-2">
          Unable to fetch news
        </h2>
        <p className="text-red-600">
          {error}
        </p>
        <p className="text-neutral-600 mt-4">
          Please try again in a few moments or contact support if the issue persists.
        </p>
      </div>
    );
  }
  
  if (Object.keys(news).length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-yellow-700 mb-2">
          No news articles found
        </h2>
        <p className="text-neutral-600">
          There seem to be no news articles available at the moment.
          Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {Object.entries(news).map(([category, articles]) => (
        <div key={category} className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-900 border-b pb-2">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article: Article, index: number) => (
              <NewsCard key={`${category}-${index}`} article={article} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsSummarySection;