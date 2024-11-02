import React, { useState, useEffect } from 'react';
import { Scan, MapPin, RotateCw, AlertTriangle, FileText, Search, Filter } from 'lucide-react';
import InventoryReport from './InventoryReport';

interface TrackedBook {
  id: number;
  title: string;
  location: string;
  lastSeen: string;
  status: 'in_place' | 'misplaced' | 'in_transit';
  rfidTag: string;
}

function RFIDTracking() {
  const [isScanning, setIsScanning] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastScanTime, setLastScanTime] = useState('2 minutes ago');
  const [trackedBooks, setTrackedBooks] = useState<TrackedBook[]>([
    {
      id: 1,
      title: 'Clean Code',
      location: 'Technology Section - Shelf 3B',
      lastSeen: '2 minutes ago',
      status: 'in_place',
      rfidTag: 'RFID-001-2024',
    },
    {
      id: 2,
      title: 'Design Patterns',
      location: 'Reading Area',
      lastSeen: '15 minutes ago',
      status: 'misplaced',
      rfidTag: 'RFID-002-2024',
    },
    {
      id: 3,
      title: 'Atomic Habits',
      location: 'Return Cart',
      lastSeen: '5 minutes ago',
      status: 'in_transit',
      rfidTag: 'RFID-003-2024',
    },
  ]);

  const startScan = () => {
    setIsScanning(true);
    // Simulate RFID scanning process
    setTimeout(() => {
      const updatedBooks = trackedBooks.map(book => ({
        ...book,
        lastSeen: 'Just now',
        status: Math.random() > 0.8 ? 'misplaced' : 'in_place' as any
      }));
      setTrackedBooks(updatedBooks);
      setLastScanTime('Just now');
      setIsScanning(false);
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_place':
        return <MapPin className="w-5 h-5 text-green-500" />;
      case 'misplaced':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'in_transit':
        return <RotateCw className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_place':
        return 'In correct location';
      case 'misplaced':
        return 'Misplaced';
      case 'in_transit':
        return 'In transit';
      default:
        return status;
    }
  };

  const filteredBooks = trackedBooks.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.rfidTag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Scan className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">RFID Book Tracking</h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={startScan}
            disabled={isScanning}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              isScanning
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <Scan className={`w-4 h-4 ${isScanning ? 'animate-pulse' : ''}`} />
            {isScanning ? 'Scanning...' : 'Scan Now'}
          </button>
          <button
            onClick={() => setShowReport(true)}
            className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-md"
          >
            <FileText className="w-4 h-4" />
            View Report
          </button>
        </div>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by title, location, or RFID tag..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      <div className="space-y-4">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-start gap-4">
              {getStatusIcon(book.status)}
              <div>
                <h3 className="font-medium text-gray-900">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.location}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Last seen: {book.lastSeen}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  book.status === 'in_place'
                    ? 'bg-green-100 text-green-800'
                    : book.status === 'misplaced'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {getStatusText(book.status)}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                RFID: {book.rfidTag}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Last system scan: {lastScanTime}</span>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              In Place: {trackedBooks.filter(b => b.status === 'in_place').length}
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              Misplaced: {trackedBooks.filter(b => b.status === 'misplaced').length}
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              In Transit: {trackedBooks.filter(b => b.status === 'in_transit').length}
            </span>
          </div>
        </div>
      </div>

      {showReport && (
        <InventoryReport
          books={trackedBooks}
          onClose={() => setShowReport(false)}
          lastScanTime={lastScanTime}
        />
      )}
    </div>
  );
}

export default RFIDTracking;