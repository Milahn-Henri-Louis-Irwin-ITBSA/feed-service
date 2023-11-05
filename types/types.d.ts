import type { Timestamp } from 'firebase-admin/firestore';
import type { DecodedIdToken } from 'firebase-admin/auth';
export type LoggingData = {
  created_at: Timestamp;
  message: string;
  created_by: DecodedIdToken['uid'];
  created_by_pic: DecodedIdToken['picture'];
};
