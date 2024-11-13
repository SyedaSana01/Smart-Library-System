import React from 'react';
import { FileText } from 'lucide-react';

interface MediaButtonProps {
  available: boolean;
  onClick: () => void;
}

export function MediaButton({ onClick, available }: MediaButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={!available}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
        transform transition-all duration-200 
        ${available 
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg' 
          : 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'}
      `}
      title={available ? 'View PDF' : 'No PDF available'}
    >
      <FileText className="w-5 h-5" />
      View PDF
    </button>
  );
}