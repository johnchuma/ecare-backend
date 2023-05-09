"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("familyMemberFiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      file: {
        type: DataTypes.STRING,
        allowNull: false
      },
      familyMemberId: {
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
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("familyMemberFiles");
  }
};
