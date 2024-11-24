module.exports = function makeGetAllActiveUsers({
    Joi,
    usersDb,
}) {
    return async function getAllActiveUsers({linkname}) {
        console.info('getAllActiveUsers usecase called', {linkname});
        validateInput({linkname});

        // get all active users from Db.
        return await usersDb.getAllUserDetails({
            linkname,
            isBlocked: false,
            columnsToGet: ['id', 'firstName', 'lastName', 'email', 'userType',
            'signUpPlatform', 'createdAt', 'createdBy'],
        });
    }

    function validateInput({linkname}) {
        const schema = Joi.object({
            linkname: Joi.string().domain().required(),
        });
        const {error} = schema.validate({linkname});
        if (error) {
            throw new Error(error.message);
        }
    }
}