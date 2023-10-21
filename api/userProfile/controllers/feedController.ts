import {
  JsonController,
  Post,
  BodyParam,
  HeaderParam,
} from 'routing-controllers';
import { FEED_INFO } from '../feedApiInfo';
import { Service } from 'typedi';
import FeedSvc from '../service/FeedSvc';
import { DecodedIdToken } from 'firebase-admin/auth';
@JsonController(FEED_INFO.contextPath + '/feed')
@Service()
export class FeedController {
  constructor(public _feedSvc: FeedSvc) {}
  @Post('/submitfeed')
  public async submitFeed(
    @HeaderParam('Authorization') token: string,
    @BodyParam('message') message: string,
    @BodyParam('tag') tag: string,
    @BodyParam('location') location: string
  ): Promise<any> {
    try {
      if (!message) {
        return Promise.reject({
          status: 400,
          message: 'Invalid log',
        });
      }
      // make sure all the body params are present
      if (!message || !tag || !location || !token) {
        return Promise.reject({
          status: 400,
          message: 'Missing required body params',
        });
      }
      token = token.split(' ')[1];

      const decodedToken: DecodedIdToken | Error =
        await this._feedSvc.verifyToken(token);

      if (decodedToken instanceof Error) {
        return Promise.resolve({
          status: 401,
          message: 'Invalid token',
        });
      }
      const resp = await this._feedSvc.submitLog({
        message,
        tag,
        location,
        user_uid: decodedToken.uid,
        response_code: 200,
      });
      return Promise.resolve({
        status: 200,
        message: 'Feed service updated successfully',
        data: resp,
      });
    } catch (error) {
      return Promise.reject({
        status: 500,
        message: error,
      });
    }
  }
}
