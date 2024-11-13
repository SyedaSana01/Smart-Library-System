import React, { useState } from 'react';
import { Scan, MapPin, AlertCircle, FileText } from 'lucide-react';

interface InventoryItem {
  id: string;
  title: string;
  rfidTag: string;
  location: string;
  lastScan: string;
  status: 'in_place' | 'misplaced' | 'missing';
}

function RFIDInventory() {
  const [isScanning, setIsScanning] = useState(false);
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      title: 'Clean Code',
      rfidTag: 'RFID-ABC123',
      location: 'Section A, Shelf 2',
      lastScan: '2 minutes ago',
      status: 'in_place'
    },
    {
      id: '2',
      title: 'Design Patterns',
      rfidTag: 'RFID-DEF456',
      location: 'Section B, Shelf 1',
      lastScan: '5 minutes ago',
      status: 'misplaced'
    }
  ]);

  const startInventoryScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const updatedInventory = inventory.map(item => ({
        ...item,
        lastScan: 'Just now',
        status: Math.random() > 0.8 ? 'misplaced' : 'in_place' as any
      }));
      setInventory(updatedInventory);
      setIsScanning(false);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_place':
        return 'bg-green-100 text-green-800';
      case 'misplaced':
        return 'bg-yellow-100 text-yellow-800';
      case 'missing':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">RFID Inventory</h2>
          <p className="text-sm text-gray-500 mt-1">
            Last full scan: 2 hours ago
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={startInventoryScan}
            disabled={isScanning}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              isScanning
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <Scan className={`w-4 h-4 ${isScanning ? 'animate-pulse' : ''}`} />
            {isScanning ? 'Scanning...' : 'Start Scan'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
            <FileText className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventory.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow p-4 border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">RFID: {item.rfidTag}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {item.location}
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                {item.status.replace('_', ' ')}
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Last scan: {item.lastScan}</span>
                {item.status === 'misplaced' && (
                  <button className="text-indigo-600 hover:text-indigo-800">
                    View Details
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RFIDInventory;