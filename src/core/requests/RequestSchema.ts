export interface RequestMetadata {
  type: string;
  required: boolean;
}

export interface RequestSchema {
  [key: string]: RequestMetadata;
}

export interface RequestSchemaV2 {
  [key: string]: any;
}

export type RequestSchemaType = RequestSchema | RequestSchemaV2;