
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  licenseNumber: string;
  email: string;
}

interface DoctorAuthContextType {
  doctor: Doctor | null;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  sessionToken: string | null;
  isSessionValid: () => boolean;
}

const DoctorAuthContext = createContext<DoctorAuthContextType | undefined>(undefined);

export const DoctorAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [sessionExpiry, setSessionExpiry] = useState<number | null>(null);

  const login = async (credentials: { email: string; password: string }): Promise<boolean> => {
    // Mock authentication - replace with real API call
    if (credentials.email === 'doctor@example.com' && credentials.password === 'password') {
      const mockDoctor: Doctor = {
        id: 'doc-001',
        name: 'Dr. Sarah Wilson',
        specialization: 'Clinical Psychology',
        licenseNumber: 'PSY-12345',
        email: credentials.email,
      };
      
      const token = `token-${Date.now()}`;
      const expiry = Date.now() + (8 * 60 * 60 * 1000); // 8 hours
      
      setDoctor(mockDoctor);
      setSessionToken(token);
      setSessionExpiry(expiry);
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setDoctor(null);
    setSessionToken(null);
    setSessionExpiry(null);
  };

  const isSessionValid = (): boolean => {
    if (!sessionToken || !sessionExpiry) return false;
    return Date.now() < sessionExpiry;
  };

  return (
    <DoctorAuthContext.Provider value={{
      doctor,
      isAuthenticated: !!doctor && isSessionValid(),
      login,
      logout,
      sessionToken,
      isSessionValid,
    }}>
      {children}
    </DoctorAuthContext.Provider>
  );
};

export const useDoctorAuth = (): DoctorAuthContextType => {
  const context = useContext(DoctorAuthContext);
  if (context === undefined) {
    throw new Error('useDoctorAuth must be used within a DoctorAuthProvider');
  }
  return context;
};
