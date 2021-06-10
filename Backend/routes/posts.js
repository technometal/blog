const express = require("express");
// create a new router
const router = express.Router();
const { validateInputs } = require("../middleware/validator");
const { postValidationRules } = require("../lib/validation/postRules");



const { getPosts, addPost, deletePost, updatePost } = require("../controllers/postsController")


router.route("/").get(getPosts).post(updatePost).put(validateInputs(postValidationRules), addPost)
router.route("/:id").delete(deletePost)


router.get('/posts', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;