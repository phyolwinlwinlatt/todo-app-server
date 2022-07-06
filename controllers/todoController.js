const Response = require("../utils/response");
const Todo = require("../models/todoModel");

module.exports.create = async (req, res) => {
  const { title, date } = req.body;
  const userId = req.headers.userid;
  try {
    await Todo.create({ title, userId, date });
    return Response.response(res, 201, "todo created");
  } catch (error) {
    return Response.response(res, 500, "internal server error");
  }
};

module.exports.getOne = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  return Response.response(res, 200, "", todo);
};

module.exports.getAll = async (req, res) => {
  let toDos;
  if (Object.keys(req.query).length) {
    toDos = await Todo.find({ userId: req.headers.userid })
      .where("complete")
      .equals(req.query.complete).sort({date: 'desc'})
      return Response.response(res, 200, "todos", toDos)
  }
  toDos = await Todo.find({ userId: req.headers.userid }).sort({date: 'desc'});
  return Response.response(res, 200, "all todos", toDos);
};

module.exports.updateOne = async (req, res) => {
  try{
    await Todo.findByIdAndUpdate(req.params.id, req.body )
    return Response.response(res, 202, 'updated')
  }catch(error){
    return Response.response(res, 500, 'internal server error')
  }
}
module.exports.deleteOne = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    return Response.response(res, 204, "deleted");
  } catch (error) {
    return Response.response(res, 500, "internal server error");
  }
};

module.exports.deleteMany = async (req, res) => {
  await Todo.deleteMany({ userId: req.headers.userid });
  return Response.response(res, 204, "deleted");
};
