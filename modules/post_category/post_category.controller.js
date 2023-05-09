const { PostCategory } = require("../../models");
const { successResponse, errorResponse } = require("../../utils/responses");

const createPostCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const response = await PostCategory.create({
      name: category
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const findPostCategories = async (req, res) => {
  try {
    const response = await PostCategory.findAll();
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const findCategoryByUuid = async (uuid) => {
  const category = await PostCategory.findOne({
    where: {
      uuid
    }
  });

  return category;
};

module.exports = { createPostCategory, findCategoryByUuid, findPostCategories };
