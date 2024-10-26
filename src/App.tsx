import React, { useState } from 'react';
import {
  Book,
  User,
  Search,
  BookOpen,
  Users,
  Calendar,
  Bell,
  Settings,
  DollarSign,
  Sparkles,
  Mic,
  Scan,
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import BookCatalog from './components/BookCatalog';
import UserManagement from './components/UserManagement';
import LateFeeCalculator from './components/fees/LateFeeCalculator';
import AIRecommendations from './components/search/AIRecommendations';
import StudyRoomBooking from './components/rooms/StudyRoomBooking';
import VoiceSearch from './components/search/VoiceSearch';
import RFIDTracking from './components/tracking/RFIDTracking';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'catalog', label: 'Book Catalog', icon: <Book className="w-5 h-5" /> },
    { id: 'users', label: 'Users', icon: <Users className="w-5 h-5" /> },
    { id: 'search', label: 'Search', icon: <Search className="w-5 h-5" /> },
    { id: 'rooms', label: 'Study Rooms', icon: <Calendar className="w-5 h-5" /> },
    { id: 'fees', label: 'Late Fees', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'ai', label: 'AI Recommendations', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'voice', label: 'Voice Search', icon: <Mic className="w-5 h-5" /> },
    { id: 'rfid', label: 'RFID Tracking', icon: <Scan className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'catalog':
        return <BookCatalog />;
      case 'users':
        return <UserManagement />;
      case 'fees':
        return <LateFeeCalculator />;
      case 'ai':
        return <AIRecommendations />;
      case 'rooms':
        return <StudyRoomBooking />;
      case 'voice':
        return <VoiceSearch />;
      case 'rfid':
        return <RFIDTracking />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar menuItems={menuItems} activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{renderContent()}</div>
      </main>
    </div>
  );
}

export default App;