module.exports = function makeUserSignUp({
    Joi,
    usersDb,
    createHashValue,
    botUserId,
}) {
    return async function userSignUp({
        linkname,
        firstName,
        lastName,
        email,
        password,
    }) {
        console.info('userSignUp usecase called', {
            linkname,
            firstName,
            lastName,
            email,
        });

        validateInputs({
            linkname,
            firstName,
            lastName,
            email,
            password,
        });

        // check if user has already signup or not. if not create new user.
        const checkIsUserAlreadyExist = await usersDb.getUserDetailsByEmail({linkname, email});
        if (checkIsUserAlreadyExist) {
            throw new Error('User with same email already exists.');
        }

        // generate accessToken from password.
        const accessToken = await createHashValue({textInput: password});
        createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ')

        // dbCall for creating user.
        return await usersDb.create({
            linkname, firstName, lastName, email, password, accessToken, isBlocked: false,
            userType: 1, signUpPlatform: 'system', createdBy: botUserId, createdAt,
        });
    }

    function validateInputs({
        linkname,
        firstName,
        lastName,
        email,
        password,
    }) {
        const schema = Joi.object({
            linkname: Joi.string().domain().required(),
            firstName: Joi.string().min(3).max(20).required(),
            lastName: Joi.string().min(3).max(20).required(),
            email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).required(),
            password: Joi.string().min(8).required(),
        });
        const {error} = schema.validate({
            linkname,
            firstName,
            lastName,
            email,
            password,
        });
        if (error) {
            throw new Error(error.message);
        }
    }
}