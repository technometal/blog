const low = require('lowdb');
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync ("data/db.json");
const db = low(adapter);
const isEmpty = require("lodash.isempty");
const { UnavailableForLegalReasons } = require('http-errors');


exports.getPosts = (req, res, next) => {
    try {
        const posts = db.get("posts").value();
        res.status(200).send(posts);
    } catch (error) {
        console.log(error);
        next(error);
    }
}


exports.addPost = (req, res, next) => {
    try {
        if (isEmpty(req.body)) {
            const error = new Error ("INVALID REQUEST MESSAGE")
            error.status = 400;
            error.stack = null
            next(error);
        } else {
            const post = req.body;
            console.log(post);
            db.get("posts").push(post).last().assign({id: Date.now().toString()}).write()
            res.status(200).send(post);
            console.log(post);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}


exports.updatePost = (req, res, next) => {
    try {
        let id = req.body.id;
        const post = db.get('posts').map((post) => {
           if (post.id === id) {
                post.post = req.body.post
           }
           return post;
        }
        ).write();
        res.send(post);
    } catch (error) {
        console.log(error);
        next(error);
        }
}


exports.deletePost = (req, res, next) => {
    try {
        const inputId = req.params.id
        db.get("posts").remove({id: inputId}).write();
        res.status(200).send("Success");
    } catch (error) {
        console.log(error);
        next(error);
    }
}