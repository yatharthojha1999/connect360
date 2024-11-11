module.exports = function makeUserLogIn({
    Joi,
    usersDb,
}) {
    return async function userLogIn({
        linkname,
        email,
        password,
    }) {
        console.info({
            linkname,
            email,
            password,
        });
        // check if user has exist or not. if not throw error.
    }
}