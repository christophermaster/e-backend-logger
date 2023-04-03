const Joi = require('joi');

const aplicationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports = aplicationValidation;