import React, { useState } from 'react';
import { Mic, MicOff, Search, Loader } from 'lucide-react';

function VoiceSearch() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const startListening = () => {
    setIsListening(true);
    // In a real implementation, this would use the Web Speech API
    setTimeout(() => {
      setIsListening(false);
      setTranscript('books about artificial intelligence');
      setIsProcessing(true);
      setTimeout(() => setIsProcessing(false), 1500);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Search books or say your query..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          onClick={startListening}
          disabled={isListening}
          className={`p-2 rounded-full ${
            isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
      </div>

      {isProcessing && (
        <div className="flex items-center justify-center py-8">
          <Loader className="w-8 h-8 text-indigo-600 animate-spin" />
          <span className="ml-3 text-gray-600">Processing your query...</span>
        </div>
      )}

      {transcript && !isProcessing && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Voice Search Results</h3>
          <div className="space-y-4">
            {/* Sample results - in a real app, these would be dynamically generated */}
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <h4 className="font-medium text-gray-900">AI: A Modern Approach</h4>
              <p className="text-sm text-gray-600 mt-1">
                Stuart Russell, Peter Norvig - Available in Technology Section
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <h4 className="font-medium text-gray-900">Life 3.0: Being Human in the Age of AI</h4>
              <p className="text-sm text-gray-600 mt-1">
                Max Tegmark - Available as eBook
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VoiceSearch;