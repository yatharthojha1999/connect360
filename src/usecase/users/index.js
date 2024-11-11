const Joi = require('joi');
// const {} = require('');

const makeUserSignUp = require('./user-signup');
const userSignUp = makeUserSignUp({
    Joi,
    usersDb: '',
});

const makeUserLogIn = require('./user-login');
const userLogIn = makeUserLogIn({
    Joi,
    usersDb: '',
});

module.exports = {
    userSignUp,
    userLogIn,
}