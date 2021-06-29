const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// IMPORT THE CONFIG FILE
const config = require ("../config/configs");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);

UserSchema.virtual("fullName").get(function() {
  return `${this.firstName} ${this.lastName}`;
});


// METHOD WHICH GENERATES AN AUTHENTIFICATION TOKEN USING JWT WITH
UserSchema.methods.generateAuthToken = function() {
  // user found by email
  const user = this;
  const access = "auth";

  /*
  JWT SIGN
  * PAYLOAD: user iud
  * SECRET KEY: "mySuperSecretKey"
  * toString: parse the result to a string
  */
  //const token = jwt.sign({_id: user._id.toHexString()}, "mySuperSecretKey").toString();
  const token = jwt.sign({_id: user._id.toHexString(), access}, config.jwt.key).toString();

  return token;
}

// GET PUBLIC FIELDS
UserSchema.methods.getPublicFields = function () {
  var returnObject = {
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    id: this._id
  }
  return returnObject;
}


// CHECK PASSWORD
UserSchema.methods.checkPassword = function (password) {
  const user = this;
  // if(user.password == password) {
  //   return true;
  // } else {
  //   return false;
  // }

  // COMPARE THE PASSWORDS
  // IF CORRECT, THEN RETURNS TRUE
  return bcrypt.compare(password, user.password);
}


// HOOK TO BE EXECUTED BETWEEN MIDDLEWARES
UserSchema.pre("save", async function(next) {
  console.log("test for the hook")
  // CHECK IF THE PASSWORD HAS CHANGED (ADDED)
  // IF PASSWORD DIDN'T CHANGE => LEAVE THE HOOK
  if(this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
    console.log(this.password);
  } else {
    // LEAVE WITHOUT CHANGES
    next();
  }
});


module.exports = mongoose.model("User", UserSchema);
