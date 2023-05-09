const production_endpoint = require("../../utils/endpoints");
const { errorResponse, successResponse } = require("../../utils/responses");

const uploadFile = async (req, res) => {
  try {
    const { originalname } = req.file;
    const file = production_endpoint + originalname;
    successResponse(res, { link: file });
  } catch (error) {
    errorResponse(res, error);
  }
};

module.exports = { uploadFile };
