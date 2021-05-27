const express = require("express");
// create a new router
const router = express.Router();


const { getPosts, addPost, deletePost, updatePost } = require("../controllers/postsController")


router.route("/").get(getPosts).post(updatePost).put(addPost)
router.route("/:id").delete(deletePost)


module.exports = router;