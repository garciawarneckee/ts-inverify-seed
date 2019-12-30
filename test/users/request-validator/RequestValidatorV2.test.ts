import { CreateUserRequest } from "../../../src/users/requests/CreateUserRequest";
import RequestValidatorV2 from "../../../src/core/requests/RequestValidatorV2";

describe("RequestValidatorV2", () => {

  const validator = new RequestValidatorV2();

  it("should not throw when a request is valid", () => {
    const request = { firstName: "testFirst", lastName: "testLast", birthDate: Date.now() };
    expect(() => validator.validate(request, CreateUserRequest)).not.toThrow();
  });

})
