// const { JSON } = require("sequelize");
const {
  Product,
  ProductImage,
  ProductWishlist,
  User,
  ProductCategory,
  Order,
  ProductOrder
} = require("../../models");

const production_endpoint = require("../../utils/endpoints");
const { errorResponse, successResponse } = require("../../utils/responses");

const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      discount,
      visibility,
      description,
      amount,
      product_category_uuid
    } = req.body;
    const userId = req.user.id;
    const category = await ProductCategory.findOne({
      uuid: product_category_uuid
    });
    const response = await Product.create({
      name,
      price,
      amount,
      discount,
      description,
      visibility,
      userId,
      productCategoryId: category.id
    });
    const files = req.files;
    files.forEach(async (fil) => {
      const { originalname } = fil;
      const image = production_endpoint + originalname;
      await ProductImage.create({
        productId: response.id,
        image
      });
    });

    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getProducts = async (req, res) => {
  try {
    const category = req.params.category;
    let userId = req.user.id;
    const uuid = req.params.uuid;
    let response;
    if (uuid) {
      const user = await user.findOne({
        uuid
      });
      userId = user.id;
    }
    response = await Product.findAll({
      where: {
        userId
      },
      include: [ProductImage, ProductCategory, User]
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const addToCart = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const userId = req.user.id;
    const product = await Product.findOne({
      where: {
        uuid
      }
    });

    const response = await ProductWishlist.create({
      userId,
      productId: product.id
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const addOrder = async (req, res) => {
  try {
    const { products_uuid } = req.body;
    const products_uuid_array = products_uuid.split(",");
    const userId = req.user.id;

    const order = await Order.create({
      userId
    });

    products_uuid_array.forEach(async (uuid) => {
      const product = await Product.findOne({
        where: {
          uuid
        }
      });
      await ProductOrder.create({
        productId: product.id,
        orderId: order.id
      });
    });
    await ProductWishlist.destroy({
      where: {},
      truncate: true
    });
    successResponse(res, order);
  } catch (error) {
    errorResponse(res, error);
  }
};
const updateOrder = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const { confirmedAt, onDeliveryAt, deliveredAt } = req.body;
    const order = await Order.findOne({
      where: {
        uuid
      }
    });
    if (order.confirmedAt == null) {
      await order.update({
        confirmedAt
      });
    } else {
      if (order.onDeliveryAt == null) {
        await order.update({
          confirmedAt: order.confirmedAt,
          onDeliveryAt
        });
      } else {
        if (order.deliveredAt == null) {
          await order.update({
            confirmedAt: order.confirmedAt,
            onDeliveryAt: order.onDeliveryAt,
            deliveredAt
          });
        }
      }
    }
    successResponse(res, "Updated successfully");
  } catch (error) {
    errorResponse(res, error);
  }
};
const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await Order.findAll({
      where: {
        userId
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["id"]
          }
        },
        {
          model: ProductOrder,
          include: [
            { model: Product, include: [ProductImage, ProductCategory, User] }
          ],
          attributes: {
            exclude: ["id"]
          }
        }
      ]
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const getProductsInCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await ProductWishlist.findAll({
      where: {
        userId
      },
      include: [
        {
          model: Product,
          include: [
            ProductImage,
            ProductCategory,
            {
              model: User,
              attributes: {
                exclude: ["id"]
              }
            }
          ],
          attributes: {
            exclude: ["id", "userId", "UserId"]
          }
        },
        {
          model: User,
          attributes: {
            exclude: ["id"]
          }
        }
      ]
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  addProduct,
  getProducts,
  addToCart,
  getProductsInCart,
  addOrder,
  getOrders,
  updateOrder
};
