"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comment.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      }),
        comment.belongsTo(models.feed, {
          as: "feed",
          foreignKey: {
            name: "feedId",
          },
        });
    }
  }
  comment.init(
    {
      comment: DataTypes.STRING,
      feedId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "comment",
    }
  );
  return comment;
};
