"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.user, { foreignKey: "userId" });
      Booking.belongsTo(models.Tour, { foreignKey: "tourId" });
    }
  }
  Booking.init(
    {
      paid: DataTypes.BOOLEAN,
      booikgPlace: DataTypes.STRING,
      peopleQunatity: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      tourId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
