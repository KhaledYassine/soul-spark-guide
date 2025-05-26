
// MongoDB Atlas integration for cloud sync
import { MongoClient, Db, Collection } from 'mongodb';
import { UserData, EncryptedData, DataLogHub, encryptData, decryptData } from './localStorage';

interface MongoConfig {
  connectionString: string;
  databaseName: string;
}

export class MongoAtlasSync {
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private isConnected = false;

  constructor(private config: MongoConfig) {}

  async connect(): Promise<boolean> {
    try {
      if (this.isConnected && this.client) {
        return true;
      }

      console.log('Connecting to MongoDB Atlas...');
      this.client = new MongoClient(this.config.connectionString);
      await this.client.connect();
      this.db = this.client.db(this.config.databaseName);
      this.isConnected = true;
      
      console.log('Connected to MongoDB Atlas successfully');
      return true;
    } catch (error) {
      console.error('Failed to connect to MongoDB Atlas:', error);
      this.isConnected = false;
      return false;
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      this.isConnected = false;
      console.log('Disconnected from MongoDB Atlas');
    }
  }

  private getCollection<T>(name: string): Collection<T> {
    if (!this.db) {
      throw new Error('Database not connected');
    }
    return this.db.collection<T>(name);
  }

  async syncUserData(userData: UserData): Promise<boolean> {
    try {
      if (!this.isConnected) {
        await this.connect();
      }

      const collection = this.getCollection<UserData>('userData');
      
      // Encrypt sensitive data before syncing
      const encryptedUserData = {
        ...userData,
        doctorAdvices: userData.doctorAdvices.map(advice => ({
          ...advice,
          advice: encryptData(advice.advice)
        })),
        lastSynced: new Date()
      };

      await collection.replaceOne(
        { _id: userData._id },
        encryptedUserData,
        { upsert: true }
      );

      console.log('User data synced to MongoDB Atlas');
      return true;
    } catch (error) {
      console.error('Error syncing user data:', error);
      return false;
    }
  }

  async syncEncryptedData(data: EncryptedData[]): Promise<boolean> {
    try {
      if (!this.isConnected) {
        await this.connect();
      }

      const collection = this.getCollection<EncryptedData>('encryptedData');
      
      // Batch upsert encrypted data
      const operations = data.map(item => ({
        replaceOne: {
          filter: { _id: item._id },
          replacement: { ...item, lastSynced: new Date() },
          upsert: true
        }
      }));

      if (operations.length > 0) {
        await collection.bulkWrite(operations);
        console.log(`Synced ${operations.length} encrypted data items to MongoDB Atlas`);
      }

      return true;
    } catch (error) {
      console.error('Error syncing encrypted data:', error);
      return false;
    }
  }

  async fetchUserData(userId: string): Promise<UserData | null> {
    try {
      if (!this.isConnected) {
        await this.connect();
      }

      const collection = this.getCollection<UserData>('userData');
      const userData = await collection.findOne({ _id: userId });

      if (userData) {
        // Decrypt sensitive data after fetching
        userData.doctorAdvices = userData.doctorAdvices.map(advice => ({
          ...advice,
          advice: decryptData(advice.advice)
        }));
      }

      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }

  async getConnectionStatus(): Promise<boolean> {
    return this.isConnected;
  }
}

// Factory function to create MongoDB Atlas sync instance
export const createMongoAtlasSync = (connectionString: string): MongoAtlasSync => {
  return new MongoAtlasSync({
    connectionString,
    databaseName: 'mental_health_app'
  });
};
