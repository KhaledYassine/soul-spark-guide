
import Realm from 'realm';
import { schemas } from './schemas';

let realmInstance: Realm | null = null;

export const initializeRealm = async () => {
  if (realmInstance) {
    return realmInstance;
  }

  try {
    console.log('Opening Realm database...');
    realmInstance = await Realm.open({
      schema: schemas,
      schemaVersion: 1,
    });
    
    console.log('Realm initialized successfully');
    return realmInstance;
  } catch (error) {
    console.error('Failed to initialize Realm:', error);
    throw error;
  }
};

export const getRealm = () => {
  if (!realmInstance) {
    throw new Error('Realm not initialized. Call initializeRealm() first.');
  }
  return realmInstance;
};

export const closeRealm = () => {
  if (realmInstance) {
    realmInstance.close();
    realmInstance = null;
    console.log('Realm database closed');
  }
};
