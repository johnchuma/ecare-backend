const { Router } = require("express");
const router = Router();

const upload = require("../../utils/upload");
const { validateJWT } = require("../../utils/validateJWT");
const {
  createProductCategory,
  getProductCategories
} = require("./product_category_controller");
router.post("/", validateJWT, upload.single("file"), createProductCategory);
router.get("/", validateJWT, getProductCategories);

module.exports = router;
