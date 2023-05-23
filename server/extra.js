'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      mobileNo: DataTypes.STRING,
      gender: DataTypes.STRING,
      dob: DataTypes.DATE,
      status: DataTypes.BOOLEAN,
      createdBy: DataTypes.INTEGER,
      updateBy: DataTypes.INTEGER,
  }, {});
  User.associate = function(models) {
    User.hasMany(models.inquiry, {as: 'inquires'})
  };
  return User;
};



'use strict';
module.exports = (sequelize, DataTypes) => {
  const Inquiry = sequelize.define('Inquiry', {
    discription: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    userId : DataTypes.INTEGER,
    tourId : DataTypes.INTEGER
  }, {});
  Inquiry.associate = function(models) {
    Inquiry.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
  };
  return Inquiry;
};