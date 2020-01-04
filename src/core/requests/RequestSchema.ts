export interface RequestMetadata {
  type: string;
  required: boolean;
  properties?: RequestSchema;
}

export interface RequestSchema {
  [key: string]: RequestMetadata;
}