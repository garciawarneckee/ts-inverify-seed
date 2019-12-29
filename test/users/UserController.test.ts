import "reflect-metadata";

import { Mock, It, Times } from "moq.ts";
import * as bodyParser from "body-parser";
import { ObjectId } from "mongodb";
import supertest from "supertest";
import express, { Application } from "express";

import { IRequestValidator } from "./../../src/core/interfaces/RequestValidator";
import { IUserService } from "./../../src/users/interfaces/IUserService";
import RequestValidator from "../../src/core/requests/RequestValidator";
import { NotValidKeyTypeError } from "./../../src/core/errors/index";
import { UserController } from "./../../src/users/UserController";
import ErrorBuilder from "../../src/core/errors/ErrorBuilder";
import { HttpCodes } from "./../../src/core/enums/HttpCodes";
import { UserService } from "./../../src/users/UserService";

const serviceMock = new Mock<IUserService<string>>();
const errorBuilderMock = new Mock<ErrorBuilder>();
const requestValidatorMock = new Mock<IRequestValidator>();

let app: Application;

function runServer() {
  const requestValidator = requestValidatorMock.prototypeof(RequestValidator.prototype).object();
  const service = serviceMock.prototypeof(UserService.prototype).object();
  const errorBuilder = errorBuilderMock.prototypeof(ErrorBuilder.prototype).object();

  app = express();
  const userController = new UserController(requestValidator, service, errorBuilder);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use("/users", userController.getRouter());
}

describe("UserController", () => {

  beforeAll(() => {
    runServer();
  })

  describe("#create", () => {

    it("it should return a Http code 201 when the service's create method executes succesfully", (done) => {
      const payload = { firstName: "testFirst", lastName: "testLast", birthDate: Date.now() };

      serviceMock
        .setup((instance) => instance.create(It.IsAny(), It.IsAny(), It.IsAny()))
        .returns({
          id: new ObjectId().toHexString(),
          firstName: payload.firstName,
          lastName: payload.lastName,
          birthDate: payload.birthDate,
        });

      supertest(app).post("/users")
        .set("Content-Type", "application/json")
        .send(payload)
        .expect(HttpCodes.CREATED)
        .end((err, res) => {
          if (err) return done(err);
          serviceMock.verify((instance) => instance.create(It.IsAny(), It.IsAny(), It.IsAny()), Times.Once());
          expect(res.body.user).toBeDefined();
          expect(res.body.user.id).toBeDefined();
          expect(res.body.user.firstName).toBe("testFirst");
          expect(res.body.user.lastName).toBe("testLast");
          expect(res.body.user.birthDate).toBeDefined();
          done();
        })
    });

    it("it should return a Http code 400 Bad Request if some of the mandatory payload fields are not present", (done) => {
      const payload = { lastName: "testLast", birthDate: Date.now() };

      requestValidatorMock
        .setup((instance) => instance.validate(It.IsAny(), It.IsAny()))
        .throws(new NotValidKeyTypeError("firstName", "string"));

      supertest(app).post("/users")
        .set("Content-Type", "application/json")
        .send(payload)
        .expect(HttpCodes.BAD_REQUEST)
        .expect("Key firstName has an invalid type it is expected to have string type")
        .end((err) => {
          if (err) return done(err);
          done();
        });
    })
  });

});

