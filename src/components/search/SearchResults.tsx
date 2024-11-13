import React from 'react';
import { Star, BookOpen, Library, BookCopy, Hash, Globe, Building2, Bookmark } from 'lucide-react';
import { SearchSuggestion } from './types';
import { MediaButton } from './MediaButton';

interface SearchResultsProps {
  suggestion: SearchSuggestion;
  onMediaAction: (url?: string) => void;
}

export function SearchResults({ suggestion, onMediaAction }: SearchResultsProps) {
  return (
    <div className="mt-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:shadow-2xl">
      <div className="flex gap-8">
        <div className="w-48 h-64 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
          <img
            src={suggestion.thumbnail}
            alt={suggestion.text}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {suggestion.text}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
                by {suggestion.author}
              </p>
            </div>
            
            <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900 px-3 py-1 rounded-full">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="text-lg font-semibold text-yellow-700 dark:text-yellow-300">
                {suggestion.rating}
              </span>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              <BookOpen className="w-4 h-4 inline-block mr-2" />
              Published in {suggestion.year} • {suggestion.libraryDetails.totalPages} pages
            </p>
            
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <div className="space-y-2">
                <p className="flex items-center text-gray-600 dark:text-gray-300">
                  <Library className="w-4 h-4 mr-2" />
                  Shelf: {suggestion.libraryDetails.shelfNumber}
                </p>
                <p className="flex items-center text-gray-600 dark:text-gray-300">
                  <Building2 className="w-4 h-4 mr-2" />
                  Rack: {suggestion.libraryDetails.rackNumber}
                </p>
                <p className="flex items-center text-gray-600 dark:text-gray-300">
                  <BookCopy className="w-4 h-4 mr-2" />
                  Available: {suggestion.libraryDetails.copiesAvailable} copies
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex items-center text-gray-600 dark:text-gray-300">
                  <Hash className="w-4 h-4 mr-2" />
                  ISBN: {suggestion.libraryDetails.isbn}
                </p>
                <p className="flex items-center text-gray-600 dark:text-gray-300">
                  <Globe className="w-4 h-4 mr-2" />
                  Language: {suggestion.libraryDetails.language}
                </p>
                <p className="flex items-center text-gray-600 dark:text-gray-300">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Edition: {suggestion.libraryDetails.edition}
                </p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300">
              {suggestion.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {suggestion.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <MediaButton
              available={!!suggestion.mediaLinks.pdf}
              onClick={() => onMediaAction(suggestion.mediaLinks.pdf)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}