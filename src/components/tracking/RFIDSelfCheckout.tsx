import React, { useState } from 'react';
import { Scan, BookOpen, AlertCircle, Check, X } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  rfidTag: string;
  status: 'available' | 'borrowed' | 'processing';
  cover: string;
}

function RFIDSelfCheckout() {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedBooks, setScannedBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const simulateScan = () => {
    setIsScanning(true);
    setError(null);
    setSuccess(null);

    // Simulate RFID scanning process
    setTimeout(() => {
      const newBook: Book = {
        id: Math.random().toString(36).substr(2, 9),
        title: "Clean Code",
        rfidTag: "RFID-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
        status: 'processing',
        cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=1000"
      };
      
      setScannedBooks(prev => [...prev, newBook]);
      setIsScanning(false);
    }, 1500);
  };

  const handleCheckout = () => {
    if (scannedBooks.length === 0) {
      setError("Please scan at least one book");
      return;
    }

    // Simulate checkout process
    setIsScanning(true);
    setTimeout(() => {
      setScannedBooks([]);
      setSuccess("Books checked out successfully!");
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Self-Checkout Station</h2>
        <button
          onClick={simulateScan}
          disabled={isScanning}
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${
            isScanning
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          <Scan className={`w-4 h-4 ${isScanning ? 'animate-pulse' : ''}`} />
          {isScanning ? 'Scanning...' : 'Scan Book'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center gap-2 text-green-700">
          <Check className="w-5 h-5" />
          <span>{success}</span>
        </div>
      )}

      <div className="space-y-4">
        {scannedBooks.map((book) => (
          <div
            key={book.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <img
                src={book.cover}
                alt={book.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-medium text-gray-900">{book.title}</h3>
                <p className="text-sm text-gray-500">RFID: {book.rfidTag}</p>
              </div>
            </div>
            <button
              onClick={() => setScannedBooks(prev => prev.filter(b => b.id !== book.id))}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {scannedBooks.length > 0 && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleCheckout}
            disabled={isScanning}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <BookOpen className="w-4 h-4" />
            Checkout {scannedBooks.length} {scannedBooks.length === 1 ? 'Book' : 'Books'}
          </button>
        </div>
      )}
    </div>
  );
}

export default RFIDSelfCheckout;