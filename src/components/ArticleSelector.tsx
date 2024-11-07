import React, { useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Article } from '../types/types';
import { articles } from '../data/articles';

interface Props {
  onSelect: (article: Article) => void;
  autoFocus?: boolean;
}

export function ArticleSelector({ onSelect, autoFocus }: Props) {
  const [search, setSearch] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (autoFocus && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [autoFocus]);

  const filteredArticles = search.trim() === '' 
    ? articles
    : articles.filter(article => 
        article.code.toLowerCase().includes(search.toLowerCase()) ||
        article.designation.toLowerCase().includes(search.toLowerCase())
      );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && filteredArticles.length > 0) {
      onSelect(filteredArticles[selectedIndex]);
      setSearch('');
      setSelectedIndex(0);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredArticles.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === '+') {
      e.preventDefault();
      if (filteredArticles.length > 0) {
        onSelect(filteredArticles[selectedIndex]);
        setSearch('');
        setSelectedIndex(0);
      }
    }
  };

  const millimesToDinars = (millimes: number) => {
    return (millimes / 1000).toFixed(3);
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  return (
    <div className="w-full">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          ref={searchInputRef}
          type="text"
          className="w-full pl-8 pr-4 py-1.5 border rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder="Rechercher un article par code ou désignation..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="mt-1 max-h-48 overflow-auto border rounded-lg">
        {filteredArticles.length === 0 ? (
          <div className="px-3 py-2 text-gray-500 text-sm">Aucun article trouvé</div>
        ) : (
          filteredArticles.map((article, index) => (
            <button
              key={`${article.code}-${article.designation}`}
              className={`w-full text-left px-3 py-1.5 flex justify-between items-center text-sm ${
                index === selectedIndex ? 'bg-blue-50' : 'hover:bg-gray-100'
              }`}
              onClick={() => {
                onSelect(article);
                setSearch('');
                setSelectedIndex(0);
              }}
            >
              <div>
                <span className="font-medium">{article.code}</span>
                <span className="ml-2 text-gray-600">{article.designation}</span>
              </div>
              <div className="text-gray-600 whitespace-nowrap">
                {millimesToDinars(article.prix)} DT/{article.unite}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}