"use strict";
const { Model } = require("sequelize");
const User = require("./user");
const Tour = require("./tour");

module.exports = (sequelize, DataTypes) => {
  class Inquiry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    // npx sequelize-cli db:migrate --to 20230517061715-create-inquiry.js
    static associate(models) {
      // define association here
      Inquiry.belongsTo(models.user, { foreignKey: "userId" });
      Inquiry.belongsTo(models.Tour, { foreignKey: "tourId" });
    }
  }
  Inquiry.init(
    {
      title: DataTypes.STRING,
      discription: DataTypes.STRING,
      status: DataTypes.STRING,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      tourId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Inquiry",
    }
  );
  return Inquiry;
};
