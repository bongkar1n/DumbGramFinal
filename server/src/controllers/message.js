const { message, user } = require("../../models");
const { Op } = require("sequelize");

exports.addMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const { messages } = req.body;

    const anyuser = await user.findOne({
      where: {
        id,
      },
    });

    if (!anyuser) {
      return res.send({
        status: "failed",
        message: "user not found",
      });
    }

    const addOneMessage = await message.create({
      receiver: id,
      sender: userId,
      message: messages,
    });

    const showMessage = await message.findOne({
      where: {
        id: addOneMessage.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "receiver"],
      },
      include: {
        model: user,
        as: "senderId",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "bio", "email", "id"],
        },
      },
    });

    res.send({
      status: "success",
      message: "successfully sent a message",
      data: {
        Message: showMessage,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.getMessageWithOthers = async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;

    const anyuser = await user.findOne({
      where: {
        id,
      },
    });

    if (!anyuser) {
      res.send({
        status: "failed",
        message: "user not found",
      });
    }

    const getMessages = await message.findAll({
      where: {
        [Op.or]: [
          {
            sender: id,
            receiver: userId,
          },
          {
            sender: userId,
            receiver: id,
          },
        ],
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "sender", "receiver"],
      },

      include: {
        model: user,
        as: "senderId",
        attributes: {
          exclude: ["createdAt", "updatedAt", "bio", "email", "password"],
        },
      },
    });

    res.send({
      status: "success",
      message: "successfully got all message with others",
      data: {
        message: getMessages,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};
