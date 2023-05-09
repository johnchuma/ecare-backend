const { Router } = require("express");
const router = Router();
const {
  getPosts,
  createPost,
  getUserPosts,
  likePost,
  commentPost,
  removeLike,
  deletePost,
  replyComment
} = require("./post.controller");
const upload = require("../../utils/upload");
const { validateJWT } = require("../../utils/validateJWT");
router.post("/", validateJWT, upload.array("file"), createPost);
router.post("/like/:uuid", validateJWT, likePost);
router.post("/comment/:uuid", validateJWT, commentPost);
router.post("/comment/reply/:uuid", validateJWT, replyComment);
router.get("/", validateJWT, getPosts);
router.get("/:uuid", validateJWT, getUserPosts);
router.delete("/dislike/:uuid", validateJWT, removeLike);
router.delete("/:uuid", validateJWT, deletePost);
module.exports = router;
