"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Posts", {
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
      userId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      caption: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postCategoryId: {
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
    await queryInterface.dropTable("Posts");
  }
};
