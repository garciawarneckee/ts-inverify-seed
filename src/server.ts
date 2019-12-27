import { DbClient } from './db-clients/DbClient';
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import * as bodyParser from "body-parser";
import { ObjectId } from "mongodb";
import { Container } from "inversify";

import { IUserService } from './users/interfaces/IUserService';
import { CrudController } from "./domain/CrudController";
import { CrudRepository } from "./domain/CrudRepository";
import { UserController } from "./users/UserController";
import UserRepository from "./users/UserRepository";
import { UserService } from "./users/UserService";

import User from "./domain/User";
import { TYPES } from "./types";
import MockDbClient from './db-clients/MockDbClient';

let container = new Container();

container
  .bind<DbClient>(TYPES.MockDbClient)
  .to(MockDbClient)
  .inSingletonScope();

container
  .bind<CrudRepository<User, ObjectId>>(TYPES.UserRepository)
  .to(UserRepository)
  .inSingletonScope();

container
  .bind<IUserService>(TYPES.UserService)
  .to(UserService)
  .inSingletonScope();

  container
  .bind<CrudController<User, ObjectId>>(TYPES.UserController)
  .to(UserController)
  .inSingletonScope();



// create server
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  // add body parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
});

let app = server.build();
app.listen(8080, () => console.log("Server app & running in port 8080"));