const User = require("../models/User");
const createError = require("http-errors");
const { validationResult } = require("express-validator");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (e) {
    next(e);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!user) throw new createError.NotFound();
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

/* SIGNING UP */

exports.addUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const user = new User(req.body);
    // RETRIEVE A TOKEN FOR THE USER
    const token = user.generateAuthToken();
    console.log(token);
    await user.save();
    // SEND BACK THE TOKEN WITH PUBLIC FIELDS
    const data = user.getPublicFields();
    res.status(200)
    .header("x-auth", token)
    .send(data);
  } catch (e) {
    next(e);
  }
};

// exports.addUser = async (req, res, next) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.status(200).send(user);
//   } catch (e) {
//     next(e);
//   }
// };


/* SIGNING IN */
exports.loginUser = async(req, res, next) => {
  // GET EMAIL AND PASSWORD FROM THE REQUEST
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  try {
    // FIND USER IN THE DATABASE
    const user = await User.findOne({ email });
    // CHECKING IF THE PASSWORD IS CORRECT
    const valid = await user.checkPassword(password);
    if(!valid) throw new createError.NotFound();

    // RETRIEVE A TOKEN
    const token = user.generateAuthToken();
    const data = user.getPublicFields();

    // RESPOND WITH TOKEN AND PUBLIC FIELDS
    res.status(200)
    .header("x-auth", token)
    .send(data);
  } catch (e) {
    next(e);
  }
}