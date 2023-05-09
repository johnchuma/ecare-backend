const {
  Article,
  User,
  ArticleLike,
  ArticleComment,
  ArticleCategory,
  ArticleBookmark,
  ArticleImage
} = require("../../models");
const production_endpoint = require("../../utils/endpoints");
const { successResponse, errorResponse } = require("../../utils/responses");
const { findUserByUuid } = require("../authentication/auth.controller");

const {
  findCategoryByUuid
} = require("../article_category/article_category.controller");
const articlebookmark = require("../../models/articlebookmark");
const { sequelize } = require("sequelize");
const { get } = require("./article.routes");
const createArticle = async (req, res) => {
  try {
    const { article_category_uuid, title, description } = req.body;
    const files = req.files;

    const userId = req.user.id;
    const category = await findCategoryByUuid(article_category_uuid, res);
    const response = await Article.create({
      userId: userId,
      title,
      description,
      articleCategoryId: category.id
    });
    files.forEach(async (fil) => {
      const { originalname } = fil;
      const image = production_endpoint + originalname;
      await ArticleImage.create({
        articleId: response.id,
        picture: image
      });
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getUserArticles = async (req, res) => {
  try {
    const user_uuid = req.params.uuid;
    const user = await findUserByUuid(user_uuid);
    const response = await Article.findAll({
      include: [User, ArticleCategory],
      where: {
        userId: user.id
      }
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const getArticles = async (req, res) => {
  try {
    const userId = req.user.id;
    let scope = [];
    scope.push({
      method: ["checkIfILiked", userId]
    });
    const response = await Article.scope(scope).findAll({
      include: [
        User,
        ArticleCategory,
        ArticleImage,
        { model: ArticleLike, include: User },
        { model: ArticleComment, include: User }
      ]
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const likeArticle = async (req, res) => {
  try {
    const uuid = req.params.uuid;

    const user_id = req.user.id;
    const article = await Article.findOne();
    const response = await ArticleLike.create({
      userId: user_id,
      articleId: article.id,
      uuid: uuid
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const bookmarkArticle = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const user_id = req.user.id;
    const article = await Article.findOne({
      where: { uuid }
    });
    const response = await ArticleBookmark.create({
      articleId: article.id,
      userId: user_id
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const removeBookmark = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    // const user_id = req.user.id;
    const bookmark = await ArticleBookmark.findOne({
      where: { uuid }
    });
    await bookmark.destroy();

    successResponse(res, "Removed from bookmark");
  } catch (error) {
    errorResponse(res, error);
  }
};
const deleteArticle = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const article = await Article.findOne({
      where: { uuid }
    });
    await article.destroy();

    successResponse(res, "article deleted");
  } catch (error) {
    errorResponse(res, error);
  }
};
const bookmarkedArticles = async (req, res) => {
  try {
    const userId = req.user.id;
    const scopes = [];
    scopes.push({
      method: ["checkIfILiked", userId]
    });
    const articles = await ArticleBookmark.findAll({
      where: { userId },
      include: [
        {
          model: Article.scope(scopes),
          include: [
            User,
            ArticleCategory,
            ArticleImage,
            { model: ArticleLike, include: User },
            { model: ArticleComment, include: User }
          ]
        }
      ]
    });

    successResponse(res, articles);
  } catch (error) {
    errorResponse(res, error);
  }
};

const commentArticle = async (req, res) => {
  try {
    const { comment } = req.body;
    const uuid = req.params.uuid;
    const user_id = req.user.id;
    const article = await Article.findOne();
    const response = await ArticleComment.create({
      userId: user_id,
      articleId: article.id,
      comment,
      uuid: uuid
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = {
  createArticle,
  getArticles,
  getUserArticles,
  likeArticle,
  deleteArticle,
  bookmarkArticle,
  bookmarkedArticles,
  removeBookmark,
  commentArticle
};
