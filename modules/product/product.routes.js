const { Router } = require("express");
const router = Router();

const upload = require("../../utils/upload");
const { validateJWT } = require("../../utils/validateJWT");
const {
  addProduct,
  getProducts,
  addToCart,
  getProductsInCart,
  addOrder,
  getOrders,
  updateOrder
} = require("./product.controller");

router.post("/", validateJWT, upload.array("file"), addProduct);
router.post("/cart/:uuid", validateJWT, upload.array("file"), addToCart);
router.get("/cart", validateJWT, getProductsInCart);
router.get("/order", validateJWT, getOrders);
router.patch("/order/:uuid", validateJWT, updateOrder);

router.post("/order", validateJWT, addOrder);

router.get("/", validateJWT, getProducts);

module.exports = router;
