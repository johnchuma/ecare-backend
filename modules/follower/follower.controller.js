const { successResponse, errorResponse } = require("../../utils/responses");
const { Follower, User } = require("../../models");
const followUser = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const userId = req.user.id;
    const followee = await User.findOne({
      where: {
        uuid
      }
    });
    const response = await Follower.create({
      follower_id: userId,
      followee_id: followee.id
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const unfollowUser = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const follower = await Follower.findOne({
      where: {
        uuid
      }
    });
    await follower.destroy();
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getFollowers = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const followers = await Follower.findAll({
      where: {
        followee_id: userId
      },
      include: [{ model: User, as: "user", required: true }]
    });
    successResponse(res, followers);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = { followUser, unfollowUser, getFollowers };
