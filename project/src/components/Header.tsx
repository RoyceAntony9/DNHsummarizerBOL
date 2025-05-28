import React from 'react';
import { Newspaper, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onSummarize: () => void;
  loading: boolean;
}

const Header: React.FC<HeaderProps> = ({ onSummarize, loading }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Newspaper className="h-8 w-8 text-primary-600 mr-2" />
          <h1 className="text-2xl font-bold text-neutral-900">
            Daily News Highlights
          </h1>
        </div>
        
        <button
          onClick={onSummarize}
          disabled={loading}
          className={`
            flex items-center justify-center px-6 py-3 rounded-lg font-medium
            transition-all duration-200 ease-in-out
            ${loading 
              ? 'bg-primary-200 text-primary-700 cursor-not-allowed' 
              : 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800'
            }
          `}
        >
          {loading ? (
            <>
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              Summarizing...
            </>
          ) : (
            'Summarize News'
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;