"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class familyMemberFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  familyMemberFile.init(
    {
      file: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "familyMemberFile"
    }
  );
  return familyMemberFile;
};
