module.exports = function makeGetDeactiveUserDetails({
    Joi,
    usersDb,
}) {
    return async function getDeactiveUserDetails({linkname, userId}) {
        console.info(`getDeactiveUserDetails usecase called`, {linkname, userId});
        validateInput({linkname, userId});

        // get all deactivate users.
        const userDetails = await usersDb.getUserDetailsByIds({
            linkname, ids: [userId], columnsToGet: ['*'],
        });

        if (userDetails && userDetails.length) {
            // check is admin user or not.
            if (userDetails[0].userType === 1) {
                return await usersDb.getDeactiveUserDetails({linkname, columnsToGet: ['*']});
            } else {
                return {};
            } 
        } else {
            throw new Error(`user not found!`);
        }
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