const { Router } = require("express");
const router = Router();
const { validateJWT } = require("../../utils/validateJWT");
const {
  createArticleCategory,
  findArticleCategories,
  removeArticleCategory
} = require("./article_category.controller");

router.post("/", validateJWT, createArticleCategory);
router.get("/", validateJWT, findArticleCategories);
router.delete("/:uuid", validateJWT, removeArticleCategory);

module.exports = router;
