'use strict';

const Joi = require('@hapi/joi');
const Err = require('../utils/error');

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

const validate = async (payload, schema, response) => {
    try {
        return await Joi.validate(payload, SCHEMA[schema]);
    } catch (err) {
        new Err(err.message.replace(/"/g, '')).BadRequest(response)
    }
};

module.exports = {
    validate
};