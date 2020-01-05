import { Container, interfaces } from "inversify";

export interface Ioc {
  createContainer(): interfaces.Container;
}

export default class InversifyIoc implements Ioc {

  public createContainer(): Container {
    return new Container();
  }

}