module.exports = function makeUpdateUserPasswordOnNewLogin({
    Joi,
    usersDb,
    createHashValue,
}) {
    return async function updateUserPasswordOnNewLogin({
        linkname, userId, newPassword,
    }) {
        console.info('updateUserPasswordOnNewLogin usecase called', {linkname, userId, newPassword});
        validateInput({linkname, userId, newPassword});

        const getUserDetails = await usersDb.getUserDetailsById({linkname, id: userId, columnsToGet: ['id']});
        if (!getUserDetails) throw new Error(`User not found!`);
        newPassword = await createHashValue({textInput: newPassword});

        await usersDb.updateUserPasswordById({linkname, userId, newPassword});
        return true;
    }

    function validateInput({linkname, userId, newPassword}) {
        const schema = Joi.object({
            linkname: Joi.string().domain().required(),
            userId: Joi.number().integer().strict().required(),
            newPassword: Joi.string().min(3).max(20).required(),
        });
        const {error} = schema.validate({linkname, userId, newPassword});
        if (error) throw new Error(error.message); 
    }
}