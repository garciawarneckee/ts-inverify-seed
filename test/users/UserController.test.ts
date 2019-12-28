import "reflect-metadata";

import  express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { Mock, It, Times } from "moq.ts";
import { ObjectId } from "mongodb";
import supertest from "supertest";

import { IUserService } from "./../../src/users/interfaces/IUserService";
import ErrorBuilder from "../../src/core/errors/ErrorBuilder";
import { HttpCodes } from "./../../src/core/enums/HttpCodes";
import { UserService } from "./../../src/users/UserService";


const serviceMock = new Mock<IUserService<string>>();
const errorBuilderMock = new Mock<ErrorBuilder>();

const service = serviceMock.prototypeof(UserService).object();
const errorBuilder = errorBuilderMock.object();

function runServer() {
  const app = express();
  const userController = 
  app.use("/users", )
}

describe("UserController", () => {

  describe("#create", () => {

    it("it should return a Http code 201 when the service's create method executes succesfully", async () => {
      const server = runServer();
      const payload = { firstName: "testFirst", lastName: "testLast", birthDate: Date.now() };

      serviceMock
        .setup((instance) => instance.create(It.IsAny(), It.IsAny(), It.IsAny()))
        .returns({
          id: new ObjectId().toHexString(),
          firstName: payload.firstName,
          lastName: payload.lastName,
          birthDate: payload.birthDate,
        });

      supertest(server).post(`/users`)
        .send(payload)
        .set("Content-Type", "application/json")
        .expect(HttpCodes.CREATED)
        .then((res) => {
          serviceMock.verify((instance) => instance.create(It.IsAny(), It.IsAny(), It.IsAny()), Times.Once());
          expect(res.body.id).toBeDefined();
          expect(res.body.firstName).toBe("testFirst");
          expect(res.body.latName).toBe("testLast");
          expect(res.body.birthDate).toBeDefined();
        });
    });

  });

});

