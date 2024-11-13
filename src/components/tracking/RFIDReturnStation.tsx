import React, { useState } from 'react';
import { Scan, RotateCw, Check, AlertCircle } from 'lucide-react';

interface ReturnedBook {
  id: string;
  title: string;
  rfidTag: string;
  returnTime: string;
  status: 'processing' | 'returned' | 'error';
  message?: string;
}

function RFIDReturnStation() {
  const [isScanning, setIsScanning] = useState(false);
  const [returnedBooks, setReturnedBooks] = useState<ReturnedBook[]>([]);

  const simulateReturn = () => {
    setIsScanning(true);

    // Simulate RFID scanning and return process
    setTimeout(() => {
      const newReturn: ReturnedBook = {
        id: Math.random().toString(36).substr(2, 9),
        title: "Design Patterns",
        rfidTag: "RFID-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
        returnTime: new Date().toLocaleTimeString(),
        status: Math.random() > 0.2 ? 'returned' : 'error',
        message: Math.random() > 0.2 ? 'Successfully returned' : 'Late return - Fine applied'
      };

      setReturnedBooks(prev => [newReturn, ...prev]);
      setIsScanning(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Book Return Station</h2>
        <button
          onClick={simulateReturn}
          disabled={isScanning}
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${
            isScanning
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          <Scan className={`w-4 h-4 ${isScanning ? 'animate-pulse' : ''}`} />
          {isScanning ? 'Processing...' : 'Return Book'}
        </button>
      </div>

      <div className="space-y-4">
        {returnedBooks.map((book) => (
          <div
            key={book.id}
            className={`p-4 rounded-lg border ${
              book.status === 'returned'
                ? 'border-green-200 bg-green-50'
                : 'border-red-200 bg-red-50'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{book.title}</h3>
                <p className="text-sm text-gray-500">RFID: {book.rfidTag}</p>
                <p className="text-sm text-gray-500">Returned at: {book.returnTime}</p>
              </div>
              <div className="flex items-center gap-2">
                {book.status === 'returned' ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
                <span className={`text-sm ${
                  book.status === 'returned' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {book.message}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {returnedBooks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <RotateCw className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No books returned yet today</p>
        </div>
      )}
    </div>
  );
}

export default RFIDReturnStation;