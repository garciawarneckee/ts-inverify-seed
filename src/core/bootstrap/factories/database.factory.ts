import { DbClient } from "./../../db-clients/DbClient";
import { DatabaseClients } from "./../../constants";

export interface DatabaseFactory {
  getClient(clientId: DatabaseClients): DbClient;
}

export default class DatabaseFactory {
  
}