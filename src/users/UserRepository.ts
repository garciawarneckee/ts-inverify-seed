import { injectable } from "inversify";
import { ObjectId } from "mongodb";

import User from "../domain/User";
import InMemoryRepository from "../core/interfaces/InMemoryRepository";

@injectable()
export default class UserRepository extends InMemoryRepository<User, ObjectId> {

}