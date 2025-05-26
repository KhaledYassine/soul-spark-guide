
// Mock Realm configuration using localStorage
import { localDB, generateObjectId } from './localStorage';

let isInitialized = false;

export const initializeRealm = async () => {
  if (isInitialized) {
    return Promise.resolve();
  }

  try {
    console.log('Initializing local database...');
    
    // Initialize collections if they don't exist
    const collections = ['UserData', 'EncryptedData', 'DataLogHub'];
    collections.forEach(collection => {
      const existing = localDB.find(collection);
      if (existing.length === 0) {
        console.log(`Initialized ${collection} collection`);
      }
    });

    isInitialized = true;
    console.log('Local database initialized successfully');
    return Promise.resolve();
  } catch (error) {
    console.error('Failed to initialize local database:', error);
    throw error;
  }
};

export const getRealm = () => {
  if (!isInitialized) {
    throw new Error('Database not initialized. Call initializeRealm() first.');
  }
  
  return {
    objects: (collection: string) => localDB.objects(collection),
    objectForPrimaryKey: (collection: string, id: string) => localDB.findById(collection, id),
    create: (collection: string, data: any) => {
      const doc = {
        ...data,
        _id: data._id || generateObjectId(),
      };
      const createdDoc = localDB.create(collection, doc);
      return createdDoc; // Return the full created document
    },
    write: (callback: () => void) => localDB.write(callback),
  };
};

export const closeRealm = () => {
  if (isInitialized) {
    isInitialized = false;
    console.log('Local database closed');
  }
};

// Mock BSON ObjectId
export const BSON = {
  ObjectId: () => ({
    toString: () => generateObjectId(),
    valueOf: () => generateObjectId(),
  }),
};
