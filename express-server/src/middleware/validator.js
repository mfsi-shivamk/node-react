import BaseJoi from 'joi';
import DateExtension from 'joi-date-extensions';

const Joi = BaseJoi.extend(DateExtension);

export const validateBody = schema => (req, res, next) => {
  const result = req.method !== 'GET' ? Joi.validate(req.body, schema) : Joi.validate(req.query, schema);
  if (result.error) {
    return res.status(400).json(result.error);
  }

  if (!req.value) {
    req.value = {};
  }
  req.value.body = result.value;
  return next();
};

export const schemas = {
  registerSchema: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().length(10).regex(/^[0-9]+$/).required(),
    password: Joi.string().required(),
  }),
  loginSchema: Joi.object().keys({
    phone: Joi.string().optional(),
    email: Joi.string().optional(),
    password: Joi.string().required()
  }),
  sendMessage: Joi.object().keys({
    message: Joi.string().required().min(8).max(150).error(() => 'Message has to be between 8 to 150 characters.')
  }),
  createMovie: Joi.object().keys({
    name: Joi.string().required().min(8).max(150).error(() => 'Movie name has to be between 8 to 150 characters.')
  }),
  createCommentMovie: Joi.object().keys({
    comment: Joi.string().required().min(1).max(1000).error(() => 'Movie comment has to be between 1 to 1000 characters.')
  }),
  createRatingMovie: Joi.object().keys({
    rating: Joi.number().required().min(0).max(10).error(() => 'Movie comment has to be between 0 to 10 characters.'),
    email: Joi.string().email().required()
  }),
  createProject: Joi.object().keys({
    projectName: Joi.string().required().min(3, 'utf8').max(100, 'utf8').error(() => 'Project name has to be between 3 to 100 characters.'),
    clientName: Joi.string().required().min(3, 'utf8').max(100, 'utf8').error(() => 'Client name has to be between 3 to 100 characters.'),
    startDate: Joi.string().required(),
    numberOfEmployee: Joi.number().required(),
    experienceRequired: Joi.number().required().min(1).less(10).error(() => 'Experience has to be between 1 to 10 Yr.'),
    location: Joi.string().required().valid('MUMBAI', 'DELHI', 'CHENNAI'),
    skillsRequired: Joi.string().required().min(1, 'utf8').max(100, 'utf8').error(() => 'Skills has to be between 1 to 100 characters.'),
  })
};
