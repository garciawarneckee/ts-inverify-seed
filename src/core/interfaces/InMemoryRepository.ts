import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { DbClient } from '../db-clients/DbClient';
import { CrudRepository } from './CrudRepository';
import { Entity } from '../../domain/Entity';

@injectable()
export default abstract class InMemoryRepository<T extends Entity<ID>, ID>
  implements CrudRepository<T, ID> {

  private dbClient: DbClient;
  private db: Map<ID, T>;

  constructor(@inject(TYPES.MockDbClient) dbClient: DbClient) {
    this.dbClient = dbClient;
    this.db = new Map<ID, T>();
  }

  public async create(entity: T): Promise<void> {
    this.db.set(entity.getId(), entity);
  }

  public async findAll(filters?: Map<string, any> | undefined): Promise<T[]> {
    return Array.from(this.db.values());
  }

  public async findById(id: ID): Promise<T | undefined> {
    const entity: T | undefined = this.db.get(id);
    return entity;
  }

  public async delete(id: ID): Promise<ID> {
    this.db.delete(id);
    return id;
  }

  public async update(id: ID, updates: T): Promise<T> {
    const entity = await this.findById(id);
    if(!entity) { throw new Error("Resource not found"); }
    const updatedEntity = { ...entity, updates };
    this.db.set(entity.getId(), updatedEntity);
    return updatedEntity;
  }


}