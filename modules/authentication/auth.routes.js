const { Router } = require("express");
const router = Router();
const {
  registerUser,
  loginUser,
  forgotPassword,
  updatePassword,
  findDoctors,
  findFire,
  findPharmacy,
  findNurse,
  findHospital
} = require("./auth.controller");
const upload = require("../../utils/upload");
const { validateJWT } = require("../../utils/validateJWT");
router.post("/register", upload.single("file"), registerUser);
router.post("/login", loginUser);
router.get("/doctors", validateJWT, findDoctors);
router.get("/hospitals", validateJWT, findHospital);
router.get("/pharmacies", validateJWT, findPharmacy);
router.get("/fire", validateJWT, findFire);
router.get("/nurse", validateJWT, findNurse);
router.patch("/password", updatePassword);
router.post("/forgot-password", forgotPassword);

module.exports = router;
