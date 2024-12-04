const Joi = require('joi');
const {usersDb} = require('../../data-access');

const {
    createHashValue,
    compareHashValue,
} = require('../../shared/helper-functions');
const {botUserId} = require('../../config/docker');

const {preapreDataForNewUserEmail} = require('../email');

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
    preapreDataForNewUserEmail,
});

const makeDeactivateUser = require('./deactivate-user');
const deactivateUser = makeDeactivateUser({
    Joi,
    usersDb,
});

const makeGetUserDetailsById = require('./get-user-detail-by-id');
const getUserDetailsById = makeGetUserDetailsById({
    Joi,
    usersDb,
});

const makeGetUserDetailsByIds = require('./get-user-details-by-ids');
const getUserDetailsByIds = makeGetUserDetailsByIds({
    Joi,
    usersDb,
});

const makeGetDeactiveUserDetails = require('./get-deactive-user-details');
const getDeactiveUserDetails = makeGetDeactiveUserDetails({
    Joi,
    usersDb,
});

const makeUpdateUserPasswordOnNewLogin = require('./update-user-password-on-new-login');
const updateUserPasswordOnNewLogin = makeUpdateUserPasswordOnNewLogin({
    Joi,
    usersDb,
    createHashValue,
});

module.exports = {
    userSignUp,
    userLogIn,
    activeUsers,
    addNewUser,
    deactivateUser,
    getUserDetailsById,
    getUserDetailsByIds,
    getDeactiveUserDetails,
    updateUserPasswordOnNewLogin,
}