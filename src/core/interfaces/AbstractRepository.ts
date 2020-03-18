import { inject, injectable } from "inversify";

import { CrudRepository } from "./CrudRepository";
import { DbClient } from "../dbs/DbClient";
import { Entity } from "../../domain/Entity";
import { TYPES } from "../../types";

@injectable()
export default abstract class MongoRepository<T extends Entity<ID>, ID>
  implements CrudRepository<T, ID> {

  private dbClient: DbClient;

  constructor(@inject(TYPES.MongoDbClient) dbClient: DbClient) {
    this.dbClient = dbClient;
  }

  public async create(entity: T): Promise<void> {
    throw new Error("Method not implemented");
  }

  public async findAll(filters?: Map<string, any> | undefined): Promise<T[]> {
    throw new Error("Method not implemented");
  }

  public async findById(id: ID): Promise<T | undefined> {
    throw new Error("Method not implemented");
  }

  public async delete(id: ID): Promise<ID> {
    throw new Error("Method not implemented");
  }

  public async update(id: ID, updates: T): Promise<T> {
    throw new Error("Method not implemented");
  }


}