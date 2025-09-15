import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-background-dark flex items-center justify-center px-4 -mt-3">
      <div className="max-w-md w-full -mt-40 text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground dark:from-foreground-dark dark:to-muted-foreground-dark animate-pulse">
            404
          </h1>
        </div>

        <div className="mb-8 relative">
          <div className="animate-bounce">
            <svg 
              className="w-32 h-32 mx-auto text-foreground dark:text-foreground-dark" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="1" 
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0118 12M6 20.291A7.962 7.962 0 016 12m0 8.291A7.962 7.962 0 016 12m0 8.291A7.962 7.962 0 016 12"
              />
            </svg>
          </div>
          
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-4 left-8 w-2 h-2 bg-foreground dark:bg-foreground-dark rounded-full animate-ping"></div>
            <div className="absolute top-12 right-8 w-3 h-3 bg-muted-foreground dark:bg-muted-foreground-dark rounded-full animate-ping delay-200"></div>
            <div className="absolute bottom-8 left-12 w-2 h-2 bg-muted-foreground dark:bg-muted-foreground-dark rounded-full animate-ping delay-400"></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-muted-foreground dark:bg-muted-foreground-dark rounded-full animate-ping delay-600"></div>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <h2 className="text-3xl font-bold text-foreground dark:text-foreground-dark">
            Oops! Siden blev ikke fundet
          </h2>
          <p className="text-muted-foreground dark:text-muted-foreground-dark text-lg">
            Siden du kigger efter er her ikke længre eller er blevet flyttet.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
        
               onClick={() => {
                window.history.back();
                setTimeout(() => window.location.reload(), 100);
              }}
            className="inline-flex items-center px-6 py-3 text-muted-foreground dark:text-muted-foreground-dark hover:text-foreground dark:hover:text-foreground-dark hover:bg-muted dark:hover:bg-muted-dark font-medium rounded-lg transition-all duration-200 border border-border dark:border-border-dark hover:border-border dark:hover:border-border-dark"
          >
            ← Gå Tilbage
          </button>

          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground dark:text-primary-foreground-dark font-semibold rounded-lg shadow-lg hover:bg-primary-dark transform hover:scale-105 transition-all duration-200"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Tilbage til Forsiden
          </Link>
        </div>

        <div className="mt-12 p-4 bg-muted dark:bg-muted-dark backdrop-blur-sm rounded-lg border border-border dark:border-border-dark">
          <p className="text-sm text-muted-foreground dark:text-muted-foreground-dark">
            💡 <strong className="text-foreground dark:text-foreground-dark">Ligegyldig Fakta:</strong> HTTP 404 fejl var navngivet efter rum 404 på CERN, der hvor the World Wide Web var opfundet!
          </p>
        </div>
      </div>
    </div>
  );
};
