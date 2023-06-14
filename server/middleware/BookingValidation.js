const Joi = require("joi");

const BookingValidation = (data) => {
  const bookingSchema = Joi.object().keys({
    paid: Joi.boolean().required(),
    booikgPlace: Joi.string().required(),
    peopleQunatity: Joi.string().required(),
    userId: Joi.number().required(),
    tourId: Joi.number().required(),
  });

  const result = bookingSchema.validate(data);

  return result;
};

module.exports = { BookingValidation };
