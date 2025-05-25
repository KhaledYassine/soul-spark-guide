
// Simple localStorage-based database implementation
// This replaces Realm for better compatibility in web environments

export interface EncryptedData {
  _id: string;
  encryptedPayload: string;
  _v: number;
}

export interface DataLogHub {
  _id: string;
  entries: Array<{ _id: string; timestamp: Date }>;
}

export interface UserData {
  _id: string;
  rephraseKey: string;
  createdAt: Date;
  updatedAt: Date;
  moodLogHubId?: string;
  chatHubId?: string;
  healthRecordHubId?: string;
  syncPreference: string;
  doctorAdvices: Array<{
    _id: string;
    doctorId: string;
    advice: string;
    timestamp: Date;
    category: string;
  }>;
}

// Simple ObjectId generator
export const generateObjectId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

class LocalStorageDB {
  private getKey(collection: string): string {
    return `mental_health_${collection}`;
  }

  private getData<T>(collection: string): T[] {
    try {
      const data = localStorage.getItem(this.getKey(collection));
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error reading ${collection} from localStorage:`, error);
      return [];
    }
  }

  private setData<T>(collection: string, data: T[]): void {
    try {
      localStorage.setItem(this.getKey(collection), JSON.stringify(data));
    } catch (error) {
      console.error(`Error writing ${collection} to localStorage:`, error);
    }
  }

  // Create a new document
  create<T extends { _id: string }>(collection: string, document: Omit<T, '_id'> & Partial<Pick<T, '_id'>>): T {
    const data = this.getData<T>(collection);
    const newDoc = {
      ...document,
      _id: document._id || generateObjectId(),
    } as T;
    
    data.push(newDoc);
    this.setData(collection, data);
    return newDoc;
  }

  // Find documents by query
  find<T>(collection: string, query?: Partial<T>): T[] {
    const data = this.getData<T>(collection);
    
    if (!query) {
      return data;
    }

    return data.filter(item => {
      return Object.keys(query).every(key => {
        return (item as any)[key] === (query as any)[key];
      });
    });
  }

  // Find one document
  findOne<T>(collection: string, query?: Partial<T>): T | null {
    const results = this.find<T>(collection, query);
    return results.length > 0 ? results[0] : null;
  }

  // Find by ID
  findById<T extends { _id: string }>(collection: string, id: string): T | null {
    return this.findOne<T>(collection, { _id: id } as Partial<T>);
  }

  // Update a document
  update<T extends { _id: string }>(collection: string, id: string, updates: Partial<T>): T | null {
    const data = this.getData<T>(collection);
    const index = data.findIndex(item => item._id === id);
    
    if (index === -1) {
      return null;
    }

    data[index] = { ...data[index], ...updates };
    this.setData(collection, data);
    return data[index];
  }

  // Delete a document
  delete(collection: string, id: string): boolean {
    const data = this.getData(collection);
    const index = data.findIndex((item: any) => item._id === id);
    
    if (index === -1) {
      return false;
    }

    data.splice(index, 1);
    this.setData(collection, data);
    return true;
  }

  // Transaction-like write operation
  write(callback: () => void): void {
    try {
      callback();
    } catch (error) {
      console.error('Error in write transaction:', error);
      throw error;
    }
  }

  // Get all objects of a type (Realm-like interface)
  objects<T>(collection: string): T[] {
    return this.getData<T>(collection);
  }
}

export const localDB = new LocalStorageDB();
