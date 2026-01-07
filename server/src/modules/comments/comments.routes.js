const { auth } = require("../../middlewares/auth.middleware");
const commentControllers = require("./comments.controller");

module.exports = (router) => {
  router.get("/comments", auth, commentControllers.index);
  router.post("/comments", auth, commentControllers.create);
  router.put("/comments/:id", auth, commentControllers.update);
  router.get("/comments/:id", auth, commentControllers.show);
  router.delete("/comments/:id", auth, commentControllers.remove);
  router.post("/comments/:id/reactions", auth, commentControllers.reaction);
};
