const { where } = require("sequelize");
const {
  Post,
  User,
  PostCategory,
  PostImage,
  PostComment,
  PostCommentReply,
  PostLike
} = require("../../models");
const production_endpoint = require("../../utils/endpoints");
const { successResponse, errorResponse } = require("../../utils/responses");
const { findUserByUuid } = require("../authentication/auth.controller");

const {
  findCategoryByUuid
} = require("../post_category/post_category.controller");
const createPost = async (req, res) => {
  try {
    const { post_category_uuid, caption } = req.body;

    const userId = req.user.id;
    const category = await findCategoryByUuid(post_category_uuid);
    const response = await Post.create({
      userId: userId,
      caption: caption,
      postCategoryId: category.id
    });
    const files = req.files;
    files.forEach(async (fil) => {
      const { originalname } = fil;
      const image = production_endpoint + originalname;
      await PostImage.create({
        postId: response.id,
        picture: image
      });
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const likePost = async (req, res) => {
  try {
    const uuid = req.params.uuid;

    const user_id = req.user.id;
    const post = await Post.findOne({
      where: {
        uuid
      }
    });
    const response = await PostLike.create({
      userId: user_id,
      postId: post.id,
      uuid: uuid
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const removeLike = async (req, res) => {
  try {
    const uuid = req.params.uuid;

    const like = await PostLike.findOne({
      where: {
        uuid
      }
    });

    await like.destroy();
    successResponse(res, "Deleted successfully");
  } catch (error) {
    errorResponse(res, error);
  }
};
const commentPost = async (req, res) => {
  try {
    const { comment } = req.body;
    const uuid = req.params.uuid;
    const user_id = req.user.id;
    const post = await Post.findOne({
      where: {
        uuid
      }
    });
    const response = await PostComment.create({
      userId: user_id,
      postId: post.id,
      comment
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const replyComment = async (req, res) => {
  try {
    const { reply } = req.body;
    const uuid = req.params.uuid;
    const user_id = req.user.id;
    const comment = await PostComment.findOne({
      where: {
        uuid
      }
    });
    const response = await PostCommentReply.create({
      userId: user_id,
      postCommentId: comment.id,
      reply
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getUserPosts = async (req, res) => {
  try {
    const user_uuid = req.params.uuid;
    const user = await findUserByUuid(user_uuid);
    const response = await Post.findAll({
      include: [User, PostCategory],
      where: {
        userId: user.id
      }
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const getPosts = async (req, res) => {
  try {
    const response = await Post.findAll({
      include: [
        User,
        PostCategory,
        PostImage,
        { model: PostLike, include: User },
        {
          model: PostComment,
          include: [User, { model: PostCommentReply, include: User }]
        }
      ]
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deletePost = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const post = await Post.findOne({ where: { uuid } });
    await post.destroy();
    successResponse(res, "Post is deleted successfully");
  } catch (error) {
    errorResponse(res, error);
  }
};
module.exports = {
  createPost,
  getPosts,
  getUserPosts,
  likePost,
  commentPost,
  removeLike,
  replyComment,
  deletePost
};
