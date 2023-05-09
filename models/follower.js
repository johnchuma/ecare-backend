"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Follower.belongsTo(models.User, {
        as: "user",
        foreignKey: "follower_id"
      });
      Follower.belongsTo(models.User, {
        as: "followee",
        foreignKey: "followee_id"
      });
      // define association here
    }
  }
  Follower.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      follower_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      followee_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      defaultScope: {
        attributes: {
          exclude: []
        }
      },
      modelName: "Follower"
    }
  );
  return Follower;
};
