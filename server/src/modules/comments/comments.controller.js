const commentService = require("./comments.service");

const index = async (req, res) => {
  const result = await commentService.getAll(req);
  res.status(result.statusCode).send(result);
};

const create = async (req, res) => {
  const result = await commentService.create(req);
  res.status(result.statusCode).send(result);
};

const show = async (req, res) => {
  const result = await commentService.getById(req);
  res.status(result.statusCode).send(result);
};

const update = async (req, res, next) => {
  const result = await commentService.update(req);
  res.status(result.statusCode).send(result);
};
const remove = async (req, res, next) => {
  const result = await commentService.destroy(req);
  res.status(result.statusCode).send(result);
};

const reaction = async (req, res, next) => {
  const result = await commentService.toggleReaction(req);
  res.status(result.statusCode).send(result);
};

module.exports = {
  index,
  create,
  show,
  update,
  remove,
  reaction,
};
