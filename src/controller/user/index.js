const useCases = require('../../usecase');

const makeGetUserDetailsByIdsAction = require('./get-user-details-by-ids-action');
const getUserDetailsByIdsAction = makeGetUserDetailsByIdsAction({
    getUserDetailsByIds: useCases.usersUsecase.getUserDetailsByIds,
});

const makeUserSignUpAction = require('./user-signup-action');
const userSignUpAction = makeUserSignUpAction({
    userSignUp: useCases.usersUsecase.userSignUp,
});

const makeUserLogInAction = require('./user-login-action');
const userLogInAction = makeUserLogInAction({
    userLogIn: useCases.usersUsecase.userLogIn,
});

const makeGetActiveUsersAction = require('./active-users-action');
const getActiveUsersAction = makeGetActiveUsersAction({
    activeUsers: useCases.usersUsecase.activeUsers,
});

const makeAddNewUserAction = require('./add-new-user-action');
const addNewUserAction = makeAddNewUserAction({
    addNewUser: useCases.usersUsecase.addNewUser,
});

const makeDeactivateUserAction = require('./deactivate-user-action');
const deactivateUserAction = makeDeactivateUserAction({
    deactivateUser: useCases.usersUsecase.deactivateUser,
});

const makeGetUserDetailsByIdAction = require('./get-user-detail-by-id-action');
const getUserDetailsByIdAction = makeGetUserDetailsByIdAction({
    getUserDetailsById: useCases.usersUsecase.getUserDetailsById,
});

module.exports = {
    userSignUpAction,
    userLogInAction,
    getActiveUsersAction,
    addNewUserAction,
    deactivateUserAction,
    getUserDetailsByIdAction,
    getUserDetailsByIdsAction,
}