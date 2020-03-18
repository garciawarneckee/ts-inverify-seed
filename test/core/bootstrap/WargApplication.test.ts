import { Mock, It, Times } from "moq.ts";

import WargApplication from "../../../src/core/bootstrap/WargApplication";
import { Module } from "../../../src/core/bootstrap/modules/Module";

describe("WargApplication Tests", () => {

  describe("#withModule", () => {

    it("register all the registed modules", async () => {

      const mockModuleOne: Mock<Module> = new Mock<Module>();
      const mockModuleTwo: Mock<Module> = new Mock<Module>();

      const application: WargApplication = new WargApplication();

      application
        .withModule(mockModuleOne.object())
        .withModule(mockModuleTwo.object());

      expect(application.getModules().length).toBe(2);

    });

  });

  describe("#bootstrap", () => {

    it("start all the registed modules", async () => {

      const mockModuleOne: Mock<Module> = new Mock<Module>();
      const mockModuleTwo: Mock<Module> = new Mock<Module>();

      mockModuleOne.setup((instance) => instance.start()).returns(Promise.resolve());
      mockModuleTwo.setup((instance) => instance.start()).returns(Promise.resolve());

      const application: WargApplication = new WargApplication();

      application
        .withModule(mockModuleOne.object())
        .withModule(mockModuleTwo.object());

      await application.bootstrap();

      mockModuleOne.verify((instance) => instance.start(), Times.Once());
      mockModuleTwo.verify((instance) => instance.start(), Times.Once());

    });

    it("throw if one of the promises has a problem during the bootstrap", async () => {

      const mockModuleOne: Mock<Module> = new Mock<Module>();
      const mockModuleTwo: Mock<Module> = new Mock<Module>();

      const consoleSpy = spyOn(console, "error");

      mockModuleOne.setup((instance) => instance.start()).returns(Promise.reject({ mmesage: "Error!" }));
      mockModuleTwo.setup((instance) => instance.start()).returns(Promise.resolve());

      const application: WargApplication = new WargApplication();

      application
        .withModule(mockModuleOne.object())
        .withModule(mockModuleTwo.object());

      await application.bootstrap();

      mockModuleOne.verify((instance) => instance.start(), Times.Once());
      mockModuleTwo.verify((instance) => instance.start(), Times.Once());

      expect(consoleSpy).toHaveBeenCalled();


    });

  });

});