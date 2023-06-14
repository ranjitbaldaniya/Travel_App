"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tour.hasMany(models.Inquiry, { foreignKey: "tourId" });
      Tour.hasMany(models.Booking, { foreignKey: "tourId" });
    }
  }
  Tour.init(
    {
      Name: DataTypes.STRING,
      Discription: DataTypes.STRING,
      Image: DataTypes.STRING,
      Price: DataTypes.STRING,
      PackageDays: DataTypes.STRING,
      StartDate: DataTypes.DATE,
      EndDate: DataTypes.DATE,
      status: DataTypes.BOOLEAN,
      createBy: DataTypes.INTEGER,
      updateBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tour",
    }
  );
  return Tour;
};
