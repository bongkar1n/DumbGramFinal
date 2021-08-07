const { user, follows } = require("../../models");

exports.users = async (req, res) => {
  try {
    const users = await user.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    res.send({
      status: "success",
      message: "successfully get all data ",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error),
      res.status({
        status: "failed",
        message: "Server error",
      });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { body } = req;

    await user.create(body);
    res.send({
      status: "success",
      message: "data successfully added ",
    });
  } catch (error) {
    console.log(error),
      res.status({
        status: "failed",
        message: "Server error",
      });
  }
};

exports.userData = async (req, res) => {
  try {
    const { userId } = req;
    // const path = process.env.PATH_UPLOAD;

    let userData = await user.findAll({
      where: {
        id: userId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
      include: [
        {
          model: follows,
          as: "following",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: follows,
          as: "follower",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    // if (userData == null) {
    //   res.send({
    //     status: "failed",
    //     message: `data with id ${id} is not found`,
    //   });
    // }

    // const parseJSON = JSON.parse(JSON.stringify(userData));

    // userData = parseJSON.map((item) => {
    //   return {
    //     ...item,
    //     image: path + item.image,
    //   };
    // });

    res.send({
      status: "success",
      message: "successfully get 1 data ",
      data: {
        user: userData,
      },
    });
  } catch (error) {
    console.log(error),
      res.status({
        status: "failed",
        message: "Server error",
      });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;

    const userData = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
      include: [
        {
          model: follows,
          as: "following",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: follows,
          as: "follower",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.send({
      status: "success",
      message: "successfully get 1 data by follow ",
      data: {
        user: userData,
      },
    });
  } catch (error) {
    console.log(error),
      res.status({
        status: "failed",
        message: "Server error",
      });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { body } = req;
    const { userId } = req;
    // const image = req.files.imageFile[0].filename;
    let image = null;

    if (req.files.imageFile) {
      image = req.files.imageFile[0].filename;
    } else if (!image) {
      const result = await user.findOne({
        where: {
          id: userId,
        },
        attributes: ["id", "image"],
      });

      image = result.image;
    }

    // const schema = joi.object({
    //   email: joi.string().email().min(7),
    //   fullname: joi.string().min(6),
    //   username: joi.string().min(6),
    //   password: joi.string().min(6),
    // });

    // const { error } = schema.validate(data);

    // if (error) {
    //   return res.send({
    //     status: "Validation Failed",
    //     message: error.details[0].message,
    //   });
    // }

    const joinData = {
      ...body,
      image,
    };

    const updateData = await user.update(joinData, {
      where: {
        id: userId,
      },
    });

    const dataUpdate = await user.findOne({
      where: {
        id: userId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    res.send({
      status: "success",
      message: "Data successfully updated",
      data: {
        user: dataUpdate,
      },
    });
  } catch (error) {
    console.log(error),
      res.status({
        status: "failed",
        message: "Server error",
      });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await user.findOne({
      where: {
        id,
      },
    });

    await user.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: "User successfully deleted",
      data: {
        id: deletedUser.id,
      },
    });
  } catch (error) {
    console.log(error),
      res.status({
        status: "failed",
        message: "Server error",
      });
  }
};
