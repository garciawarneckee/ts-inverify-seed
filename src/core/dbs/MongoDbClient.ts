import { MongoClient } from "mongodb";
import { injectable, inject } from "inversify";

import { DbClient } from "./DbClient";
import { TYPES } from "../../types";


@injectable()
export default class MongoDbClient implements DbClient {

  private client: MongoClient = {} as MongoClient;

  constructor(
    @inject(TYPES.DbHost) private dbHost: string,
    @inject(TYPES.DbPort) private dbPort: string,
    @inject(TYPES.DbUsername) private dbUsername: string,
    @inject(TYPES.DbPassword) private dbPassword: string,
  ) {

  }

  public async connect(): Promise<boolean> {
    this.client = await MongoClient
      .connect(`mongodb://${this.dbUsername}@${this.dbPassword}${this.dbHost}:${this.dbPort}`);
    return this.client.isConnected();
  }

  //TODO type this.
  public getClient(): any {
    return this.client;
  }

}