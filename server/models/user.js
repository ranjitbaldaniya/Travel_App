"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.Inquiry, { foreignKey: "userId" });
      user.hasMany(models.Booking, { foreignKey: "userId" });
    }
  }
  user.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      mobileNo: DataTypes.STRING,
      gender: DataTypes.STRING,
      role: DataTypes.STRING,
      dob: DataTypes.DATE,
      status: DataTypes.BOOLEAN,
      createdBy: DataTypes.INTEGER,
      updateBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
