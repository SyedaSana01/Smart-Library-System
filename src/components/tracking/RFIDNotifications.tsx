import React, { useState } from 'react';
import { Bell, AlertCircle, Check, X, Clock, MapPin } from 'lucide-react';

interface RFIDNotification {
  id: string;
  type: 'alert' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  bookId?: string;
  location?: string;
}

function RFIDNotifications() {
  const [notifications, setNotifications] = useState<RFIDNotification[]>([
    {
      id: '1',
      type: 'alert',
      title: 'Multiple Books Misplaced',
      message: '5 books detected in incorrect locations',
      timestamp: '2 minutes ago',
      read: false,
      location: 'Section A'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Battery Low',
      message: 'RFID Scanner #3 battery is low',
      timestamp: '15 minutes ago',
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: 'Scan Complete',
      message: 'Daily inventory scan completed successfully',
      timestamp: '1 hour ago',
      read: true
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Bell className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">System Notifications</h3>
          </div>
          {notifications.some(n => !n.read) && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Mark all as read
            </button>
          )}
        </div>
      </div>

      <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 ${!notification.read ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
          >
            <div className="flex gap-4">
              {getNotificationIcon(notification.type)}
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                    {notification.title}
                  </h4>
                  <span className="text-xs text-gray-500">{notification.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                {notification.location && (
                  <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    {notification.location}
                  </div>
                )}
                <div className="flex justify-end gap-2 mt-2">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      <Check className="w-4 h-4" />
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RFIDNotifications;