"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RescheduleRequests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RescheduleRequests.init(
    {
      reason: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "RescheduleRequests"
    }
  );
  return RescheduleRequests;
};
