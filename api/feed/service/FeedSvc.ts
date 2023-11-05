import { DecodedIdToken } from 'firebase-admin/auth';
import DatabaseConnector from '../../../libs/db/FeedDB';
import { Service } from 'typedi';
import { Timestamp, WriteResult } from 'firebase-admin/firestore';

@Service()
export default class LoggingSvc {
  private db: DatabaseConnector;
  constructor() {
    this.db = new DatabaseConnector();
  }

  public async verifyToken(token: string): Promise<DecodedIdToken | Error> {
    try {
      return await this.db.verifyJWT(token);
    } catch (e) {
      return new Error(e as string);
    }
  }

  public async submitFeedMSG(
    message: string,
    user: DecodedIdToken
  ): Promise<WriteResult> {
    return await this.db.set({
      created_at: Timestamp.now(),
      message,
      created_by: user.uid,
      created_by_pic: user.picture,
    });
  }
}
