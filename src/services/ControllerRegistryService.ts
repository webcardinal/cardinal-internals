window.cardinal = window.cardinal || {};
window.cardinal.controllers = window.cardinal.controllers || {};
window.cardinal.pendingControllerRequests = window.cardinal.pendingControllerRequests || {};

const { controllers, pendingControllerRequests } = window.cardinal;

const ControllerRegistryService = {
  /**
   * @deprecated
   */
  registerController: (controllerName, controller) => {
    controllers[controllerName] = controller;

    if (pendingControllerRequests[controllerName]) {
      while (pendingControllerRequests[controllerName].length) {
        let request = pendingControllerRequests[controllerName].pop();
        request.resolve(controllers[controllerName]);
      }
    }
  },

  /**
   * @deprecated
   */
  getController: async(controllerName, isBaseController = false) => {
    // with this update, old psk-<component>s will partially work with @webcardinal/core
    const WebCardinal = window.WebCardinal;
    if (WebCardinal) {
      if (isBaseController === true && controllerName === 'ContainerController') {
        controllerName = 'WccController';
      }

      if (typeof WebCardinal.controllers === 'object') {
        const { controllers } = WebCardinal;
        if (controllers[controllerName]) {
          return controllers[controllerName];
        }
      }

      if (typeof WebCardinal.basePath === 'string') {
        const { basePath } = window.WebCardinal;
        try {
          let controller = await import(`${basePath}/scripts/controllers/${controllerName}.js`);
          return controller.default || controller;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    }

    if (controllers[controllerName]) {
      return (controllers[controllerName]);
    }

    let resourcePath = `scripts/controllers/${controllerName}.js`;

    if (isBaseController) {
      resourcePath = `cardinal/base/controllers/${controllerName}.js`;
    }

    if (typeof window.basePath !== 'undefined') {
      let separator = window.basePath[window.basePath.length - 1] === '/' ? '' : '/';
      resourcePath = window.basePath + separator + resourcePath;
    }

    try {
      let controller = await import(resourcePath);
      return controller.default || controller;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default ControllerRegistryService;
