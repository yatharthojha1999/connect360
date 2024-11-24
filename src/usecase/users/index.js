const Joi = require('joi');
const {usersDb} = require('../../data-access');
const {
    createHashValue,
    compareHashValue,
} = require('../../shared/helper-functions');
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
    compareHashValue,
});

const makeGetActiveUsersAction = require('./active-users');
const activeUsers = makeGetActiveUsersAction({
    Joi,
    usersDb,
});

const makeAddNewUser = require('./add-new-user');
const addNewUser = makeAddNewUser({
    Joi,
    usersDb,
    createHashValue,
});

module.exports = {
    userSignUp,
    userLogIn,
    activeUsers,
    addNewUser,
}