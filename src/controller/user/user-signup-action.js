module.exports = function makeUserSignUpAction({
    userSignUp,
}) {
    return async function userSignUpAction(apiRequestMiddleware) {
        const firstName = apiRequestMiddleware.body.firstName;
        const lastName = apiRequestMiddleware.body.lastName;
        const email = apiRequestMiddleware.body.email;
        const password = apiRequestMiddleware.body.password;
        const linkname = apiRequestMiddleware.headers.linkname;
        const userSignUpResult = await userSignUp({
                linkname,
                firstName,
                lastName,
                email,
                password,
            });
    }
}