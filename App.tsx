import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptArea } from './components/PromptArea';
import { PreviewFrame } from './components/PreviewFrame';
import { CodeView } from './components/CodeView';
import { generateAppFromPrompt } from './services/geminiService';
import { AppStatus, GeneratedApp } from './types';

export default function App() {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [currentApp, setCurrentApp] = useState<GeneratedApp | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  const handleGenerate = useCallback(async (prompt: string) => {
    setStatus(AppStatus.GENERATING);
    try {
      const response = await generateAppFromPrompt(prompt);
      
      const newApp: GeneratedApp = {
        id: crypto.randomUUID(),
        name: response.appName,
        description: response.description,
        code: response.reactCode,
        timestamp: Date.now(),
      };

      setCurrentApp(newApp);
      setStatus(AppStatus.SUCCESS);
      setActiveTab('preview'); // Switch to preview on success
    } catch (error) {
      console.error(error);
      setStatus(AppStatus.ERROR);
    }
  }, []);

  const handleDownload = () => {
    if (!currentApp) return;

    // Create a complete HTML file for download
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${currentApp.name}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        ${currentApp.code}
        
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentApp.name.toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col font-sans selection:bg-indigo-500/30">
      <Header />

      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full gap-6">
        
        {/* Top Section: Prompting */}
        <div className="flex flex-col items-center">
           <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-200 bg-clip-text text-transparent">
             What do you want to build?
           </h2>
           <PromptArea onGenerate={handleGenerate} status={status} />
        </div>

        {/* Main Workspace */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[500px]">
          
          {/* Left Column: Controls & Metadata */}
          <div className="flex flex-col gap-4">
             {currentApp ? (
               <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{currentApp.name}</h3>
                      <p className="text-gray-400">{currentApp.description}</p>
                    </div>
                    <button 
                      onClick={handleDownload}
                      className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors border border-gray-700"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download App
                    </button>
                  </div>
                  
                  <div className="flex gap-2 mb-0 border-b border-gray-700">
                    <button 
                      onClick={() => setActiveTab('preview')}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'preview' 
                        ? 'border-indigo-500 text-white' 
                        : 'border-transparent text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      Live Preview
                    </button>
                    <button 
                      onClick={() => setActiveTab('code')}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'code' 
                        ? 'border-indigo-500 text-white' 
                        : 'border-transparent text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      Source Code
                    </button>
                  </div>

                  <div className="mt-4 bg-gray-950 rounded-lg border border-gray-800 h-[400px] overflow-hidden">
                     {activeTab === 'preview' ? (
                       <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                         {/* We show the desktop preview in the right column, this is just a placeholder or could be mobile view */}
                         <div className="text-center p-8">
                           <p className="mb-2">View the live application in the main preview window.</p>
                           <p className="text-xs text-gray-600">The preview panel on the right simulates a full browser environment.</p>
                         </div>
                       </div>
                     ) : (
                       <CodeView app={currentApp} />
                     )}
                  </div>
               </div>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-gray-600 border border-gray-800 border-dashed rounded-xl bg-gray-900/20 p-8">
                 <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-4">
                   <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                   </svg>
                 </div>
                 <p className="text-lg font-medium">Your creation history is empty</p>
                 <p className="text-sm">Describe an app above to get started.</p>
               </div>
             )}
          </div>

          {/* Right Column: The "Phone/Desktop" Preview */}
          <div className="h-full min-h-[500px]">
             <PreviewFrame app={currentApp} />
          </div>

        </div>
      </main>
    </div>
  );
}
