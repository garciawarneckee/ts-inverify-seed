import express, { Application } from "express";

import { ServerModule } from "./ServerModule";

export default class ExpressModule implements ServerModule<Application> {

  private readonly MODULE_NAME: string = "Express";
  private readonly DEFAULT_PORT: number = 3000;


  private application: Application;
  private port?: number;

  constructor() {
    this.application = express();
  }

  public getServer(): Application {
    return this.application;
  }

  public getName(): string {
    return this.MODULE_NAME;
  }

  public withPort(port: number): ServerModule<Application> {
    this.port = port;
    return this;
  }

  public async start(): Promise<void> {
    const serverPort: number = this.port || this.DEFAULT_PORT;
    this.application.listen(serverPort, (error) => {
      if (error) console.error(`Something when wrong during the bootstrap ${error.message}`);
      console.log(`Server up and running on port ${serverPort}`);
    });

  }

}