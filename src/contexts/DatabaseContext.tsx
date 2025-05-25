
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { initializeRealm, getRealm, closeRealm } from '@/lib/database/realmConfig';
import { BSON } from 'realm';

interface DatabaseContextType {
  isRealmReady: boolean;
  syncPreference: 'local' | 'daily' | 'weekly';
  setSyncPreference: (preference: 'local' | 'daily' | 'weekly') => void;
  saveEncryptedData: (data: any, category: 'mood' | 'chat' | 'health') => Promise<void>;
  getDoctorAdvices: () => any[];
  addDoctorAdvice: (doctorId: string, advice: string, category: string) => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isRealmReady, setIsRealmReady] = useState(false);
  const [syncPreference, setSyncPreferenceState] = useState<'local' | 'daily' | 'weekly'>('local');

  useEffect(() => {
    const setupRealm = async () => {
      try {
        console.log('Initializing Realm database...');
        await initializeRealm();
        setIsRealmReady(true);
        console.log('Realm database initialized successfully');
        
        // Load user sync preference
        const realm = getRealm();
        const userData = realm.objects('UserData')[0];
        if (userData) {
          setSyncPreferenceState(userData.syncPreference as 'local' | 'daily' | 'weekly');
        }
      } catch (error) {
        console.error('Failed to setup Realm:', error);
        setIsRealmReady(false);
      }
    };

    setupRealm();

    return () => {
      try {
        closeRealm();
      } catch (error) {
        console.error('Error closing Realm:', error);
      }
    };
  }, []);

  const setSyncPreference = async (preference: 'local' | 'daily' | 'weekly') => {
    setSyncPreferenceState(preference);
    
    if (isRealmReady) {
      try {
        const realm = getRealm();
        realm.write(() => {
          let userData = realm.objects('UserData')[0];
          if (!userData) {
            userData = realm.create('UserData', {
              _id: new BSON.ObjectId(),
              rephraseKey: 'default-key',
              createdAt: new Date(),
              updatedAt: new Date(),
              syncPreference: preference,
              doctorAdvices: [],
            });
          } else {
            userData.syncPreference = preference;
            userData.updatedAt = new Date();
          }
        });
      } catch (error) {
        console.error('Error updating sync preference:', error);
      }
    }
  };

  const saveEncryptedData = async (data: any, category: 'mood' | 'chat' | 'health') => {
    if (!isRealmReady) {
      console.warn('Realm not ready, cannot save data');
      return;
    }

    try {
      const realm = getRealm();
      
      // Simple base64 encoding for demo (in production, use proper AES-256 encryption)
      const encryptedPayload = btoa(JSON.stringify(data));
      
      realm.write(() => {
        // Create encrypted data entry
        const encryptedData = realm.create('EncryptedData', {
          _id: new BSON.ObjectId(),
          encryptedPayload,
          _v: 1,
        });

        // Get or create user data
        let userData = realm.objects('UserData')[0];
        if (!userData) {
          userData = realm.create('UserData', {
            _id: new BSON.ObjectId(),
            rephraseKey: 'default-key',
            createdAt: new Date(),
            updatedAt: new Date(),
            syncPreference: syncPreference,
            doctorAdvices: [],
          });
        }

        // Get or create appropriate hub
        const hubField = `${category}LogHubId`;
        let hubId = userData[hubField];
        
        if (!hubId) {
          const hub = realm.create('DataLogHub', {
            _id: new BSON.ObjectId(),
            entries: [],
          });
          userData[hubField] = hub._id;
          hubId = hub._id;
        }

        // Add entry to hub
        const hub = realm.objectForPrimaryKey('DataLogHub', hubId);
        if (hub) {
          hub.entries.push({
            _id: encryptedData._id,
            timestamp: new Date(),
          });
        }

        userData.updatedAt = new Date();
      });
      
      console.log(`Saved encrypted ${category} data successfully`);
    } catch (error) {
      console.error('Error saving encrypted data:', error);
    }
  };

  const getDoctorAdvices = () => {
    if (!isRealmReady) return [];
    
    try {
      const realm = getRealm();
      const userData = realm.objects('UserData')[0];
      return userData?.doctorAdvices ? Array.from(userData.doctorAdvices) : [];
    } catch (error) {
      console.error('Error getting doctor advices:', error);
      return [];
    }
  };

  const addDoctorAdvice = async (doctorId: string, advice: string, category: string) => {
    if (!isRealmReady) {
      console.warn('Realm not ready, cannot add doctor advice');
      return;
    }

    try {
      const realm = getRealm();
      
      realm.write(() => {
        let userData = realm.objects('UserData')[0];
        if (!userData) {
          userData = realm.create('UserData', {
            _id: new BSON.ObjectId(),
            rephraseKey: 'default-key',
            createdAt: new Date(),
            updatedAt: new Date(),
            syncPreference: syncPreference,
            doctorAdvices: [],
          });
        }

        userData.doctorAdvices.push({
          _id: new BSON.ObjectId(),
          doctorId,
          advice,
          timestamp: new Date(),
          category,
        });

        userData.updatedAt = new Date();
      });
      
      console.log('Added doctor advice successfully');
    } catch (error) {
      console.error('Error adding doctor advice:', error);
    }
  };

  return (
    <DatabaseContext.Provider value={{
      isRealmReady,
      syncPreference,
      setSyncPreference,
      saveEncryptedData,
      getDoctorAdvices,
      addDoctorAdvice,
    }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = (): DatabaseContextType => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
