import { IRequestValidator } from './../interfaces/RequestValidator';
import { RequestSchemaType } from './RequestSchema';

interface ObjectTypes {
  [key: string]: any;
}

export default class RequestValidatorV2 implements IRequestValidator {

  public validate(payload: any, schema: RequestSchemaType): void {
    const payloadKeys: string[] = Object.keys(payload);
    const payloadTypeObject: ObjectTypes = {};
    payloadKeys.forEach((pk: string) => payloadTypeObject[pk] = typeof pk);
    console.log("PayloadTypeObject", payloadTypeObject);

    const schemaKeys: string[] = Object.keys(schema);
    const schemaTypesObject: ObjectTypes = {};
    schemaKeys.forEach((sk) => schemaTypesObject[sk] = schema[sk].type);

    console.log("SchemaTypeObject", schemaTypesObject);
  }

  private isPayloadMatchingSchema(payloadTypeObject: ObjectTypes, schemaTypesObject: ObjectTypes): void {
    
  }

}