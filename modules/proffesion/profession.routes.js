const { Router } = require("express");
const { validateJWT } = require("../../utils/validateJWT");
const { createProfession, getProfessions } = require("./profession.controller");
const router = Router();
router.post("/", createProfession);
router.get("/", getProfessions);
module.exports = router;
