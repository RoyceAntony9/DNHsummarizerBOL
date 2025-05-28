import React from 'react';
import { Article } from '../types';
import { getCategoryColor, getCategoryIcon } from '../utils/categoryUtils';

interface NewsCardProps {
  article: Article;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const { category, title, summary } = article;
  const CategoryIcon = getCategoryIcon(category);
  const categoryColor = getCategoryColor(category);
  
  return (
    <div className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden h-full flex flex-col">
      <div className={`px-4 py-2 text-white font-medium flex items-center text-sm ${categoryColor}`}>
        <CategoryIcon className="w-4 h-4 mr-2" />
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-neutral-600 line-clamp-3 text-sm flex-grow">
          {summary}
        </p>
        
        <div className="mt-4 pt-3 border-t border-neutral-100">
          <button className="text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors">
            Read more
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;