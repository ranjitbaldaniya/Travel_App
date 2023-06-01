const Joi = require("joi");
const db = require("../models");
const User = db.user;
const UserValidation = (data) => {
  // console.log("data" , data)
  const addUserSchema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    repeatPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .messages({ "any.only": "{{#label}} does not match" }),
    mobileNo: Joi.string().required(),
    gender: Joi.string().required(),
    // role: Joi.string().required(),
    dob: Joi.string().required(),
    status: Joi.boolean(),
  });

  const result = addUserSchema.validate(data);
  return result;
};

const UpdateProfileValidation = (data) => {
  // console.log("data" , data)
  const addUserSchema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    dob: Joi.string().required(),
    email: Joi.string().required(),
    mobileNo: Joi.string().required(),
    status: Joi.boolean(),
  });

  const result = addUserSchema.validate(data);
  return result;
};

const UpdateUserValidation = (data) => {
  // console.log("data" , data)
  const addUserSchema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    dob: Joi.string().required(),
    email: Joi.string().required(),
    mobileNo: Joi.string().required(),
    status: Joi.boolean(),
    gender: Joi.string().required(),
    role: Joi.string().required(),
  });

  const result = addUserSchema.validate(data);
  return result;
};

const AddUserValidation = (data) => {
  // console.log("data" , data)
  const addUserSchema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    mobileNo: Joi.string().required(),
    gender: Joi.string().required(),
    role: Joi.string().required(),
    dob: Joi.string().required(),
    status: Joi.boolean(),
  });

  const result = addUserSchema.validate(data);
  return result;
};

// .custom(checkEmail)
const checkEmail = async (data, helper) => {
  console.log("working", data);
  const isEmailInUse = await User.findOne({ where: { data } });
  if (isEmailInUse) {
    return helper.error("Email is alredy Registered!");
  }
  return data;
};

module.exports = {
  UserValidation,
  AddUserValidation,
  UpdateUserValidation,
  UpdateProfileValidation,
};
