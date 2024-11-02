import React, { useState } from 'react';
import { Search, Filter, Mic, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter: () => void;
  onVoiceSearch: () => void;
}

function SearchBar({ onSearch, onFilter, onVoiceSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    onVoiceSearch();
    // Simulate voice recognition ending
    setTimeout(() => setIsListening(false), 2000);
  };

  return (
    <form onSubmit={handleSearch} className="relative flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author, ISBN..."
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <button
        type="button"
        onClick={handleVoiceSearch}
        className={`p-2 rounded-md ${
          isListening
            ? 'bg-red-100 text-red-600'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Mic className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={onFilter}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
      >
        <Filter className="w-5 h-5" />
        Filters
      </button>
    </form>
  );
}

export default SearchBar;