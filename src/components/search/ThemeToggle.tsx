import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export function ThemeToggle({ isDarkMode, setIsDarkMode }: ThemeToggleProps) {
  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={`
        relative p-2 rounded-full transition-all duration-300 transform hover:scale-110
        ${isDarkMode 
          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700' 
          : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600'}
      `}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className={`
        absolute inset-0 rounded-full transition-all duration-300
        ${isDarkMode ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}
      `}>
        <Sun className="w-5 h-5 text-white" />
      </div>
      <div className={`
        absolute inset-0 rounded-full transition-all duration-300
        ${isDarkMode ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}
      `}>
        <Moon className="w-5 h-5 text-white" />
      </div>
      <div className="w-5 h-5 opacity-0">
        {/* Spacer for layout */}
      </div>
    </button>
  );
}