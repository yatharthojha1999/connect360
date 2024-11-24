module.exports = function makeAddNewUserAction({
    addNewUser,
}) {
    return async function addNewUserAction(apiRequestMiddleware) {
        const linkname = apiRequestMiddleware.headers.linkname;
        const firstName = apiRequestMiddleware.body.firstName;
        const lastName = apiRequestMiddleware.body.lastName;
        const email = apiRequestMiddleware.body.email;
        const userType = apiRequestMiddleware.body.userType;
        const signUpPlatform = apiRequestMiddleware.body.signUpPlatform;
        const userId = apiRequestMiddleware.userId;
        return await addNewUser({linkname, firstName, lastName, email, userType, signUpPlatform, userId});
    }
}