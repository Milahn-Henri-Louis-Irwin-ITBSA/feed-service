import type { LoggingData } from '../types/types';
import type { WriteResult } from 'firebase-admin/firestore';
interface IFeedDB {
  set(data: LoggingData): Promise<WriteResult>;
  getByID(id: string): Promise<LoggingData | null>;
  update(
    logReference: string,
    data: Partial<LoggingData>
  ): Promise<WriteResult>;
  deleteByID(id: string): Promise<Boolean>;
}
export default IFeedDB;
