// var express = require('express');
// var router = express.Router();
// const { validateInputs } = require("../middleware/validator");
// const { userValidationRules } = require("../lib/validation/userRules");


// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


// module.exports = router;

const express = require("express");
const router = express.Router();
const { validateInputs } = require("../middleware/validator");
const { userValidationRules } = require("../lib/validation/userRules");

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addUser,
  loginUser
} = require("../controllers/usersController");

/*
Syntax?

.METHOD(MIDDLEWARE, CONTROLLER);

Middleware?
- function that takes in rules and traps requests before 
they reach the controller
*/



// POST http://localhost:3001/users
router
  .route("/")
  .get(getUsers)
  .post(validateInputs(userValidationRules), addUser);

  //ROUTE FOR LOGIN
  router.route("/login").post(loginUser);

router
  .route("/:id")
  .get(getUser)
  .delete(deleteUser)
  .put(validateInputs(userValidationRules), updateUser);

module.exports = router;

