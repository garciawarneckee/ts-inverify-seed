import "reflect-metadata";
import express from "express";
import * as bodyParser from "body-parser";

import { CrudController } from "./core/interfaces/CrudController";
import { UserController } from "./users/UserController";
import { container } from "./ioc";

const app = express();

const userController = container.get<CrudController>(UserController);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/users", userController.getRouter());

app.listen(8080, () => console.log("Server app & running in port 8080"));