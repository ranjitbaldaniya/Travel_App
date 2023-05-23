const Joi = require("joi");

const InquiryValidation = (data) => {
    
  const inquirySchema = Joi.object().keys({
    discription: Joi.string().required(),
    createdBy: Joi.number().required(),
    updatedBy: Joi.number().required(),
    userId: Joi.number().required(),
    tourId: Joi.number().required(),
    status: Joi.boolean(),
  });

  const result = inquirySchema.validate(data);

  return result;
};

module.exports = {InquiryValidation};
