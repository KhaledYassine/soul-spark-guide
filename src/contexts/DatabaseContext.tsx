
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { initializeRealm, getRealm, closeRealm, BSON } from '@/lib/database/mockRealmConfig';
import { UserData, DataLogHub } from '@/lib/database/localStorage';

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
        console.log('Initializing local database...');
        await initializeRealm();
        setIsRealmReady(true);
        console.log('Local database initialized successfully');
        
        // Load user sync preference
        const realm = getRealm();
        const userDataArray = realm.objects('UserData') as UserData[];
        const userData = userDataArray[0];
        if (userData) {
          setSyncPreferenceState(userData.syncPreference as 'local' | 'daily' | 'weekly');
        }
      } catch (error) {
        console.error('Failed to setup local database:', error);
        setIsRealmReady(false);
      }
    };

    setupRealm();

    return () => {
      try {
        closeRealm();
      } catch (error) {
        console.error('Error closing local database:', error);
      }
    };
  }, []);

  const setSyncPreference = async (preference: 'local' | 'daily' | 'weekly') => {
    setSyncPreferenceState(preference);
    
    if (isRealmReady) {
      try {
        const realm = getRealm();
        realm.write(() => {
          const userDataArray = realm.objects('UserData') as UserData[];
          let userData = userDataArray[0];
          if (!userData) {
            userData = realm.create('UserData', {
              _id: BSON.ObjectId().toString(),
              rephraseKey: 'default-key',
              createdAt: new Date(),
              updatedAt: new Date(),
              syncPreference: preference,
              doctorAdvices: [],
            }) as UserData;
          } else {
            (userData as any).syncPreference = preference;
            (userData as any).updatedAt = new Date();
          }
        });
      } catch (error) {
        console.error('Error updating sync preference:', error);
      }
    }
  };

  const saveEncryptedData = async (data: any, category: 'mood' | 'chat' | 'health') => {
    if (!isRealmReady) {
      console.warn('Database not ready, cannot save data');
      return;
    }

    try {
      const realm = getRealm();
      
      // Simple base64 encoding for demo (in production, use proper AES-256 encryption)
      const encryptedPayload = btoa(JSON.stringify(data));
      
      realm.write(() => {
        // Create encrypted data entry
        const encryptedData = realm.create('EncryptedData', {
          _id: BSON.ObjectId().toString(),
          encryptedPayload,
          _v: 1,
        });

        // Get or create user data
        const userDataArray = realm.objects('UserData') as UserData[];
        let userData = userDataArray[0];
        if (!userData) {
          userData = realm.create('UserData', {
            _id: BSON.ObjectId().toString(),
            rephraseKey: 'default-key',
            createdAt: new Date(),
            updatedAt: new Date(),
            syncPreference: syncPreference,
            doctorAdvices: [],
          }) as UserData;
        }

        // Get or create appropriate hub
        const hubField = `${category}LogHubId` as keyof UserData;
        let hubId = (userData as any)[hubField];
        
        if (!hubId) {
          const hub = realm.create('DataLogHub', {
            _id: BSON.ObjectId().toString(),
            entries: [],
          }) as DataLogHub;
          (userData as any)[hubField] = hub._id;
          hubId = hub._id;
        }

        // Add entry to hub
        const hub = realm.objectForPrimaryKey('DataLogHub', hubId) as DataLogHub;
        if (hub && hub.entries) {
          hub.entries.push({
            _id: encryptedData._id,
            timestamp: new Date(),
          });
        }

        (userData as any).updatedAt = new Date();
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
      const userDataArray = realm.objects('UserData') as UserData[];
      const userData = userDataArray[0];
      return userData?.doctorAdvices ? Array.from(userData.doctorAdvices) : [];
    } catch (error) {
      console.error('Error getting doctor advices:', error);
      return [];
    }
  };

  const addDoctorAdvice = async (doctorId: string, advice: string, category: string) => {
    if (!isRealmReady) {
      console.warn('Database not ready, cannot add doctor advice');
      return;
    }

    try {
      const realm = getRealm();
      
      realm.write(() => {
        const userDataArray = realm.objects('UserData') as UserData[];
        let userData = userDataArray[0];
        if (!userData) {
          userData = realm.create('UserData', {
            _id: BSON.ObjectId().toString(),
            rephraseKey: 'default-key',
            createdAt: new Date(),
            updatedAt: new Date(),
            syncPreference: syncPreference,
            doctorAdvices: [],
          }) as UserData;
        }

        if (userData.doctorAdvices) {
          userData.doctorAdvices.push({
            _id: BSON.ObjectId().toString(),
            doctorId,
            advice,
            timestamp: new Date(),
            category,
          });
        }

        (userData as any).updatedAt = new Date();
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
