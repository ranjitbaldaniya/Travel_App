const Joi = require("joi");

const CreateInquiryValidation = (data) => {
    
  const inquirySchema = Joi.object().keys({
    title: Joi.string().required(),
    discription: Joi.string().required(),
    createdBy: Joi.number().required(),
    updatedBy: Joi.number(),
    userId: Joi.number().required(),
    tourId: Joi.number().required(),
    status: Joi.boolean(),
  });

  const result = inquirySchema.validate(data);

  return result;
};

const UpdateInquiryValidation = (data) => {
    
  const inquirySchema = Joi.object().keys({
    title: Joi.string().required(),
    discription: Joi.string().required(),
    // createdBy: Joi.number().required(),
    updatedBy: Joi.number().required(),
    userId: Joi.number().required(),
    tourId: Joi.number().required(),
    // status: Joi.boolean(),
  });

  const result = inquirySchema.validate(data);

  return result;
};

module.exports = {CreateInquiryValidation, UpdateInquiryValidation};
