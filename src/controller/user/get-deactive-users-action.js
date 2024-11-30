module.exports = function makeGetDeactiveUserDetailsAction({
    getDeactiveUserDetails,
}) {
    return async function getDeactiveUserDetailsAction(apiRequestMiddleware) {
        const linkname = apiRequestMiddleware.headers.linkname;
        const userId = +apiRequestMiddleware.userId;
        return await getDeactiveUserDetails({linkname, userId});
    }
}