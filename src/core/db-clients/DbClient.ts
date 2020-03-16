import { MongoClient } from "mongodb";

export interface DbClient {
  connect(): Promise<boolean>;
  insert(params: any): Promise<any>;
  update(): Promise<any>;
  delete(): Promise<any>;
}

export class MongoDbClient implements DbClient {

  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(process.env.DB_URI!);
  }

  public async connect(): Promise<boolean> {
    this.client = await this.client.connect();
    return true;
  }

  public async insert(params: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  public async update(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  public async delete(): Promise<any> {
    throw new Error("Method not implemented.");
  }

}




