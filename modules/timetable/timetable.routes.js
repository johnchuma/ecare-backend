const { Router } = require("express");
const router = Router();
const { validateJWT } = require("../../utils/validateJWT");
const { addTimetable, getDoctorTimetable } = require("./timetable.controller");

router.post("/", validateJWT, addTimetable);
router.get("/doctor/:uuid", validateJWT, getDoctorTimetable);

module.exports = router;
