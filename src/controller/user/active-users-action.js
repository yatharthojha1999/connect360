module.exports = function makeGetActiveUsersAction ({
    activeUsers,
}) {
    return async function getActiveUsersAction(apiRequestMiddleware) {
        const linkname = apiRequestMiddleware.headers.linkname;
        return await activeUsers({linkname});
    }
}