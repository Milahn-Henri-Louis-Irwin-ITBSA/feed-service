import {
  JsonController,
  Post,
  BodyParam,
  HeaderParam,
} from 'routing-controllers';
import { URL_INFO } from '../feedApiInfo';
import { Service } from 'typedi';
import FeedSvc from '../service/FeedSvc';
import { DecodedIdToken } from 'firebase-admin/auth';
@JsonController(URL_INFO.contextPath + '/feed')
@Service()
export class FeedController {
  constructor(public _feedSvc: FeedSvc) {}
  @Post('/submitfeed')
  public async submitFeed(
    @HeaderParam('Authorization') token: string,
    @BodyParam('message') message: string
  ): Promise<any> {
    try {
      if (!message) {
        return Promise.resolve({
          status: 400,
          message: 'Invalid message',
        });
      }

      if (!token) {
        return Promise.resolve({
          status: 401,
          message: 'Invalid token',
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
      const resp = await this._feedSvc.submitFeedMSG(message, decodedToken);
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
