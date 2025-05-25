
import Realm, { BSON } from 'realm';

// EncryptedData Schema
export class EncryptedData extends Realm.Object {
  _id!: BSON.ObjectId;
  encryptedPayload!: string; // Base64 encoded AES-256 encrypted content
  _v!: number; // Version for schema evolution

  static schema = {
    name: 'EncryptedData',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      encryptedPayload: 'string',
      _v: 'int',
    },
  };
}

// DataLogHub Schema
export class DataLogHub extends Realm.Object {
  _id!: BSON.ObjectId;
  entries!: Realm.List<{ _id: BSON.ObjectId; timestamp: Date }>;

  static schema = {
    name: 'DataLogHub',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      entries: {
        type: 'list',
        objectType: 'mixed', // For storing { _id, timestamp } objects
      },
    },
  };
}

// UserData Schema
export class UserData extends Realm.Object {
  _id!: BSON.ObjectId;
  rephraseKey!: string; // Encryption key reference
  createdAt!: Date;
  updatedAt!: Date;
  moodLogHubId?: BSON.ObjectId;
  chatHubId?: BSON.ObjectId;
  healthRecordHubId?: BSON.ObjectId;
  syncPreference!: string; // 'local', 'daily', 'weekly'
  doctorAdvices!: Realm.List<{
    _id: BSON.ObjectId;
    doctorId: string;
    advice: string;
    timestamp: Date;
    category: string;
  }>;

  static schema = {
    name: 'UserData',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      rephraseKey: 'string',
      createdAt: 'date',
      updatedAt: 'date',
      moodLogHubId: 'objectId?',
      chatHubId: 'objectId?',
      healthRecordHubId: 'objectId?',
      syncPreference: 'string',
      doctorAdvices: {
        type: 'list',
        objectType: 'mixed',
      },
    },
  };
}

export const schemas = [EncryptedData, DataLogHub, UserData];
