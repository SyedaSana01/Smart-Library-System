import React, { useState } from 'react';
import { Download, FileText, Table, FileSpreadsheet, X, Check } from 'lucide-react';

interface ExportModalProps {
  onClose: () => void;
  onExport: (format: string, options: any) => void;
  data: any[];
}

function ExportModal({ onClose, onExport, data }: ExportModalProps) {
  const [format, setFormat] = useState('csv');
  const [options, setOptions] = useState({
    includeMetadata: true,
    dateRange: 'all',
    selectedColumns: ['title', 'rfidTag', 'location', 'status', 'lastScan'],
  });

  const handleExport = () => {
    onExport(format, options);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Export Inventory Data</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Export Format</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: 'csv', label: 'CSV', icon: Table },
                { id: 'pdf', label: 'PDF', icon: FileText },
                { id: 'excel', label: 'Excel', icon: FileSpreadsheet },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFormat(item.id)}
                  className={`flex items-center gap-2 p-3 rounded-lg border ${
                    format === item.id
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Date Range</h3>
            <select
              value={options.dateRange}
              onChange={(e) => setOptions({ ...options, dateRange: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Include Fields</h3>
            <div className="space-y-2">
              {[
                { id: 'title', label: 'Book Title' },
                { id: 'rfidTag', label: 'RFID Tag' },
                { id: 'location', label: 'Location' },
                { id: 'status', label: 'Status' },
                { id: 'lastScan', label: 'Last Scan' },
              ].map((field) => (
                <label key={field.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={options.selectedColumns.includes(field.id)}
                    onChange={(e) => {
                      const newColumns = e.target.checked
                        ? [...options.selectedColumns, field.id]
                        : options.selectedColumns.filter((col) => col !== field.id);
                      setOptions({ ...options, selectedColumns: newColumns });
                    }}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">{field.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={options.includeMetadata}
              onChange={(e) => setOptions({ ...options, includeMetadata: e.target.checked })}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">Include metadata (scan times, system info)</span>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExportModal;