const {
  Appointment,
  FamilyMember,
  Package,
  Timetable,
  User,
  RescheduleRequests
} = require("../../models");
const { successResponse, errorResponse } = require("../../utils/responses");

const createAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { package_uuid, family_uuid, problem, startingTime, duration } =
      req.body;
    const package = await Package.findOne({
      where: {
        uuid: package_uuid
      }
    });

    const family = await FamilyMember.findOne({
      where: {
        uuid: family_uuid
      }
    });
    const response = await Appointment.create({
      userId,
      packageId: package.id,
      familyMemberId: family.id,
      problem,
      startingTime,
      duration
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const rescheduleAppointment = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const { reason, startingTime } = req.body;
    const appointment = await Appointment.findOne({
      where: {
        uuid
      }
    });
    await RescheduleRequests.create({
      reason
    });
    const response = await appointment.update({ startingTime });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const canceledAppointments = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const appointment = await Appointment.findOne({
      where: {
        uuid
      }
    });
    const response = await appointment.update({
      status: "canceled"
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await Appointment.findAll({
      where: {
        userId
      },
      include: [
        FamilyMember,
        { model: User },
        { model: Package, include: [{ model: User, include: [Timetable] }] }
      ]
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
module.exports = {
  createAppointment,
  getAppointments,
  canceledAppointments,
  rescheduleAppointment
};
