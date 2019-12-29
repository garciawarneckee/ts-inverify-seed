import { injectable } from 'inversify';
import { HttpCodes } from './../enums/HttpCodes';

@injectable()
export default class ErrorBuilder {

  public build(error: Error): number {
    console.log("Entering error builder with", error.name);
    switch(error.name) {
      case "NotRequiredKeysError":
      case "NotValidKeyError":
      case "NotValidKeyTypeError":
        return HttpCodes.BAD_REQUEST;
      case "EntityNotFoundError":
        return HttpCodes.NOT_FOUND;
      default:
        return HttpCodes.INTERNAL_ERROR;
    }
  }
}