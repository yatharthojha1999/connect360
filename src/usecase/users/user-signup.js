module.exports = function makeUserSignUp({
    Joi,
    usersDb,
}) {
    return async function userSignUp({
        linkname,
        firstName,
        lastName,
        email,
        password,
    }) {
        console.info({
            linkname,
            firstName,
            lastName,
            email,
            password,
        });
        // check if user has already signup or not. if not create new user.
    }
}