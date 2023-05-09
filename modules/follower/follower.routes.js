const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  followUser,
  unfollowUser,
  getFollowers
} = require("./follower.controller");
const router = Router();

router.post("/:uuid", validateJWT, followUser);
router.get("/", validateJWT, getFollowers);
router.delete("/:uuid", validateJWT, unfollowUser);
module.exports = router;
