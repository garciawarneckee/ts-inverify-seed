import { injectable } from 'inversify';
import { HttpCodes } from './../enums/HttpCodes';

@injectable()
export default class ErrorBuilder {

  public build(error: Error): number {
    switch(error.name) {
      case "EntityNotFoundError": return HttpCodes.NOT_FOUND;
      default: return HttpCodes.INTERNAL_ERROR;
    }
  }
}