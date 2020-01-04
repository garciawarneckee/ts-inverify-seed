import { CreateUserRequest } from "./../../../src/users/requests/CreateUserRequest";
import RequestValidator from "../../../src/core/requests/RequestValidator";
import { RequestSchema } from "../../../src/core/requests/RequestSchema";

describe("RequestValidator", () => {

  const validator = new RequestValidator();

  describe("#validate", () => {
    it("should not throw when a request is valid", () => {
      const request = { firstName: "testFirst", lastName: "testLast", birthDate: Date.now() };
      expect(() => validator.validate(request, CreateUserRequest)).not.toThrow();
    });

    it("should not throw when a request has a nested object in it", () => {
      const request = { firstName: "testFirst", phone: { prefix: 34, number: 111111111 } };
      const phoneSchema: RequestSchema = {
        firstName: { type: "string", required: true },
        phone: {
          type: "object",
          required: true,
          properties: {
            prefix: { type: "number", required: true },
            number: { type: "number", required: true }
          },
        },
      }
      expect(() => validator.validate(request, phoneSchema)).not.toThrow();
    });

    it("should not throw when a request has more than one nested object in it", () => {
      const request = { 
        firstName: "testFirst", 
        phone: { prefix: 34, number: 111111111 },
        address: { 
          street: "Some street",
          number: 34,
          city: "Barcelona"
        }
      };
      const complexSchema: RequestSchema = {
        firstName: { type: "string", required: true },
        phone: {
          type: "object",
          required: true,
          properties: {
            prefix: { type: "number", required: true },
            number: { type: "number", required: true }
          },
        },
        address: {
          type: "object",
          required: true,
          properties: {
            street: { type: "string", required: true },
            number: { type: "number", required: true },
            city: { type: "string", required: true },
          }
        }
      }
      expect(() => validator.validate(request, complexSchema)).not.toThrow();
    });

    it("should throw when a request has a nested object in it and it doesn't meet the required keys", () => {
      const request = { firstName: "testFirst", phone: { prefix: 34 } };
      const phoneSchema: RequestSchema = {
        firstName: { type: "string", required: true },
        phone: {
          type: "object",
          required: true,
          properties: {
            prefix: { type: "number", required: true },
            number: { type: "number", required: true }
          },
        },
      }
      expect(() => validator.validate(request, phoneSchema)).toThrow(`Keys number are not present in the request {\"prefix\":34}`);
    });

    it("should throw a NotRequiredKeysError when a request miss some required key", () => {
      const request = { firstName: "testFirst", lastName: "testLast" };
      expect(() => validator.validate(request, CreateUserRequest)).toThrow(`Keys birthDate are not present in the request ${JSON.stringify(request)}`);
    });

    it("should throw a NotValidKeyTypeError when a required key in payload hasn't the correct type", () => {
      const request = { firstName: 1234, lastName: "testLast", birthDate: Date.now() };
      expect(() => validator.validate(request, CreateUserRequest)).toThrow(`Key firstName has an invalid type it is expected to have string type`);
    });

    it("should throw a NotValidKeyError when a request has some not valid key", () => {
      const request = { firstName: "testFirst", lastName: "testLast", birthDate: Date.now(), identification: "X123456Y" };
      expect(() => validator.validate(request, CreateUserRequest)).toThrowError(`Key identification not found as a valid key in request ${JSON.stringify(request)}`);
    });

    it("should throw a NotValidKeyTypeError when an optional key in payload hasn't the correct type", () => {
      const request = { firstName: "testFirst", lastName: "testLast", birthDate: Date.now(), email: 123 };
      expect(() => validator.validate(request, CreateUserRequest)).toThrow(`Key email has an invalid type it is expected to have string type`);
    });
  });

});