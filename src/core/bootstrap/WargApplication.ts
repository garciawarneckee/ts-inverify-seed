import { Module } from "./modules/Module";

export default class WargApplication {

  private modules: Module[] = [];

  public withModule(module: Module): WargApplication {
    this.modules.push(module);
    return this;
  }

  public getModules(): Module[] {
    return this.modules;
  }

  public async bootstrap(): Promise<void> {
    try {
      const modulesStartPromises: Promise<void>[] = this.modules.map((module: Module) => module.start());
      await Promise.all(modulesStartPromises);
    }
    catch (error) {
      console.error(`Error in application start: ${error.message}`);
    }
  }

}
