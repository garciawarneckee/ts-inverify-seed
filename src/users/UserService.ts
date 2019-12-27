import { injectable, inject } from 'inversify';
import { ObjectId } from 'mongodb';


import { CrudRepository } from '../domain/CrudRepository';
import { IUserService } from './interfaces/IUserService';
import UserRepository from './UserRepository';
import User from '../domain/User';
import { TYPES } from '../types';

@injectable()
export class UserService implements IUserService {

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

  public async findById(id: ObjectId): Promise<User> {
    return await this.repository.findById(id);
  }

  public async delete(id: ObjectId): Promise<ObjectId> {
    return await this.repository.delete(id);
  }

  public async update(id: ObjectId, updates: User): Promise<User> {
    return await this.repository.update(id, updates);
  }
}
