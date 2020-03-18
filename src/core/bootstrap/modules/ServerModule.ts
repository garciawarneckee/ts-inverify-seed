import { Module } from "./Module";

export interface ServerModule<Server> extends Module {
  getServer(): Server;
  withPort(port: number): ServerModule<Server>;
}