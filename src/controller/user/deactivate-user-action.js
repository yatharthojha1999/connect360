module.exports = function makeDeactivateUserAction({
    deactivateUser,
}) {
    return async function deactivateUserAction(apiRequestMiddleware) {
        const linkname = apiRequestMiddleware.headers.linkname;
        const userId = +apiRequestMiddleware.params.userId;
        return await deactivateUser({linkname, userId});
    }
}