const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

router
  .route("/")
  .get(postsController.getAllPosts)
  .post(postsController.createNewPost)
  .patch(postsController.updatePost);
router.get("/user", postsController.getUser);

module.exports = router;
