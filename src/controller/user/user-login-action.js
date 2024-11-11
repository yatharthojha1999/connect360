module.exports = function makeUserLogInAction({
    userLogIn,
}) {
    return async function userLogInAction(apiRequestMiddleware) {
        const email = apiRequestMiddleware.body.email;
        const password = apiRequestMiddleware.body.password;
        const linkname = apiRequestMiddleware.headers.linkname;
        const userLogInResult = await userLogIn({
                linkname,
                email,
                password,
            });
    }
}