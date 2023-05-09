const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const {
  createAppointment,
  getAppointments,
  canceledAppointments,
  rescheduleAppointment
} = require("./appointment.controller");
const router = Router();

router.post("/", validateJWT, createAppointment);
router.get("/", validateJWT, getAppointments);
router.patch("/cancel/:uuid", validateJWT, canceledAppointments);
router.patch("/reschedule/:uuid", validateJWT, rescheduleAppointment);

module.exports = router;
