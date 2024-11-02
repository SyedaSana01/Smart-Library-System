import React, { useState } from 'react';
import { Sparkles, BookOpen, ThumbsUp, History, RefreshCw } from 'lucide-react';
import type { Book } from '../../types';

function AIRecommendations() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [recommendations, setRecommendations] = useState<Book[]>([
    {
      id: 1,
      title: 'Clean Architecture',
      author: 'Robert C. Martin',
      cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=1000',
      status: 'Available',
      isbn: '978-0134494166',
      category: 'Technology',
      description: 'Recommended based on your interest in Clean Code',
    },
    {
      id: 2,
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      cover: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1000',
      status: 'Available',
      isbn: '978-1449373320',
      category: 'Technology',
      description: 'Popular among software engineers',
    },
  ]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      const newRecommendations = [
        ...recommendations,
        {
          id: 3,
          title: 'The Pragmatic Programmer',
          author: 'David Thomas, Andrew Hunt',
          cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=1000',
          status: 'Available',
          isbn: '978-0201616224',
          category: 'Technology',
          description: 'Based on your reading history',
        },
      ];
      setRecommendations(newRecommendations);
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">AI Recommendations</h2>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-3 py-1 text-sm text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((book) => (
          <div key={book.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
            <img
              src={book.cover}
              alt={book.title}
              className="w-24 h-32 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
              <p className="text-sm text-gray-500 mt-2">{book.description}</p>
              <div className="mt-4 flex gap-2">
                <button className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800">
                  <BookOpen className="w-4 h-4" />
                  View Details
                </button>
                <button className="flex items-center gap-1 text-sm text-green-600 hover:text-green-800">
                  <ThumbsUp className="w-4 h-4" />
                  Interested
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <History className="w-4 h-4" />
            Recommendations updated hourly
          </div>
          <span className="text-sm text-gray-500">
            Based on your reading preferences and borrowing history
          </span>
        </div>
      </div>
    </div>
  );
}

export default AIRecommendations;