const logger = {
  logDefinedRoutes: (expressApp) => {
    const routes = [];
    const expressRouter = expressApp._router || expressApp.router;

    // Get all routes from the app
    if (expressRouter && expressRouter.stack) {
      expressRouter.stack.forEach((middleware) => {
        if (middleware.route) {
          const methods = Object.keys(middleware.route.methods);
          routes.push({
            path: middleware.route.path,
            methods: methods.map((method) => method.toUpperCase()),
          });
        } else if (
          middleware.name === "router" &&
          middleware.handle &&
          middleware.handle.stack
        ) {
          middleware.handle.stack.forEach((handler) => {
            if (handler.route) {
              const methods = Object.keys(handler.route.methods);
              routes.push({
                path: handler.route.path,
                methods: methods.map((method) => method.toUpperCase()),
              });
            }
          });
        }
      });
    }

    return routes;
  },
};

module.exports = logger;
