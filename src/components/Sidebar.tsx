import React, { useState } from 'react';
import { BookMarked, Book, Users, Search as SearchIcon, Calendar, DollarSign, Sparkles, Mic, Scan, Bell } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  menuItems: MenuItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function Sidebar({ menuItems, activeTab, setActiveTab }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  // Toggle sidebar collapse
  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className={`w-${collapsed ? '20' : '64'} bg-white border-r border-gray-200 px-4 py-6 transition-all`}>
      {/* Sidebar Header with Toggle Button */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <BookMarked className="w-8 h-8 text-indigo-600" />
          {!collapsed && <h1 className="text-xl font-bold text-gray-900">Smart Library</h1>}
        </div>
        <button onClick={toggleSidebar} className="text-gray-600">
          {collapsed ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 7l7 7-7 7M5 7l7 7-7 7" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h18M3 12h18M3 19h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Search Bar */}
      {!collapsed && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm"
          />
        </div>
      )}

      {/* Sidebar Navigation */}
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === item.id
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
