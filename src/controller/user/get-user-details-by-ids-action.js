module.exports = function makeGetUserDetailsByIdsAction({
    getUserDetailsByIds,
}) {
    return async function getUserDetailsByIdsAction(apiRequestMiddleware) {
        const linkname = apiRequestMiddleware.headers.linkname;
        const userIds = apiRequestMiddleware.body.userIds;
        return await getUserDetailsByIds({linkname, userIds});
    }
}