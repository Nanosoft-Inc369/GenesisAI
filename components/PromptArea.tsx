import React, { useState, useCallback } from 'react';
import { AppStatus } from '../types';

interface PromptAreaProps {
  onGenerate: (prompt: string) => void;
  status: AppStatus;
}

export const PromptArea: React.FC<PromptAreaProps> = ({ onGenerate, status }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && status !== AppStatus.GENERATING) {
      onGenerate(prompt);
    }
  }, [prompt, status, onGenerate]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      if (prompt.trim() && status !== AppStatus.GENERATING) {
        onGenerate(prompt);
      }
    }
  }, [prompt, status, onGenerate]);

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex flex-col gap-2 bg-gray-900 border border-gray-700 rounded-xl p-2 shadow-2xl">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the app you want to build... (e.g., 'A personal finance dashboard with charts and a transaction list')"
            className="w-full bg-transparent text-gray-100 placeholder-gray-500 text-lg p-4 focus:outline-none resize-none min-h-[120px]"
            disabled={status === AppStatus.GENERATING}
          />
          <div className="flex justify-between items-center px-2 pb-2">
            <div className="flex gap-2">
              <span className="text-xs text-gray-500 font-mono flex items-center gap-1">
                <kbd className="bg-gray-800 px-1.5 py-0.5 rounded border border-gray-700">Cmd</kbd> + <kbd className="bg-gray-800 px-1.5 py-0.5 rounded border border-gray-700">Enter</kbd> to run
              </span>
            </div>
            <button
              type="submit"
              disabled={!prompt.trim() || status === AppStatus.GENERATING}
              className={`
                px-6 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2
                ${status === AppStatus.GENERATING 
                  ? 'bg-gray-800 text-gray-400 cursor-wait' 
                  : 'bg-white text-black hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.3)]'}
              `}
            >
              {status === AppStatus.GENERATING ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Building...</span>
                </>
              ) : (
                <>
                  <span>Generate App</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
