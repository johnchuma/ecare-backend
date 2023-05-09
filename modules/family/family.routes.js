const { Router } = require("express");
const { addFamilyMember, getFamilyMembers } = require("./family.controller");
const { validateJWT } = require("../../utils/validateJWT");
const upload = require("../../utils/upload");
const router = Router();

router.post("/", validateJWT, upload.single("file"), addFamilyMember);
router.get("/", validateJWT, getFamilyMembers);

module.exports = router;
