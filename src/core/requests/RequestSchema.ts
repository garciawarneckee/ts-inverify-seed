export interface RequestMetadata {
  type: string;
  required: boolean;
}

export interface RequestSchema {
  [key: string]: RequestMetadata;
}