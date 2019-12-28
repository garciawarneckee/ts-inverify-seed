import { DbClient } from './core/db-clients/DbClient';
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import * as bodyParser from "body-parser";
import { ObjectId } from "mongodb";
import { Container } from "inversify";

import { IUserService } from './users/interfaces/IUserService';
import { CrudController } from "./core/interfaces/CrudController";
import { CrudRepository } from "./core/interfaces/CrudRepository";
import { UserController } from "./users/UserController";
import UserRepository from "./users/UserRepository";
import { UserService } from "./users/UserService";

import User from "./domain/User";
import { TYPES } from "./types";
import MockDbClient from './core/db-clients/MockDbClient';
import ErrorBuilder from './core/errors/ErrorBuilder';

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
  .bind<IUserService<string>>(TYPES.UserService)
  .to(UserService)
  .inSingletonScope();

container
  .bind<CrudController>(TYPES.UserController)
  .to(UserController)
  .inSingletonScope();

container
  .bind<ErrorBuilder>(TYPES.ErrorBuilder)
  .to(ErrorBuilder)
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