import React from 'react';
import { Scan, MapPin, RotateCw, AlertTriangle } from 'lucide-react';

interface TrackedBook {
  id: number;
  title: string;
  location: string;
  lastSeen: string;
  status: 'in_place' | 'misplaced' | 'in_transit';
  rfidTag: string;
}

function RFIDTracking() {
  const trackedBooks: TrackedBook[] = [
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
  ];

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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Scan className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">RFID Book Tracking</h2>
        </div>
        <button className="text-sm text-indigo-600 hover:text-indigo-800">
          Scan Now
        </button>
      </div>

      <div className="space-y-4">
        {trackedBooks.map((book) => (
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
          <span>Last system scan: 2 minutes ago</span>
          <button className="text-indigo-600 hover:text-indigo-800">
            View Full Inventory Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default RFIDTracking;