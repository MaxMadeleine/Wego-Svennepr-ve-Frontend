import React from 'react';
import { Toaster } from 'react-hot-toast';

export const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#374151',
            color: '#fff',
            fontSize: '14px',
            padding: '12px 16px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            maxWidth: '300px',
          },
          success: {
            style: {
              background: '#00A6DB',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#09366D',
            },
          },
          error: {
            style: {
              background: '#dc2626',
              border: '1px solid #ef4444',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#dc2626',
            },
          },
        }}
      />
    </>
  );
}; 