import React, { useState } from 'react';
import { Bell, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';

interface Notification {
  id: number;
  type: 'due_soon' | 'overdue' | 'available' | 'system';
  message: string;
  time: string;
  read: boolean;
}

const NotificationCenter = () => {
  // Initial state for notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: 'due_soon', message: '"Clean Code" is due in 2 days', time: '2 hours ago', read: false },
    { id: 2, type: 'available', message: '"The Design of Everyday Things" is now available', time: '4 hours ago', read: false },
    { id: 3, type: 'overdue', message: '"Atomic Habits" is overdue by 3 days', time: '1 day ago', read: true },
    { id: 4, type: 'available', message: '"The Pragmatic Programmer" is available', time: '3 hours ago', read: false },
    { id: 5, type: 'due_soon', message: '"Refactoring" is due in 1 day', time: '6 hours ago', read: true }
  ]);

  // State for filtering by category
  const [activeTab, setActiveTab] = useState<'all' | 'due_soon' | 'overdue' | 'available'>('all');

  // Mark all notifications as read
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
  };

  // Filter notifications based on the active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    return notification.type === activeTab;
  });

  // Get the appropriate icon based on the notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'due_soon':
        return <Bell className="w-6 h-6 text-yellow-500" />;
      case 'overdue':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      case 'available':
        return <BookOpen className="w-6 h-6 text-green-500" />;
      default:
        return <CheckCircle className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg max-w-md mx-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bell className="w-6 h-6 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Notification Center</h3>
        </div>
        <button
          className="text-sm text-indigo-600 hover:text-indigo-800"
          onClick={markAllAsRead}
        >
          Mark all as read
        </button>
      </div>

      {/* Tabs for filtering */}
      <div className="flex justify-around border-b border-gray-200 bg-gray-50">
        <button
          className={`p-2 w-full ${activeTab === 'all' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button
          className={`p-2 w-full ${activeTab === 'due_soon' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('due_soon')}
        >
          Due Soon
        </button>
        <button
          className={`p-2 w-full ${activeTab === 'overdue' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('overdue')}
        >
          Overdue
        </button>
        <button
          className={`p-2 w-full ${activeTab === 'available' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('available')}
        >
          Available
        </button>
      </div>

      {/* Notification List */}
      <div className="max-h-[400px] overflow-y-auto p-2">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 mb-2 rounded-lg shadow-sm transition-colors border-l-4 ${
                notification.type === 'overdue' ? 'border-red-500' : notification.type === 'due_soon' ? 'border-yellow-500' : 'border-green-500'
              } ${
                !notification.read ? 'bg-indigo-50 hover:bg-indigo-100' : 'bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex gap-3 items-center">
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <p className={`text-sm ${!notification.read ? 'font-medium text-gray-800' : 'text-gray-600'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-6">No new notifications</p>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 text-center bg-gray-50">
        <button className="text-sm text-indigo-600 hover:text-indigo-800">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationCenter;


