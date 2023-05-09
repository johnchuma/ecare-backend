const { Router } = require("express");
const router = Router();
const { validateJWT } = require("../../utils/validateJWT");
const {
  createPostCategory,
  findPostCategories
} = require("./post_category.controller");

router.post("/", validateJWT, createPostCategory);
router.get("/", validateJWT, findPostCategories);

module.exports = router;
