import React from 'react';
import { Bell, BookOpen, AlertCircle } from 'lucide-react';

interface Notification {
  id: number;
  type: 'due_soon' | 'overdue' | 'available' | 'system';
  message: string;
  time: string;
  read: boolean;
}

function NotificationCenter() {
  const notifications: Notification[] = [
    {
      id: 1,
      type: 'due_soon',
      message: '"Clean Code" is due in 2 days',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      type: 'available',
      message: '"The Design of Everyday Things" is now available',
      time: '4 hours ago',
      read: false,
    },
    {
      id: 3,
      type: 'overdue',
      message: '"Atomic Habits" is overdue by 3 days',
      time: '1 day ago',
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'due_soon':
        return <Bell className="w-5 h-5 text-yellow-500" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'available':
        return <BookOpen className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-96">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          <button className="text-sm text-indigo-600 hover:text-indigo-800">
            Mark all as read
          </button>
        </div>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
              !notification.read ? 'bg-indigo-50' : ''
            }`}
          >
            <div className="flex gap-3">
              {getNotificationIcon(notification.type)}
              <div className="flex-1">
                <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200">
        <button className="text-sm text-gray-600 hover:text-gray-800">
          View all notifications
        </button>
      </div>
    </div>
  );
}

export default NotificationCenter;