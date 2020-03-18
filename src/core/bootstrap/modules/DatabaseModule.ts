import { Module } from "./Module";

export interface DatabaseModule<DbClient> extends Module {
  getClient(): DbClient;
}