import { CreateUserRequest } from './../../../src/users/requests/CreateUserRequest';
import RequestValidator from "../../../src/core/requests/RequestValidator";

describe("RequestValidator", () => {

  const validator = new RequestValidator();

  describe("#validate", () => {
    it("should not throw when a request is valid", () => {
      const request = { firstName: "testFirst", lastName: "testLast", birthDate: Date.now() };
      expect(() => validator.validate(request, CreateUserRequest)).not.toThrow();
    });

    it("should throw a NotRequiredKeysError when a request miss some required key", () => {
      const request = { firstName: "testFirst", lastName: "testLast" };
      expect(() => validator.validate(request, CreateUserRequest)).toThrow(`Keys birthDate are not present for the request ${JSON.stringify(request)}`);
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