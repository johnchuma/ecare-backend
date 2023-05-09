const { User, Profession } = require("../../models");

const findUser = async (email) => {
  const response = await User.findOne({
    where: { email },
    include: [Profession],
    attributes: { exclude: ["password"] }
  });
  return response;
};

module.exports = findUser;
