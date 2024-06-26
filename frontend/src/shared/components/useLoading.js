import React, { useState, useContext, createContext } from 'react';
import LoadingIndicator from './LoadingIndicator';

// Context to pass the loading functions and state across the app
const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const show = () => setIsLoading(true);
  const hide = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ show, hide }}>
      {children}
      {isLoading && <LoadingIndicator />}
    </LoadingContext.Provider>
  );
};

// Hook to use the loading context
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
