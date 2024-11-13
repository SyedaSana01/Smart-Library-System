import React, { useState } from 'react';
import { Book, Users, Clock, AlertCircle, ChevronDown, ChevronUp, BookOpen, RotateCcw, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Types
interface BookDetails {
  title: string;
  id: string;
}

interface UserDetails {
  name: string;
  id: string;
}

interface Activity {
  user: string;
  action: 'borrowed' | 'returned' | 'reserved';
  book: string;
  time: string;
}

// Mock data for the chart
const monthlyData = [
  { name: 'Jan', borrowed: 65, returned: 58 },
  { name: 'Feb', borrowed: 78, returned: 72 },
  { name: 'Mar', borrowed: 82, returned: 79 },
  { name: 'Apr', borrowed: 70, returned: 67 },
  { name: 'May', borrowed: 85, returned: 81 },
  { name: 'Jun', borrowed: 90, returned: 88 },
];

function Dashboard() {
  const [scanning, setScanning] = useState(false);
  const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [showGraph, setShowGraph] = useState(true);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([
    { user: 'Emma Wilson', action: 'borrowed', book: 'The Design of Everyday Things', time: '2 hours ago' },
    { user: 'James Chen', action: 'returned', book: 'Clean Code', time: '4 hours ago' },
    { user: 'Sophie Martin', action: 'reserved', book: 'Atomic Habits', time: '5 hours ago' },
  ]);

  const stats = [
    { label: 'Total Books', value: '12,483', icon: <Book className="w-6 h-6" />, color: 'from-blue-500 to-blue-600' },
    { label: 'Active Users', value: '2,845', icon: <Users className="w-6 h-6" />, color: 'from-green-500 to-green-600' },
    { label: 'Due Today', value: '47', icon: <Clock className="w-6 h-6" />, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Overdue', value: '23', icon: <AlertCircle className="w-6 h-6" />, color: 'from-red-500 to-red-600' },
  ];

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setBookDetails({ title: 'The Lean Startup', id: '12345' });
      setScanning(false);
    }, 2000);
  };

  const handleUserScan = (userId: string) => {
    const user: UserDetails = { name: 'John Doe', id: userId };
    setUserDetails(user);
    setRecentActivities([
      { user: user.name, action: 'borrowed', book: bookDetails?.title || '', time: 'just now' },
      ...recentActivities,
    ]);
  };

  const handleReturnBook = (bookTitle: string) => {
    setRecentActivities([
      { user: userDetails?.name || '', action: 'returned', book: bookTitle, time: 'just now' },
      ...recentActivities.filter(activity => activity.book !== bookTitle),
    ]);
    setBookDetails(null);
    setUserDetails(null);
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'borrowed':
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'returned':
        return <RotateCcw className="w-4 h-4 text-green-500" />;
      case 'reserved':
        return <Calendar className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg text-white 
                               transform group-hover:scale-110 transition-transform duration-200`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
            <button
              onClick={() => setShowGraph(!showGraph)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              {showGraph ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {showGraph ? 'Hide Graph' : 'Show Graph'}
            </button>
          </div>
          
          {/* Activities List */}
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} 
                   className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  {getActionIcon(activity.action)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600">
                      {activity.action} "{activity.book}"
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>

          {/* Monthly Summary Graph */}
          {showGraph && (
            <div className="mt-6 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="borrowed" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="returned" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Scan Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <button 
            onClick={handleScan} 
            disabled={scanning}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium
                       bg-gradient-to-r from-blue-500 to-blue-600
                       hover:from-blue-600 hover:to-blue-700
                       focus:ring-4 focus:ring-blue-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200
                       transform hover:scale-[1.02]`}
          >
            {scanning ? 'Scanning...' : 'Scan Book'}
          </button>

          {bookDetails && !scanning && (
            <div className="mt-4 space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-lg font-semibold text-gray-900">Book Scanned: {bookDetails.title}</p>
                <p className="text-sm text-gray-600">ID: {bookDetails.id}</p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                  Scan User ID
                </label>
                <input 
                  id="userId"
                  type="text" 
                  placeholder="Enter or Scan User ID"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg
                           focus:ring-2 focus:ring-blue-200 focus:border-blue-500
                           transition-colors duration-200"
                  onBlur={(e) => handleUserScan(e.target.value)}
                />
              </div>
            </div>
          )}

          {bookDetails && userDetails && (
            <div className="mt-4">
              <button 
                onClick={() => handleReturnBook(bookDetails.title)}
                className="w-full py-3 px-4 rounded-lg text-white font-medium
                         bg-gradient-to-r from-red-500 to-red-600
                         hover:from-red-600 hover:to-red-700
                         focus:ring-4 focus:ring-red-200
                         transition-all duration-200
                         transform hover:scale-[1.02]"
              >
                Return Book
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;