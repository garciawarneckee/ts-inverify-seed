import { Router, Request, Response } from "express";
import { inject } from "inversify";

import { CrudController } from "../core/interfaces/CrudController";
import { IUserService } from "./interfaces/IUserService";
import ErrorBuilder from "../core/errors/ErrorBuilder";
import { HttpCodes } from "./../core/enums/HttpCodes";
import User from "../domain/User";
import { TYPES } from "../types";

export class UserController implements CrudController {

  private service: IUserService<string>;
  private errorBuilder: ErrorBuilder;
  private router: Router;

  constructor(
    @inject(TYPES.UserService) service: IUserService<string>,
    @inject(TYPES.ErrorBuilder) errorBuilder: ErrorBuilder,
  ) {
    this.service = service;
    this.errorBuilder = errorBuilder;
    this.router = this.initRoutes(Router());
  }

  public getRouter(): Router {
    return this.router;
  }

  public async create(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, birthDate } = req.body;
    const newUser: User = await this.service.create(firstName, lastName, birthDate);
    res.status(HttpCodes.CREATED).send({ user: newUser });
  }

  public async findAll(req: Request, res: Response): Promise<void> {
    const users: User[] = await this.service.findAll();
    res.status(HttpCodes.OK).send({ users });
  }

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

  public async delete(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async update(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private initRoutes(router: Router): Router {
    router.post("/", this.create);
    router.get("/", this.findAll);
    router.get("/:id", this.findById);
    router.delete("/:id", this.delete);
    router.put("/:id", this.update);
    return router;
  }

}