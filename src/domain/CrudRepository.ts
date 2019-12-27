export interface CrudRepository<T, ID> {
  create(entity: T): Promise<void>;
  findAll(filters?: Map<string, any>): Promise<T[]>;
  findById(id: ID): Promise<T>;
  delete(id: ID): Promise<ID>;
  update(id: ID, updates: T): Promise<T>;
}

