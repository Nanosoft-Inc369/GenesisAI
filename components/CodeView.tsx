import React from 'react';
import { GeneratedApp } from '../types';

interface CodeViewProps {
  app: GeneratedApp | null;
}

export const CodeView: React.FC<CodeViewProps> = ({ app }) => {
  if (!app) {
    return (
      <div className="h-full flex items-center justify-center text-gray-600 font-mono text-sm">
        // Generated source code will appear here
      </div>
    );
  }

  return (
    <div className="relative h-full font-mono text-sm group">
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
         <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">Read-only</span>
      </div>
      <pre className="p-6 h-full overflow-auto text-blue-300">
        <code>{app.code}</code>
      </pre>
    </div>
  );
};
