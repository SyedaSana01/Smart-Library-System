import React, { useState, useEffect } from 'react';
import { Scan, BookOpen, Users, AlertCircle, ArrowUpRight } from 'lucide-react';
import RFIDSelfCheckout from './RFIDSelfCheckout';
import RFIDReturnStation from './RFIDReturnStation';
import RFIDInventory from './RFIDInventory';

function RFIDDashboard() {
  const [activeTab, setActiveTab] = useState('checkout');
  const [stats, setStats] = useState({
    totalTransactions: 0,
    successRate: 0,
    activeUsers: 0,
    alerts: 0
  });

  useEffect(() => {
    // Simulate fetching stats
    setStats({
      totalTransactions: 1247,
      successRate: 98.5,
      activeUsers: 89,
      alerts: 3
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Transactions</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalTransactions}</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Scan className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.successRate}%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <ArrowUpRight className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.activeUsers}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">System Alerts</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.alerts}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { id: 'checkout', label: 'Self-Checkout', icon: BookOpen },
              { id: 'return', label: 'Return Station', icon: Scan },
              { id: 'inventory', label: 'Inventory', icon: AlertCircle }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'checkout' && <RFIDSelfCheckout />}
          {activeTab === 'return' && <RFIDReturnStation />}
          {activeTab === 'inventory' && <RFIDInventory />}
        </div>
      </div>
    </div>
  );
}

export default RFIDDashboard;