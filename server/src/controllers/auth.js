const { user } = require("../../models");
const bcrypt = require("bcrypt");
const joi = require("joi");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

exports.registration = async (req, res) => {
  try {
    const data = req.body;
    const { email, password, image } = req.body;

    const schema = joi.object({
      email: joi.string().email().min(7).required(),
      fullname: joi.string().min(6).required(),
      username: joi.string().min(6).required(),
      password: joi.string().min(6).required(),
      image: joi.string(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.send({
        status: "Validation Failed",
        message: error.details[0].message,
      });
    }

    const checkEmail = await user.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return res.send({
        status: "Failed",
        message: "Email already registered",
      });
    }

    const hashStrenght = 10;

    const hashedPassword = await bcrypt.hash(password, hashStrenght);

    const dataUser = await user.create({
      ...data,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: dataUser.id,
      },
      secretKey
    );

    res.send({
      status: "success",
      data: {
        user: {
          fullname: dataUser.fullname,
          username: dataUser.username,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error),
      res.send({
        status: "Failed",
        message: "Server Error",
      });
  }
};

exports.login = async (req, res) => {
  try {
    const data = req.body;
    const { email, password } = req.body;

    const schema = joi.object({
      email: joi.string().email().min(7).required(),
      password: joi.string().min(6).required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.send({
        status: "Validation Failed",
        message: error.details[0].message,
      });
    }

    const checkEmail = await user.findOne({
      where: {
        email,
      },
    });

    if (!checkEmail) {
      return res.send({
        status: "Failed",
        message: "Email and Password do not match",
      });
    }

    const isValidPassword = await bcrypt.compare(password, checkEmail.password);

    if (!isValidPassword) {
      return res.send({
        status: "Failed",
        message: "Email and Password do not match",
      });
    }

    const token = jwt.sign(
      {
        id: checkEmail.id,
      },
      secretKey
    );

    res.send({
      status: "success",
      data: {
        user: {
          fullname: checkEmail.fullname,
          username: checkEmail.username,
          email: checkEmail.email,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error),
      res.send({
        status: "Failed",
        message: "Server Error",
      });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const { userId } = req;

    const dataUser = await user.findOne({
      where: {
        id: userId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.send({
        status: "failed",
      });
    }

    res.send({
      status: "success",
      data: {
        user: dataUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};
