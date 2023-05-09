const { Router } = require("express");
const router = Router();
const upload = require("../../utils/upload");
const { validateJWT } = require("../../utils/validateJWT");
const { uploadFile } = require("./files.controller");

router.post("/", validateJWT, upload.single("file"), uploadFile);

module.exports = router;
