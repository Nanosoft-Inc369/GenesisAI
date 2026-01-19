import React, { useMemo } from 'react';
import { GeneratedApp } from '../types';

interface PreviewFrameProps {
  app: GeneratedApp | null;
}

export const PreviewFrame: React.FC<PreviewFrameProps> = ({ app }) => {
  const srcDoc = useMemo(() => {
    if (!app) {
      return `
        <html>
          <style>
            body { 
              background-color: #030712; 
              color: #4b5563; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              height: 100vh; 
              font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
              margin: 0; 
              overflow: hidden;
            }
            .grid-bg {
              position: absolute;
              inset: 0;
              background-image: linear-gradient(to right, #111827 1px, transparent 1px),
                                linear-gradient(to bottom, #111827 1px, transparent 1px);
              background-size: 24px 24px;
              opacity: 0.5;
              z-index: -1;
            }
            .container {
              text-align: center;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 20px;
            }
            .icon-wrapper {
              width: 64px;
              height: 64px;
              border-radius: 16px;
              background: #0f172a;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid #1e293b;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
              position: relative;
            }
            .icon-wrapper::after {
              content: '';
              position: absolute;
              inset: -1px;
              border-radius: 16px;
              padding: 1px;
              background: linear-gradient(to bottom right, rgba(99, 102, 241, 0.2), rgba(0,0,0,0));
              -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
              -webkit-mask-composite: xor;
              mask-composite: exclude;
              pointer-events: none;
            }
            .icon {
              width: 32px;
              height: 32px;
              color: #64748b;
            }
            .text {
              font-size: 13px;
              font-weight: 500;
              color: #64748b;
              letter-spacing: 0.05em;
              text-transform: uppercase;
            }
          </style>
          <body>
            <div class="grid-bg"></div>
            <div class="container">
              <div class="icon-wrapper">
                <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 18" />
                </svg>
              </div>
              <div class="text">System Ready</div>
            </div>
          </body>
        </html>
      `;
    }

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://cdn.tailwindcss.com"></script>
          <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
          <style>
            body { background-color: white; font-family: 'Inter', sans-serif; }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            // Error Boundary
            class ErrorBoundary extends React.Component {
              constructor(props) {
                super(props);
                this.state = { hasError: false, error: null };
              }
              static getDerivedStateFromError(error) {
                return { hasError: true, error };
              }
              render() {
                if (this.state.hasError) {
                  return (
                    <div className="p-8 text-red-500 bg-red-50 min-h-screen font-sans">
                      <h1 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Runtime Error
                      </h1>
                      <pre className="bg-red-100 p-4 rounded overflow-auto text-sm font-mono border border-red-200">
                        {this.state.error.toString()}
                      </pre>
                    </div>
                  );
                }
                return this.props.children;
              }
            }

            try {
              ${app.code}
              
              const root = ReactDOM.createRoot(document.getElementById('root'));
              root.render(
                <ErrorBoundary>
                  <App />
                </ErrorBoundary>
              );
            } catch (err) {
              document.body.innerHTML = '<div style="color:red; padding: 20px;">' + err.toString() + '</div>';
            }
          </script>
        </body>
      </html>
    `;
  }, [app]);

  return (
    <div className="w-full h-full bg-[#1e293b] rounded-lg overflow-hidden shadow-2xl ring-1 ring-gray-800 flex flex-col">
      <div className="bg-[#0f172a] border-b border-gray-800 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-700/50"></div>
          <div className="w-3 h-3 rounded-full bg-slate-700/50"></div>
          <div className="w-3 h-3 rounded-full bg-slate-700/50"></div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono bg-slate-900/50 px-3 py-1 rounded border border-slate-800">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.131A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.85.577-4.147" />
          </svg>
          {app ? `localhost:3000/${app.name.toLowerCase().replace(/\s+/g, '-')}` : 'preview-environment'}
        </div>
        <div className="w-12"></div>
      </div>
      <iframe
        title="App Preview"
        srcDoc={srcDoc}
        className="w-full flex-1 bg-white"
        sandbox="allow-scripts allow-modals allow-same-origin"
      />
    </div>
  );
};