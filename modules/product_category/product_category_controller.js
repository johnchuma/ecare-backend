const { ProductCategory } = require("../../models");
const production_endpoint = require("../../utils/endpoints");
const { errorResponse, successResponse } = require("../../utils/responses");

const createProductCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { originalname } = req.file;
    const userId = req.user.id;
    const image = production_endpoint + originalname;
    const response = await ProductCategory.create({
      name,
      image,
      userId
    });
    successResponse(res, response);
  } catch (error) {
    print(error);
    errorResponse(res, error);
  }
};

const getProductCategories = async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await ProductCategory.findAll({
      where: {
        userId
      }
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = { createProductCategory, getProductCategories };
