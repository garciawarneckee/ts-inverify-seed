//WHY?
import "reflect-metadata";
import { injectable } from "inversify";

import { NotRequiredKeysError, NotValidKeyTypeError, NotValidKeyError } from "../errors";
import { IRequestValidator } from '../interfaces/IRequestValidator';
import { RequestSchema, RequestMetadata } from "./RequestSchema";

@injectable()
export default class RequestValidator implements IRequestValidator {

  public validate(payload: any, schema: RequestSchema): void {
    const schemaKeys = Object.keys(schema);

    const nestedObjects: RequestSchema = {}
    schemaKeys.forEach((sk) => {
      if (schema[sk].type === "object") {
        this.validatePlainObject(payload[sk], schema[sk].properties!);
        nestedObjects[sk] = schema[sk];
        delete payload[sk];
        delete schema[sk];
      } else if (schema[sk].type === "array") {
        const arraySchema: RequestMetadata = schema[sk];
        if (arraySchema.items!.of === "object") {
          (payload[sk] as []).forEach((obj) => {
            this.validate(obj, arraySchema.items!.schema!);
            delete payload[sk];
            delete schema[sk];
          });
        } else {
          this.validatePrimitiveArray(payload[sk], arraySchema.items!.of);
          delete payload[sk];
          delete schema[sk];
        }
      }
    });

    this.validatePlainObject(payload, schema);
  }

  /**
   * Validates if a JSON with only primitive types meeets determined schema.
   * @param { any } payload JSON to validate.
   * @param { RequestSchema } schema  Schema to meet.
   * @throws { NotValidKeyError } if any property doesn't exists in the schema.
   * @throws { NotRequiredKeysError } if there is any mandatory key that is not present in the payload.
   * @throws { NotValidKeyTypeError } if there is any key value that is hasn't the schema's specified type.
   */
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

  private validatePrimitiveArray(array: [], type: string) {
    return array.every((k) => typeof k === type);
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