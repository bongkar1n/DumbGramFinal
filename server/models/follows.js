"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class follows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      follows.belongsTo(models.user, {
        as: "follower",
        foreignKey: {
          name: "followerId",
        },
      }),
        follows.belongsTo(models.user, {
          as: "following",
          foreignKey: {
            name: "followingId",
          },
        });
    }
  }
  follows.init(
    {
      followerId: DataTypes.INTEGER,
      followingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "follows",
    }
  );
  return follows;
};
