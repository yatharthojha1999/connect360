const useCases = require('../../usecase');


const makeUserSignUpAction = require('./user-signup-action');
const userSignUpAction = makeUserSignUpAction({
    userSignUp: useCases.usersUsecase.userSignUp,
});

const makeUserLogInAction = require('./user-login-action');
const userLogInAction = makeUserLogInAction({
    userLogIn: useCases.usersUsecase.userLogIn,
});

module.exports = {
    userSignUpAction,
    userLogInAction,
}