module.exports = function makeDeactivateUser({
    Joi,
    usersDb,
}) {
    return async function deactivateUser({linkname, userId}) {
        // validate input data.
        validateInput({linkname, userId});

        // check is user already deactivated.
        const existingUserDetails = await usersDb.getUserDetailsByIds({
            linkname, ids: [userId], columnsToGet: ['isBlocked'],
        });
        if (existingUserDetails && existingUserDetails.length && existingUserDetails[0].isBlocked) {
            throw new Error('You can not deactivate already deactivated user.');
        }

        // if not deactivate user.
        return await usersDb.updateUserDetails({linkname, userId});

        // send email notification.
    }

    function validateInput({linkname, userId}) {
        const schema = Joi.object({
            linkname: Joi.string().domain().required(),
            userId: Joi.number().integer().strict().required(),
        });

        const {error} = schema.validate({
            linkname, userId,
        });

        if (error) {
            throw new Error(error.message);
        }
    }
}