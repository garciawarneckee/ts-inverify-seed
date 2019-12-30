import { RequestSchemaType } from "../requests/RequestSchema";

export interface IRequestValidator {
  validate(payload: any, schema: RequestSchemaType): void;
}