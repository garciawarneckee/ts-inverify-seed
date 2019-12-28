import User from "../../domain/User";

export interface IUserService<ID> {
  create(fristName: string, lastName: string, birthDate: number): Promise<User>;
  findById(id: ID): Promise<User>;
}