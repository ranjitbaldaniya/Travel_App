"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    //for running seed and undo seed
    // npx sequelize-cli db:seed --seed 20230525092057-tour.js
    // npx sequelize-cli db:seed:undo
    const bulkData = await queryInterface.bulkInsert("Tours", [
      {
        Name: "Jammu Kashmir",
        Discription:
          "Experience the colourful culture of Kashmir on this vacation. Indulge in a relaxing houseboat stay over the scenic lake in Srinagar, enjoy the high altiture Gulmarg Gondola ride and relax at the picturesque Valley in Pahalgam.",
        Image:
          "https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/3795/Sonmarg%203.jpeg?crop=830:650px&downsize=830:650px",
        Price: "22000",
        PackageDays: "7 days",
        StartDate: "2023-05-28",
        EndDate: "2023-06-04",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "Taj Mahel",
        Discription: "Experience the old culture of india's architech and more",
        Image:
          "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
        Price: "5000",
        PackageDays: "2 days",
        StartDate: "2023-05-28",
        EndDate: "2023-05-30",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "Bali",
        Discription:
          " Bali appeals through its sheer natural beauty of looming volcanoes and lush terraced rice fields that exude peace and serenity.",
        Image:
          "https://www.indonesia.travel/content/dam/indtravelrevamp/en/destinations/revision-2019/all-revision-destination/baliH.jpg",
        Price: "70000",
        PackageDays: "10 days",
        StartDate: "2023-05-28",
        EndDate: "2023-06-08",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "Ladakh",
        Discription: "Explore Ladakh with specially curated group tours.",
        Image:
          "https://hldak.mmtcdn.com/prod-s3-hld-hpcmsadmin/holidays/images/cities/1185/1200x658_Leh_1_Vivek-Chauhan.jpg?crop=830:650px&downsize=830:650px",
        Price: "7500",
        PackageDays: "5 days",
        StartDate: "2023-05-28",
        EndDate: "2023-06-03",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "Jaisalmer",
        Discription: "Camel Safari & Rajasthani Folk Music with Dinner",
        Image:
          "https://res.cloudinary.com/thrillophilia/image/upload/c_fill,f_auto,fl_progressive.strip_profile,g_auto,q_auto/v1/filestore/5ucth5oc4tzsmvy6fpx7ytavn113_shutterstock_1267359385.jpg",
        Price: "9000",
        PackageDays: "4 days",
        StartDate: "2023-05-28",
        EndDate: "2023-06-02",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "Andaman",
        Discription:
          "Trip to Ross Island & Coral Island with Glass Bottom Boat Ride",
        Image: "https://andamantourtravel.com/assets/img/banner-or3.jpg",
        Price: "8500",
        PackageDays: "6 days",
        StartDate: "2023-05-28",
        EndDate: "2023-06-04",
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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
