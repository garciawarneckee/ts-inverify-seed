import { DbClient } from './DbClient';
import { injectable } from 'inversify';

@injectable()
export default class MockDbClient implements DbClient {

  public async connect(): Promise<boolean> {
    return true;
  }

}