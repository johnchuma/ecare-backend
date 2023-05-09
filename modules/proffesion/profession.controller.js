const { Profession } = require("../../models");
const { successResponse, errorResponse } = require("../../utils/responses");

const createProfession = async (req, res) => {
  try {
    const { title } = req.body;
    const response = await Profession.create({
      title
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getProfessions = async (req, res) => {
  try {
    const response = await Profession.findAll();
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = { createProfession, getProfessions };
