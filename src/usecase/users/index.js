const Joi = require('joi');
const {usersDb} = require('../../data-access');
const {createHashValue} = require('../../shared/helper-functions');
const {botUserId} = require('../../config/docker');

const makeUserSignUp = require('./user-signup');
const userSignUp = makeUserSignUp({
    Joi,
    usersDb,
    createHashValue,
    botUserId,
});

const makeUserLogIn = require('./user-login');
const userLogIn = makeUserLogIn({
    Joi,
    usersDb,
});

module.exports = {
    userSignUp,
    userLogIn,
}