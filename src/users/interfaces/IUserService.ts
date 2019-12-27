export interface IUserService {
  create(fristName: string, lastName: string, birthDate: number): Promise<User>;
}