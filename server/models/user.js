"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.follows, {
        as: "follower",
        foreignKey: {
          name: "followerId",
        },
      }),
        user.hasMany(models.follows, {
          as: "following",
          foreignKey: {
            name: "followingId",
          },
        }),
        user.hasMany(models.feed, {
          as: "feed",
          foreignKey: {
            name: "userId",
          },
        });
      user.hasMany(models.like, {
        as: "like",
        foreignKey: {
          name: "userId",
        },
      });
      user.hasMany(models.comment, {
        as: "comment",
        foreignKey: {
          name: "userId",
        },
      });
      user.hasMany(models.message, {
        as: "senderId",
        foreignKey: {
          name: "sender",
        },
      });
      user.hasMany(models.message, {
        as: "receiverId",
        foreignKey: {
          name: "receiver",
        },
      });
    }
  }
  user.init(
    {
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
      bio: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
