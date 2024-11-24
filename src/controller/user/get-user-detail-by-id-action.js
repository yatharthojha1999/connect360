module.exports = function makeGetUserDetailsByIdAction({
    getUserDetailsById,
}) {
    return async function getUserDetailsByIdAction(apiRequestMiddleware) {
        const linkname = apiRequestMiddleware.headers.linkname;
        const userId = +apiRequestMiddleware.params.userId;
        return await getUserDetailsById({linkname, userId});
    }
}