//WHY?
import "reflect-metadata";
import { injectable } from "inversify";

import { NotValidKeyTypeError, NotValidKeyError, NotRequiredKeysError } from "../errors";
import { IRequestValidator } from '../interfaces/IRequestValidator';
import { RequestSchema } from "./RequestSchema";

@injectable()
export default class RequestValidator implements IRequestValidator {

  public validate(payload: any, schema: RequestSchema): void {

    const payloadKeys = Object.keys(payload);
    const schemaKeys = Object.keys(schema);

    const nestedObjects: RequestSchema = {}
    schemaKeys.forEach((sk) => {
      if(schema[sk].type === "object") {
        this.validatePlainObject(payload[sk], schema[sk].properties!);
        nestedObjects[sk] = schema[sk];
        delete payload[sk];
        delete schema[sk];
      }
    });

    this.validatePlainObject(payload, schema);
  }

  private validatePlainObject(payload: any, schema: RequestSchema) {
    const payloadKeys = Object.keys(payload);
    const schemaKeys = Object.keys(schema);

    const requiredKeys: string[] = schemaKeys.filter((sk) => schema[sk].required === true);
    const optionalKeys: string[] = schemaKeys.filter((sk) => schema[sk].required === false);
    const optionalAndNonValidKeys: string[] = payloadKeys.filter(x => !requiredKeys.includes(x));

    if (this.hasRequiredKeys(payloadKeys, requiredKeys) && this.hasValidTypes(payload, requiredKeys, schema)) {
      optionalAndNonValidKeys.forEach((key: string) => {
        if (!optionalKeys.includes(key)) {
          throw new NotValidKeyError(payload, key);
        } else {
          this.hasValidTypes(payload, optionalKeys, schema);
        }
      })
    } else {
      const notPresentRequiredKeys: string[] = requiredKeys.filter(x => !payloadKeys.includes(x));
      throw new NotRequiredKeysError(payload, notPresentRequiredKeys);
    }
  }

  private hasRequiredKeys(payloadKeys: string[], requiredKeys: string[]): boolean {
    const hasRequiredKeys = requiredKeys.filter((rk) => payloadKeys.includes(rk));
    return requiredKeys.length === hasRequiredKeys.length;
  }

  private hasValidTypes(payload: any, keys: string[], schema: RequestSchema): boolean {
    keys.forEach((rk: string) => {
      const { type } = schema[rk];
      if (!this.hasValidType(payload[rk], type)) {
        throw new NotValidKeyTypeError(rk, type);
      };
    });
    return true;
  }

  private hasValidType(value: number | boolean | string, schemaType: string): boolean {
    return typeof value === schemaType;
  }

}