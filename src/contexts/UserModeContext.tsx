
import React, { createContext, useState, useContext, ReactNode } from 'react';

type UserMode = 'patient' | 'doctor';

interface UserModeContextType {
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  isDoctor: boolean;
}

const UserModeContext = createContext<UserModeContextType | undefined>(undefined);

export const UserModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userMode, setUserMode] = useState<UserMode>('patient');

  return (
    <UserModeContext.Provider value={{
      userMode,
      setUserMode,
      isDoctor: userMode === 'doctor'
    }}>
      {children}
    </UserModeContext.Provider>
  );
};

export const useUserMode = (): UserModeContextType => {
  const context = useContext(UserModeContext);
  if (context === undefined) {
    throw new Error('useUserMode must be used within a UserModeProvider');
  }
  return context;
};
