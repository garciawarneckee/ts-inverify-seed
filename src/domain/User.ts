import { ObjectId } from "mongodb";
import { Entity } from './Entity';

export default class User implements Entity<string> {

  private id: string;
  private firstName: string | undefined;
  private lastName: string | undefined;
  private birthDate: number | undefined;

  constructor(firstName?: string, lastName?: string, birthDate?: number) {
    this.id = new ObjectId().toHexString();
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
  }

  public static createEmptyUser(): User {
    return new User();
  }

  public static createUserWithName(firtName: string, lastName: string): User {
    return new User(firtName, lastName);
  }

  public static createFullUser(firtName: string, lastName: string, birthDate: number): User {
    return new User(firtName, lastName, birthDate);
  }

  public getId(): string {
    return this.id;
  }

  public withFirstName(firstName: string): User {
    this.firstName = firstName;
    return this;
  }

  public getFirstName(): string | undefined {
    return this.firstName;
  }

  public withLastName(lastName: string): User {
    this.lastName = lastName;
    return this;
  }

  public getLastName(): string | undefined {
    return this.firstName;
  }

  public withBirthDate(birthDate: number): User {
    this.birthDate = birthDate;
    return this;
  }

  public getBirthDate(): number | undefined {
    return this.birthDate;
  }
}