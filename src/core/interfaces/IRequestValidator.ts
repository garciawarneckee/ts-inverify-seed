import { RequestSchema } from "../requests/RequestSchema";

export interface IRequestValidator {
  validate(payload: any, schema: RequestSchema): void;
}