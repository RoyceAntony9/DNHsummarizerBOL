import React from 'react';
import { format } from 'date-fns';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-neutral-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-neutral-500 text-sm">
              © {new Date().getFullYear()} Daily News Highlights
            </p>
            <p className="text-neutral-400 text-xs">
              Last updated: {format(new Date(), 'MMMM d, yyyy')}
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-neutral-500 hover:text-primary-600 transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-neutral-500 hover:text-primary-600 transition-colors text-sm"
            >
              About
            </a>
            <a 
              href="#" 
              className="text-neutral-500 hover:text-primary-600 transition-colors text-sm"
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="text-neutral-500 hover:text-primary-600 transition-colors text-sm"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;