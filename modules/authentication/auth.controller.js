const bcrypt = require("bcryptjs");
const { User, Follower, Profession } = require("../../models");
const { generateJwtTokens } = require("../../utils/generateJwtTokens");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const findUser = require("./auth.services");
const production_endpoint = require("../../utils/endpoints");
const { successResponse, errorResponse } = require("../../utils/responses");
const updateUser = async (req, res) => {
  try {
    const user = await User.update(req.body);
  } catch (error) {
    internalError(error);
  }
};
const findUserByUuid = async (uuid) => {
  return await User.findOne({
    where: {
      uuid: uuid
    }
  });
};
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      latitude,
      longitude,
      gender,
      hospital,
      licence,
      age,
      type,
      profession_uuid,
      password
    } = req.body;
    let professionId;
    if (profession_uuid != "") {
      const profession = await Profession.findOne({
        where: {
          uuid: profession_uuid
        }
      });
      professionId = profession.id;
    }

    const { originalname } = req.file;
    const image = production_endpoint + originalname;
    const user = await User.findOne({ where: { email } });

    if (user) {
      res.status(403).json({
        status: false,
        message: "Email is already registered"
      });
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = await User.create({
        name,
        phone,
        email,
        password: hashedPassword,
        age,
        type,
        image,
        hospital,
        professionId: professionId,
        licence,
        latitude,
        longitude,
        gender
      });

      const response = await findUser(email);
      const userWithId = await User.findOne({
        where: {
          email: email
        }
      });
      const tokens = generateJwtTokens(userWithId);

      res.status(201).json({
        status: true,
        body: response,
        tokens: tokens
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error
    });
    console.log(error);
  }
};
const findDoctors = async (req, res) => {
  try {
    let scope = [];
    const userId = req.user.id;
    scope.push({
      method: ["followersCount", userId]
    });
    scope.push({
      method: ["articlesCount", userId]
    });
    scope.push({
      method: ["postsCount", userId]
    });
    scope.push({
      method: ["checkIfIFollow", userId]
    });
    const response = await User.scope(scope).findAll({
      where: {
        type: "Doctor"
      },
      attributes: {
        exclude: ["id"]
      }
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const findPharmacy = async (req, res) => {
  try {
    let scope = [];
    const userId = req.user.id;
    scope.push({
      method: ["followersCount", userId]
    });
    scope.push({
      method: ["articlesCount", userId]
    });
    scope.push({
      method: ["postsCount", userId]
    });
    scope.push({
      method: ["checkIfIFollow", userId]
    });
    const response = await User.scope(scope).findAll({
      where: {
        type: "Pharmacy"
      },
      attributes: {
        exclude: ["id"]
      }
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const findNurse = async (req, res) => {
  try {
    let scope = [];
    const userId = req.user.id;
    scope.push({
      method: ["followersCount", userId]
    });
    scope.push({
      method: ["articlesCount", userId]
    });
    scope.push({
      method: ["postsCount", userId]
    });
    scope.push({
      method: ["checkIfIFollow", userId]
    });
    const response = await User.scope(scope).findAll({
      where: {
        type: "Nurse"
      },
      attributes: {
        exclude: ["id"]
      }
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const findFire = async (req, res) => {
  try {
    let scope = [];
    const userId = req.user.id;
    scope.push({
      method: ["followersCount", userId]
    });
    scope.push({
      method: ["articlesCount", userId]
    });
    scope.push({
      method: ["postsCount", userId]
    });
    scope.push({
      method: ["checkIfIFollow", userId]
    });
    const response = await User.scope(scope).findAll({
      where: {
        type: "Fire & Rescue"
      },
      attributes: {
        exclude: ["id"]
      }
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const findHospital = async (req, res) => {
  try {
    let scope = [];
    const userId = req.user.id;
    scope.push({
      method: ["followersCount", userId]
    });
    scope.push({
      method: ["articlesCount", userId]
    });
    scope.push({
      method: ["postsCount", userId]
    });
    scope.push({
      method: ["checkIfIFollow", userId]
    });
    const response = await User.scope(scope).findAll({
      where: {
        type: "Hospital"
      },
      attributes: {
        exclude: ["id"]
      }
    });
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};
const updatePassword = async (req, res) => {
  const { email, code, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    res.status(404).json({
      status: false,
      message: "User does not exist"
    });
  } else {
    if (await bcrypt.compare(code, user.password)) {
      await user.update({
        password: bcrypt.hashSync(password, 10)
      });
      const response = await findUser(email);

      res.status(200).json({
        status: true,
        body: {
          name: response.name,
          uuid: response.uuid,
          phone: response.phone,
          email: response.email,
          type: response.type,
          image: response.image
        },
        tokens: generateJwtTokens(response)
      });
    } else {
      res.status(403).json({
        status: false,
        message: "You have entered wrong code"
      });
    }
  }
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    res.status(404).json({
      status: false,
      message: "User does not exist"
    });
  } else {
    const newPassword = crypto.randomBytes(4).toString("hex");
    await user.update({
      password: bcrypt.hashSync(newPassword, 10)
    });
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ecaretzapp@gmail.com",
        pass: "bcwloocqvaleghro"
      },
      from: "ecaretzapp@gmail.com"
    });
    const message = {
      from: "ecaretzapp@gmail.com", // Sender address
      to: email, // List of recipients
      subject: "Password recovery", // Subject line
      html:
        "<p>Hi " +
        user.name +
        ",</p><h3>Use this code to create new password</h3> <br/> <h1>" +
        newPassword +
        "</h1>"
    };

    transport.sendMail(message, (error, info) => {
      if (error) {
        res.status(500).json({
          status: false,
          message: "Internal server error",
          error: error
        });
        console.log(error);
      } else {
        res.status(200).json({
          status: true
        });
      }
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({
        status: false,
        message: "User does not exist"
      });
    } else {
      if (await bcrypt.compare(password, user.password)) {
        const response = await findUser(email);
        res.status(200).json({
          status: true,
          response,
          tokens: generateJwtTokens(response)
        });
      } else {
        res.status(403).json({
          status: false,
          message: "Wrong password"
        });
      }
    }
  } catch (error) {
    internalError();
  }
};
module.exports = {
  registerUser,
  loginUser,
  findDoctors,
  forgotPassword,
  updatePassword,
  findPharmacy,
  findDoctors,
  findFire,
  findNurse,
  findHospital,
  findUserByUuid
};
