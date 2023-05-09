const production_endpoint = require("../../utils/endpoints");
const { FamilyMember } = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");
const addFamilyMember = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, weight, age, length, relationship, gender, bloodGroup } =
      req.body;
    const { originalname } = req.file;
    const image = production_endpoint + originalname;

    const response = await FamilyMember.create({
      weight,
      age,
      name,
      length,
      gender,
      relationship,
      image,
      bloodGroup,
      userId
    });

    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getFamilyMembers = async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await FamilyMember.findAll({
      where: {
        userId
      }
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = { addFamilyMember, getFamilyMembers };
