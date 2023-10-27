import { DecodedIdToken } from 'firebase-admin/auth';
import DatabaseConnector from '../../../libs/db/LoggingDB';
import { Service } from 'typedi';
import { Timestamp } from 'firebase-admin/firestore';

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

  public async submitLog(log: any): Promise<any> {
    return await this.db.set({
      created_at: Timestamp.now(),
      type: log.type, //What is type??
      written_by: log.written_by,
      message: log.message,
      user_uid: log.user_uid,
    });
  }
}
