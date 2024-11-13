import React, { useState, useRef, useEffect } from 'react';
import { Search, Mic, Image as ImageIcon, History, ChevronDown } from 'lucide-react';
import { mockSuggestions, categories } from './data/mockData';
import { SearchSuggestion, BookCategory } from './types';
import { SearchResults } from './SearchResults';
import { ThemeToggle } from './ThemeToggle';

interface SearchBarProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export default function SearchBar({ isDarkMode, setIsDarkMode }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<BookCategory>('Fiction');
  const [showCategories, setShowCategories] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<SearchSuggestion | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query) {
      const filtered = mockSuggestions.filter(
        (item) =>
          item.text.toLowerCase().includes(query.toLowerCase()) &&
          (selectedCategory === 'Fiction' || item.category === selectedCategory)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query, selectedCategory]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setShowCategories(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
      };

      recognition.start();
    } else {
      alert('Voice search is not supported in your browser.');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      alert('Image search functionality would process: ' + file.name);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      setSearchHistory((prev) => [query, ...prev.slice(0, 4)]);
      const found = mockSuggestions.find(
        (item) => item.text.toLowerCase().includes(query.toLowerCase())
      );
      setSelectedSuggestion(found || null);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto" ref={searchRef}>
      <div className="relative transition-all duration-300">
        <div
          className={`
            flex items-center gap-2 p-3 
            bg-white dark:bg-gray-800 
            rounded-t-lg shadow-lg 
            border border-gray-200 dark:border-gray-700 
            ${isExpanded ? 'ring-2 ring-blue-500' : ''}
          `}
        >
          <Search
            className="w-5 h-5 text-gray-400 dark:text-gray-500 cursor-pointer 
                      hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            onClick={handleSearch}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for books..."
            className="flex-1 bg-transparent outline-none 
                     text-gray-700 dark:text-gray-200 
                     placeholder-gray-400 dark:placeholder-gray-500"
          />
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="flex items-center gap-1 px-3 py-1.5 
                         text-sm font-medium
                         text-gray-600 dark:text-gray-300 
                         hover:bg-gray-100 dark:hover:bg-gray-700 
                         rounded-full transition-colors"
              >
                {selectedCategory}
                <ChevronDown className="w-4 h-4" />
              </button>

              {showCategories && (
                <div
                  className="absolute right-0 mt-2 w-48 py-2
                            bg-white dark:bg-gray-800 
                            rounded-lg shadow-xl
                            border border-gray-200 dark:border-gray-700
                            z-50"
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowCategories(false);
                      }}
                      className="w-full px-4 py-2 text-left
                               text-gray-700 dark:text-gray-300
                               hover:bg-gray-100 dark:hover:bg-gray-700
                               transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 
                       rounded-full transition-colors"
            >
              <ImageIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={startVoiceSearch}
              className={`
                p-2 rounded-full transition-colors
                ${isListening
                  ? 'bg-red-100 dark:bg-red-900 text-red-500'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400'}
              `}
            >
              <Mic className="w-5 h-5" />
            </button>
            <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </div>
        </div>

        {isExpanded && (suggestions.length > 0 || searchHistory.length > 0) && (
          <div
            className="absolute w-full bg-white dark:bg-gray-800 
                        shadow-lg border-x border-b border-gray-200 dark:border-gray-700 
                        rounded-b-lg z-50"
          >
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                onClick={() => {
                  setQuery(suggestion.text);
                  setSelectedSuggestion(suggestion);
                  setIsExpanded(false);
                }}
                className="flex items-center gap-2 px-4 py-2 
                         hover:bg-gray-100 dark:hover:bg-gray-700 
                         cursor-pointer transition-colors"
              >
                <Search className="w-4 h-4 text-gray-400" />
                <div>
                  <span className="text-gray-700 dark:text-gray-200">
                    {suggestion.text}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    by {suggestion.author}
                  </span>
                </div>
              </div>
            ))}

            {searchHistory.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700">
                <div className="px-4 py-2 text-sm text-gray-500">Recent Searches</div>
                {searchHistory.map((historyItem, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => setQuery(historyItem)}
                  >
                    <History className="w-4 h-4 inline-block mr-2" />
                    {historyItem}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {selectedSuggestion && (
        <SearchResults
          suggestion={selectedSuggestion}
          onMediaAction={(url) => window.open(url, '_blank')}
        />
      )}
    </div>
  );
}
