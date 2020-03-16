import { Container } from "inversify";
import { DepsManager, Servers, DatabaseClients, MessagingClients } from "../constants";

export interface WargConfg {
  ioc: DepsManager;
  server: Servers;
  database: DatabaseClients;
  messaging: MessagingClients;
}

export default class Initiliazer {

  private static readonly instance: Initiliazer;

  private container: Container = new Container();

  private constructor() {
    
  }

  public static getInstance(): Initiliazer {
    return (!this.instance) ? new Initiliazer() : this.instance;
  }

  public config(config: WargConfg = {
    ioc: DepsManager.Inversify,
    server: Servers.Express,
    database: DatabaseClients.Mongo,
    messaging: MessagingClients.Rabbit,
  }): Initiliazer {
    return this;
  }

}