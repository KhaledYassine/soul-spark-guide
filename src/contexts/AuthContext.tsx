
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  const connect = () => {
    // This is a mock implementation for now
    // In a real app, this would connect to HashPack via WalletConnect
    console.log("Connecting to wallet...");
    setIsConnected(true);
  };

  const disconnect = () => {
    // This is a mock implementation for now
    console.log("Disconnecting from wallet...");
    setIsConnected(false);
  };

  return (
    <AuthContext.Provider value={{ isConnected, connect, disconnect }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
