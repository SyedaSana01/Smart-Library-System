import React from 'react';
import { X, Download, Printer, ChevronDown } from 'lucide-react';

interface InventoryReportProps {
  books: any[];
  onClose: () => void;
  lastScanTime: string;
}

function InventoryReport({ books, onClose, lastScanTime }: InventoryReportProps) {
  const statusCounts = {
    in_place: books.filter(b => b.status === 'in_place').length,
    misplaced: books.filter(b => b.status === 'misplaced').length,
    in_transit: books.filter(b => b.status === 'in_transit').length,
  };

  const locationGroups = books.reduce((acc: any, book) => {
    const location = book.location.split(' - ')[0];
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(book);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Inventory Report</h2>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:text-gray-900">
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:text-gray-900">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-green-600 text-sm font-medium">In Place</div>
                <div className="text-2xl font-bold text-green-700">{statusCounts.in_place}</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-yellow-600 text-sm font-medium">Misplaced</div>
                <div className="text-2xl font-bold text-yellow-700">{statusCounts.misplaced}</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-blue-600 text-sm font-medium">In Transit</div>
                <div className="text-2xl font-bold text-blue-700">{statusCounts.in_transit}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(locationGroups).map(([location, locationBooks]: [string, any]) => (
              <div key={location} className="border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-t-lg">
                  <h4 className="font-medium text-gray-900">{location}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {(locationBooks as any[]).length} books
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="p-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">RFID Tag</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Last Seen</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {(locationBooks as any[]).map((book) => (
                        <tr key={book.id}>
                          <td className="px-4 py-2 text-sm text-gray-900">{book.title}</td>
                          <td className="px-4 py-2 text-sm text-gray-500">{book.rfidTag}</td>
                          <td className="px-4 py-2">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                book.status === 'in_place'
                                  ? 'bg-green-100 text-green-800'
                                  : book.status === 'misplaced'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {book.status}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-500">{book.lastSeen}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Report generated based on last scan: {lastScanTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryReport;