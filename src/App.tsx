import React, { useState } from 'react';
import { Book, Users, Calendar, DollarSign, Sparkles, Scan, Bell, Search as SearchIcon } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import BookCatalog from './components/BookCatalog';
import UserManagement from './components/UserManagement';
import LateFeeCalculator from './components/fees/LateFeeCalculator';
import AIRecommendations from './components/search/AIRecommendations';
import StudyRoomBooking from './components/rooms/StudyRoomBooking';
import RFIDTracking from './components/tracking/RFIDTracking';
import NotificationCenter from './components/notifications/NotificationCenter';
import SearchBar from './components/search/SearchBar';


// Define a type for the active tab
type Tab = 'dashboard' | 'catalog' | 'users' | 'fees' | 'ai' | 'rooms' | 'rfid' | 'notifications' | 'search';

// Create a type for the menu items
type MenuItem = {
  id: Tab;
  label: string;
  icon: JSX.Element;
  component: JSX.Element;
};

function App() {
  // State now has the type 'Tab' to ensure type safety
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  // List of menu items with ID, label, and icon
  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Book className="w-5 h-5" />, component: <Dashboard /> },
    { id: 'catalog', label: 'Book Catalog', icon: <Book className="w-5 h-5" />, component: <BookCatalog /> },
    { id: 'users', label: 'Users', icon: <Users className="w-5 h-5" />, component: <UserManagement /> },
    { id: 'search', label: 'Search', icon: <SearchIcon className="w-5 h-5" />, component: <SearchBar /> },
    { id: 'rooms', label: 'Study Rooms', icon: <Calendar className="w-5 h-5" />, component: <StudyRoomBooking /> },
    { id: 'fees', label: 'Late Fees', icon: <DollarSign className="w-5 h-5" />, component: <LateFeeCalculator /> },
    { id: 'ai', label: 'AI Recommendations', icon: <Sparkles className="w-5 h-5" />, component: <AIRecommendations /> },
    { id: 'rfid', label: 'RFID Tracking', icon: <Scan className="w-5 h-5" />, component: <RFIDTracking /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" />, component: <NotificationCenter /> },
    
    
  ];

  // Dynamically map the content based on active tab
  const renderContent = () => {
    const activeItem = menuItems.find(item => item.id === activeTab);
    return activeItem ? activeItem.component : <Dashboard />; // Default to Dashboard if not found
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Component */}
      <Sidebar menuItems={menuItems} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="p-8">
          {/* Render the active tab content */}
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;





