import { Request, Response } from "express";

export interface CrudController<T, ID> {
  create(req: Request, res: Response): Promise<void>;
  findAll(req: Request, res: Response): Promise<T[]>;
  findById(req: Request, res: Response): Promise<T>;
  delete(req: Request, res: Response): Promise<ID>;
  update(req: Request, res: Response): Promise<T>;
}