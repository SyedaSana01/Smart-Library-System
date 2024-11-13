import React, { useState } from 'react';
import { Settings, Bell, Wifi, Clock, Save, Shield } from 'lucide-react';

interface RFIDSettings {
  scanInterval: number;
  notifyOnMisplaced: boolean;
  autoScanEnabled: boolean;
  securityLevel: 'low' | 'medium' | 'high';
  alertThreshold: number;
  exportFormat: 'csv' | 'pdf' | 'excel';
}

function RFIDSettings() {
  const [settings, setSettings] = useState<RFIDSettings>({
    scanInterval: 30,
    notifyOnMisplaced: true,
    autoScanEnabled: true,
    securityLevel: 'medium',
    alertThreshold: 5,
    exportFormat: 'csv'
  });

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-900">RFID System Settings</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Scanning Configuration</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Auto-Scan Interval (minutes)</label>
              <div className="mt-1 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={settings.scanInterval}
                  onChange={(e) => setSettings({ ...settings, scanInterval: parseInt(e.target.value) })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.autoScanEnabled}
                  onChange={(e) => setSettings({ ...settings, autoScanEnabled: e.target.checked })}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Enable Automatic Scanning</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
            
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.notifyOnMisplaced}
                  onChange={(e) => setSettings({ ...settings, notifyOnMisplaced: e.target.checked })}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Notify on Misplaced Books</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Alert Threshold</label>
              <div className="mt-1 flex items-center gap-2">
                <Bell className="w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={settings.alertThreshold}
                  onChange={(e) => setSettings({ ...settings, alertThreshold: parseInt(e.target.value) })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">Minimum number of misplaced books before alerting</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Export Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['csv', 'pdf', 'excel'].map((format) => (
              <label key={format} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="exportFormat"
                  value={format}
                  checked={settings.exportFormat === format}
                  onChange={(e) => setSettings({ ...settings, exportFormat: e.target.value as any })}
                  className="border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">{format.toUpperCase()}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Security Level</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['low', 'medium', 'high'].map((level) => (
              <label key={level} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="securityLevel"
                  value={level}
                  checked={settings.securityLevel === level}
                  onChange={(e) => setSettings({ ...settings, securityLevel: e.target.value as any })}
                  className="border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700 capitalize">{level}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default RFIDSettings;