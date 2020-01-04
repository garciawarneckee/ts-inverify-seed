import { IRequestValidator } from './core/interfaces/IRequestValidator';
import { Container } from "inversify";

import { CrudRepository } from "./core/interfaces/CrudRepository";
import { CrudController } from "./core/interfaces/CrudController";
import RequestValidator from './core/requests/RequestValidator';
import { IUserService } from "./users/interfaces/IUserService";
import MockDbClient from "./core/db-clients/MockDbClient";
import { UserController } from "./users/UserController";
import ErrorBuilder from "./core/errors/ErrorBuilder";
import { DbClient } from "./core/db-clients/DbClient";
import UserRepository from "./users/UserRepository";
import { UserService } from "./users/UserService";
import User from "./domain/User";
import { TYPES } from "./types";

const container = new Container();

container
  .bind<DbClient>(TYPES.MockDbClient)
  .to(MockDbClient)
  .inSingletonScope();

container
  .bind<CrudRepository<User, string>>(TYPES.UserRepository)
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
  .bind<IRequestValidator>(TYPES.RequestValidator)
  .to(RequestValidator)
  .inSingletonScope();

container
  .bind<ErrorBuilder>(TYPES.ErrorBuilder)
  .to(ErrorBuilder)
  .inSingletonScope();

export { container };