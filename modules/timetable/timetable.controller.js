const { successResponse, errorResponse } = require("../../utils/responses");
const { Timetable } = require("../../models");
const { findUserByUuid } = require("../authentication/auth.controller");

const addTimetable = async (req, res) => {
  try {
    const { weekday, startingTime, endingTime } = req.body;
    const userId = req.user.id;
    const response = await Timetable.create({
      weekday,
      startingTime,
      endingTime,
      userId
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const getDoctorTimetable = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const doctor = await findUserByUuid(uuid);
    const response = await Timetable.findAll({ where: { userId: doctor.id } });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = { addTimetable, getDoctorTimetable };
