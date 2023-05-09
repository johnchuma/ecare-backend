const { Router } = require("express");
const router = Router();
const {
  getArticles,
  createArticle,
  getUserArticles,
  likeArticle,
  commentArticle,
  bookmarkArticle,
  bookmarkedArticles,
  removeBookmark,
  deleteArticle
} = require("./article.controller");
const upload = require("../../utils/upload");
const { validateJWT } = require("../../utils/validateJWT");
router.post("/", validateJWT, upload.array("file"), createArticle);
router.get("/", validateJWT, getArticles);
router.delete("/bookmark/:uuid", validateJWT, removeBookmark);
router.get("/bookmarks", validateJWT, bookmarkedArticles);
router.post("/bookmark/:uuid", validateJWT, bookmarkArticle);
router.get("/:uuid", validateJWT, getUserArticles);
router.delete("/:uuid", validateJWT, deleteArticle);
router.post("/like/:uuid", validateJWT, likeArticle);
router.post("/comment/:uuid", validateJWT, commentArticle);

module.exports = router;
