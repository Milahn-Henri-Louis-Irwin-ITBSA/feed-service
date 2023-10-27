import admin from 'firebase-admin';
import type {
  CollectionReference,
  Firestore,
  WriteResult,
} from 'firebase-admin/firestore';
import type { DecodedIdToken } from 'firebase-admin/auth';
import IFeedDB from '../../interfaces/IFeedDB';
import type { LoggingData } from '../../types/types';
class FeedDB implements IFeedDB {
  private db: Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  public async set(data: LoggingData): Promise<WriteResult> {
    try {
      const collectionRef: CollectionReference = this.db.collection('feed');
      return await collectionRef.doc().set(data);
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async getByID(id: string): Promise<LoggingData | null> {
    try {
      const collectionRef: CollectionReference = this.db.collection('feed');
      const docRef = await collectionRef.doc(id).get();
      if (docRef.exists) {
        return docRef.data() as LoggingData;
      }
      return null;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async update(
    logReference: string,
    data: Partial<LoggingData>
  ): Promise<WriteResult> {
    try {
      const collectionRef: CollectionReference = this.db.collection('feed');
      return await collectionRef.doc(logReference).update(data);
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async deleteByID(id: string): Promise<Boolean> {
    try {
      const collectionRef: CollectionReference = this.db.collection('feed');
      return !!(await collectionRef.doc(id).delete());
    } catch (e: any) {
      throw new Error(e);
    }
  }

  public async verifyJWT(token: string): Promise<DecodedIdToken> {
    try {
      return await admin.auth().verifyIdToken(token);
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export default FeedDB;
