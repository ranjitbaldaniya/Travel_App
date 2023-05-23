"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add seed commands here.

    // Example:
    const bulkData = await queryInterface.bulkInsert(
      "users",
      [
        {
          firstName: "Pratik",
          lastName: "Barad",
          email: "pb@gmail.com",
          password: "test@123",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Sagar",
          lastName: "Shiroya",
          email: "sagar@gmail.com",
          password: "test@123",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
