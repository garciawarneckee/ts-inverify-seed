export interface DbClient {
  connect(): Promise<boolean>;
}