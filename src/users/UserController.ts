import { controller, httpPost, httpGet, httpDelete, httpPut } from "inversify-express-utils";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { inject } from "inversify";

import { CrudController } from "../core/interfaces/CrudController";
import { IUserService } from "./interfaces/IUserService";
import { HttpCodes } from "./../core/enums/HttpCodes";
import User from "../domain/User";
import { TYPES } from "../types";
import ErrorBuilder from "../core/errors/ErrorBuilder";

@controller("/users")
export class UserController implements CrudController {

  private service: IUserService<string>;
  private errorBuilder: ErrorBuilder;

  constructor(
    @inject(TYPES.UserService) service: IUserService<string>,
    @inject(TYPES.ErrorBuilder) errorBuilder: ErrorBuilder,
    ) {
    this.service = service;
    this.errorBuilder = errorBuilder;
  }

  @httpPost("/")
  public async create(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, birthDate } = req.body;
    const newUser: User = await this.service.create(firstName, lastName, birthDate);
    res.status(HttpCodes.CREATED).send({ user: newUser });
  }

  @httpGet("/")
  public async findAll(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }

  @httpGet("/:id")
  public async findById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const user: User = await this.service.findById(id);
      res.status(HttpCodes.OK).send({ user });
    } catch (error) {
      const code: number = this.errorBuilder.build(error);
      res.status(code).json({ error: error.message });
    }
  }

  @httpDelete("/:id")
  public async delete(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }

  @httpPut("/:id")
  public async update(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }

}