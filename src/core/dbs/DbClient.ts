

export interface DbClient {
  connect(): Promise<boolean>;
  getClient(): any;
}




