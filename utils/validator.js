'use strict';

const Joi = require('@hapi/joi');
const error = require('../utils/error');

const REGISTER_SCHEMA = Joi.object().keys({
    username: Joi.string().max(100).required(),
    password: Joi.string().min(3).required()
});

const LOGIN_SCHEMA = Joi.object().keys({
    username: Joi.string().max(100).required(),
    password: Joi.string().min(3).required()
});

const SCHEMA = {
    AuthRegister: REGISTER_SCHEMA.AuthRegister,
    AuthLogin: LOGIN_SCHEMA
};

const validate = async (payload, schema) => {
    try {
        return await Joi.validate(payload, SCHEMA[schema]);
    } catch (err) {
        error.throw(err.message.replace(/"/g, ''), 400);
    }
};

module.exports = {
    validate
};