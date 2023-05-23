"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        // primaryKey: true,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mobileNo: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      role: {
        // allowNull: false,
        type: Sequelize.STRING,
      },
      dob: {
        // allowNull: false,
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.BOOLEAN,
        // allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdBy: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      updateBy: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
     
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
