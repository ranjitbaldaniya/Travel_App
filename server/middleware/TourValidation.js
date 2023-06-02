const Joi = require("joi");

const TourSchemaValidation = (data) => {
  const addTourSchema = Joi.object().keys({
    Name: Joi.string().required(),
    Discription: Joi.string().required(),
    Image: Joi.string().required(),
    Price: Joi.string().required(),
    PackageDays: Joi.string().required(),
    StartDate: Joi.date().raw().required(),
    EndDate: Joi.date().raw().required(),
    status: Joi.boolean(),
    // createBy: Joi.number(),
    // updateBy: Joi.number(),
  });

  const result = addTourSchema.validate(data);

  return result;
};


const UpdateTourSchemaValidation = (data) => {
  const addTourSchema = Joi.object().keys({
    Name: Joi.string().required(),
    Discription: Joi.string().required(),
    Image: Joi.string(),
    Price: Joi.string().required(),
    PackageDays: Joi.string().required(),
    StartDate: Joi.date().raw().required(),
    EndDate: Joi.date().raw().required(),
    status: Joi.boolean(),
    // createBy: Joi.number(),
    // updateBy: Joi.number(),
  });

  const result = addTourSchema.validate(data);

  return result;
};
module.exports = { TourSchemaValidation , UpdateTourSchemaValidation};
