const User = require("../models/userModel");
const Todo = require('../models/todoModel')
const Response = require("../utils/response");

module.exports.signUp = async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });
  if (user) {
    return Response.response(res, 400, "user already exists");
  }

  const newUser = await User.create({ name, password });
  return Response.response(res, 201, "successfully signup", newUser);
};

module.exports.signIn = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return Response.response(res, 400, "fill username or password");
  }

  const user = await User.findOne({ name }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return Response.response(res, 400, "user not found or incorrect password");
  }
  user.password = null
  return Response.response(res, 200, 'successfully sign in ', user)
};

module.exports.deleteTodos = async (req, res) => {
  
}
