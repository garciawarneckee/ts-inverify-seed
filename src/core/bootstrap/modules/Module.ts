export interface Module {
  getName(): string;
  start(): Promise<void>;
}