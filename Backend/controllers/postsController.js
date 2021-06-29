// const low = require('lowdb');
// const FileSync = require("lowdb/adapters/FileSync");
// const adapter = new FileSync ("data/db.json");
// const db = low(adapter);
// const isEmpty = require("lodash.isempty");
const Post = require("../models/Post");
const createError = require("http-errors");
const { validationResult } = require("express-validator");


exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).send(posts);
    } catch (error) {
        console.log(error);
        next(error);
    }
}


exports.addPost = async (req, res, next) => {
    try {
        /// if (isEmpty(req.body)) {
        //     const error = new Error ("INVALID REQUEST MESSAGE")
        //     error.status = 400;
        //     error.stack = null
        //     next(error);
        // } else {
            const post = new Post(req.body);
            //console.log(post);
            const token = user.generateAuthToken();
            console.log(token);
            await post.save();
            //db.get("posts").push(post).last().assign({id: Date.now().toString()}).write()
            const data = user.getPublicFields();
            res.status(200)
            .header("x-auth", token)
            .send(post);// sends it to the home page
            //console.log(post);
        //}
    } catch (error) {
        console.log(error);
        next(error);
    }
}


exports.updatePost = async (req, res, next) => {
    try {
        //let id = req.body.id;
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
      throw new createError.NotFound();
        }
        res.status(200).send(post);
        } catch (error) {
        console.log(error);
        next(error);
        }
}


exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id,req.body, { new: true });
        if(!order) {
            throw new createError.NotFound();
            res.status(200).send("Success");
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}


/* SIGNING IN */
exports.loginUser = async(req, res, next) => {
  // GET EMAIL AND PASSWORD FROM THE REQUEST
  const email = req.body.email;
  const password = req.body.password;
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