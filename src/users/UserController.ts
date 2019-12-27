import { IUserService } from './interfaces/IUserService';
import { controller, httpPost, httpGet, httpDelete, httpPut } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { ObjectId } from 'mongodb';

import { CrudController } from '../domain/CrudController';
import User from '../domain/User';
import { TYPES } from '../types';

@controller("/users")
export class UserController implements CrudController<User, ObjectId> {

  private service: IUserService;

  constructor(@inject(TYPES.UserService) service: IUserService) {
    this.service = service;
  }

  @httpPost("/")
  public async create(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, birthDate } = req.body;
    const newUser: User = await this.service.create(firstName, lastName, birthDate);
    res.status(201).send({ user: newUser });
  }

  @httpGet("/")
  public async findAll(req: Request, res: Response): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  @httpGet("/:id")
  public async findById(req: Request, res: Response): Promise<User> {
    throw new Error("Method not implemented.");
  }

  @httpDelete("/:id")
  public async delete(req: Request, res: Response): Promise<ObjectId> {
    throw new Error("Method not implemented.");
  }

  @httpPut("/:id")
  public async update(req: Request, res: Response): Promise<User> {
    throw new Error("Method not implemented.");
  }

}