import { EntityNotFoundError } from './../core/errors/index';
import { ObjectId } from "mongodb";
import { injectable, inject } from "inversify";

import { CrudRepository } from "../core/interfaces/CrudRepository";
import { IUserService } from "./interfaces/IUserService";
import UserRepository from "./UserRepository";
import User from "../domain/User";
import { TYPES } from "../types";

@injectable()
export class UserService implements IUserService<string> {

  private repository: CrudRepository<User, ObjectId>;

  constructor(@inject(TYPES.UserRepository) userRepository: UserRepository) {
    this.repository = userRepository;
  }

  public async create(firstName: string, lastName: string, birthDate: number): Promise<User> {
    const newUser = User.createFullUser(firstName, lastName, birthDate);
    await this.repository.create(newUser);
    return newUser;
  }

  public async findAll(filters?: Map<string, any> | undefined): Promise<User[]> {
    return await this.repository.findAll(filters);
  }

  public async findById(id: string): Promise<User> {
    const objId: ObjectId = new ObjectId(id);
    const user: User | undefined = await this.repository.findById(objId);
    if(!user) { throw new EntityNotFoundError(User.name, id); }
    return user;
  }

  public async delete(id: string): Promise<ObjectId> {
    const objId: ObjectId = new ObjectId(id);
    return await this.repository.delete(objId);
  }

  public async update(id: string, updates: User): Promise<User> {
    const objId: ObjectId = new ObjectId(id);
    return await this.repository.update(objId, updates);
  }
}
