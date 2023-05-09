const { successResponse, errorResponse } = require("../../utils/responses");
const { Package } = require("../../models");
const { findUserByUuid } = require("../authentication/auth.controller");

const addPackage = async (req, res) => {
  try {
    const { name, price, duration } = req.body;
    const userId = req.user.id;
    const response = await Package.create({
      name,
      price,
      duration,
      userId
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getDoctorPackages = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const doctor = await findUserByUuid(uuid);
    const response = await Package.findAll({ where: { userId: doctor.id } });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = { addPackage, getDoctorPackages };
