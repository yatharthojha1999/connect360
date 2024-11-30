module.exports = function makeGetUserDetailsByIds({
    Joi,
    usersDb,
}) {
    return async function getUserDetailsByIds({linkname, userIds}) {
        console.info('getUserDetailsByIds use-case called!', {linkname, userIds});

        validateInput({linkname, userIds});

        const userData = await usersDb.getUserDetailsByIds({
            linkname,
            ids: userIds,
            columnsToGet: ['id', 'firstName', 'lastName', 'email', 'isBlocked',
            'userType', 'signUpPlatform', 'createdAt', 'createdBy'],
        });

        if (!(userData && userData.length)) return [];
        return userData;
    }

    function validateInput({linkname, userIds}) {
        const schema = Joi.object({
            linkname: Joi.string().domain().required(),
            userIds: Joi.array().items(Joi.number().integer().strict()).required(),
        });
        const {error} = schema.validate({linkname, userIds});
        if (error) {
            throw new Error(error.message);
        }
    }
}