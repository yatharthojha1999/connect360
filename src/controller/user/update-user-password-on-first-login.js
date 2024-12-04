module.exports = function makeUpdateUserPasswordOnFirstLoginAction({
    updateUserPasswordOnFirstLogin,
}) {
    return async function updateUserPasswordOnFirstLoginAction(apiRequestMiddleware) {
        const linkname = apiRequestMiddleware.headers.linkname;
        const userId = +apiRequestMiddleware.params.userId;
        const newPassword = apiRequestMiddleware.body.newPassword;
        return await updateUserPasswordOnFirstLogin({linkname, userId, newPassword});
    }
}