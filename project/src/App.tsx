import React, { useState } from 'react';
import Header from './components/Header';
import NewsSummarySection from './components/NewsSummarySection';
import Footer from './components/Footer';
import { useFetchNews } from './hooks/useFetchNews';

function App() {
  const [shouldFetch, setShouldFetch] = useState(false);
  const { news, loading, error, fetchNews } = useFetchNews();

  const handleSummarize = () => {
    setShouldFetch(true);
    fetchNews();
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header onSummarize={handleSummarize} loading={loading} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <NewsSummarySection 
          news={news} 
          loading={loading} 
          error={error} 
          shouldDisplay={shouldFetch}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;