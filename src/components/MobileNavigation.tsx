import React from 'react';
import { Home, Database, Layers, Users, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MobileNavigation: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-30">
      <div className="flex justify-around items-center h-16">
        <Link to="/" className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/dsa" className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
          <Database className="h-5 w-5" />
          <span className="text-xs mt-1">DSA</span>
        </Link>
        <Link to="/system" className="flex flex-col items-center justify-center text-indigo-600 dark:text-indigo-400">
          <Layers className="h-5 w-5" />
          <span className="text-xs mt-1">System</span>
        </Link>
        <Link to="/community" className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
          <Users className="h-5 w-5" />
          <span className="text-xs mt-1">Community</span>
        </Link>
        <button className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
          <Menu className="h-5 w-5" />
          <span className="text-xs mt-1">Menu</span>
        </button>
      </div>
    </div>
  );
};