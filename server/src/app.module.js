const fs = require("fs");
const path = require("path");

module.exports = (apiRouter) => {
  const modulesPath = path.join(__dirname, "./modules");
  fs.readdirSync(modulesPath).forEach((moduleName) => {
    const routeFile = path.join(
      modulesPath,
      moduleName,
      `${moduleName}.routes.js`
    );
    if (fs.existsSync(routeFile)) {
      require(routeFile)(apiRouter);
    }
  });
};
