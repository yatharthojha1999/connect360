module.exports = function makeGetUserDetailsById({
    Joi,
    usersDb,
}) {
    return async function getUserDetailsById({linkname, userId}) {
        console.info(`getUserDetailsById usecase called`, {linkname, userId});
        validateInput({linkname, userId});

        const userData = await usersDb.getUserDetailsByIds({
            linkname,
            ids: [userId],
            columnsToGet: ['id', 'firstName', 'lastName', 'email', 'isBlocked',
                          'userType', 'signUpPlatform', 'createdAt', 'createdBy'],
        });

        if (userData && userData.length) {
            return userData[0];
        }
        return {};
    }

    function validateInput({linkname, userId}) {
        const schema = Joi.object({
            linkname: Joi.string().domain().required(),
            userId: Joi.number().integer().strict().required(),
        });
        const {error} = schema.validate({linkname, userId});
        if (error) {
            throw new Error(error.message);
        }
    }
}