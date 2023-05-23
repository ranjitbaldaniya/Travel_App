'use strict';
const {
  Model
} = require('sequelize');
const User = require('./user')
const Tour = require('./tour')

module.exports = (sequelize, DataTypes) => {
  class Inquiry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Inquiry.belongsTo(models.user, {foreignKey: 'userId', as: 'user'})
      Inquiry.belongsTo(models.Tour, {foreignKey: 'tourId', as: 'tour'})

    }
  }
  Inquiry.init({
    discription: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    userId : DataTypes.INTEGER,
    tourId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Inquiry',
  }); 
  return Inquiry;
};