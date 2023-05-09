const { ArticleCategory } = require("../../models");
const { successResponse, errorResponse } = require("../../utils/responses");

const createArticleCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const response = await ArticleCategory.create({
      name: category
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const removeArticleCategory = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const category = await ArticleCategory.findOne({
      where: {
        uuid
      }
    });
    await category.destroy();
    successResponse(res, "Category deleted successfully");
  } catch (error) {
    errorResponse(res, error);
  }
};
const findArticleCategories = async (req, res) => {
  try {
    const response = await ArticleCategory.findAll();
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const findCategoryByUuid = async (uuid) => {
  const category = await ArticleCategory.findOne({
    where: {
      uuid
    }
  });
  return category;
};

module.exports = {
  createArticleCategory,
  findCategoryByUuid,
  removeArticleCategory,
  findArticleCategories
};
