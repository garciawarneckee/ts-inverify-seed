export interface RequestMetadata {
  type: string;
  required: boolean;
  properties?: RequestSchema;
  items?: ArraySchema;
}

export interface RequestSchema {
  [key: string]: RequestMetadata;
}

export interface ArraySchema {
  of: "string" | "number" | "boolean" | "object";
  schema?: RequestSchema;
}