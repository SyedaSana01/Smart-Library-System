import React from 'react';
import { BarChart, BookOpen, Users, TrendingUp } from 'lucide-react';

function LibraryStats() {
  const monthlyStats = [
    { month: 'Jan', borrowings: 245, returns: 218 },
    { month: 'Feb', borrowings: 312, returns: 284 },
    { month: 'Mar', borrowings: 287, returns: 265 },
  ];

  const popularCategories = [
    { category: 'Technology', count: 156 },
    { category: 'Fiction', count: 143 },
    { category: 'Science', count: 128 },
    { category: 'Business', count: 98 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Activity</h3>
          <div className="space-y-4">
            {monthlyStats.map((stat) => (
              <div key={stat.month} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{stat.month}</span>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{stat.borrowings} borrowed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{stat.returns} returned</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Categories</h3>
          <div className="space-y-4">
            {popularCategories.map((category) => (
              <div key={category.category} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{category.category}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full"
                      style={{
                        width: `${(category.count / popularCategories[0].count) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-700">{category.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibraryStats;