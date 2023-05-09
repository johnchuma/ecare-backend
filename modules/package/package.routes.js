const { Router } = require("express");
const { addPackage, getDoctorPackages } = require("./package.controller");
const { validateJWT } = require("../../utils/validateJWT");
const router = Router();

router.post("/", validateJWT, addPackage);
router.get("/doctor/:uuid", validateJWT, getDoctorPackages);

module.exports = router;
