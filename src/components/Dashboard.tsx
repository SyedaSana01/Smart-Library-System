import React from 'react';
import { Book, Users, Clock, AlertCircle } from 'lucide-react';

function Dashboard() {
  const stats = [
    { label: 'Total Books', value: '12,483', icon: <Book className="w-6 h-6" />, color: 'bg-blue-500' },
    { label: 'Active Users', value: '2,845', icon: <Users className="w-6 h-6" />, color: 'bg-green-500' },
    { label: 'Due Today', value: '47', icon: <Clock className="w-6 h-6" />, color: 'bg-yellow-500' },
    { label: 'Overdue', value: '23', icon: <AlertCircle className="w-6 h-6" />, color: 'bg-red-500' },
  ];

  const recentActivities = [
    { user: 'Emma Wilson', action: 'borrowed', book: 'The Design of Everyday Things', time: '2 hours ago' },
    { user: 'James Chen', action: 'returned', book: 'Clean Code', time: '4 hours ago' },
    { user: 'Sophie Martin', action: 'reserved', book: 'Atomic Habits', time: '5 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className={`${stat.color} p-3 rounded-lg text-white`}>{stat.icon}</div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                  <p className="text-sm text-gray-600">
                    {activity.action} "{activity.book}"
                  </p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;