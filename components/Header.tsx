import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          GenesisAI
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs font-mono text-gray-500 px-2 py-1 bg-gray-800 rounded">v1.0.0-beta</span>
        <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700"></div>
      </div>
    </header>
  );
};
