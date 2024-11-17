module.exports = function makeUserLogIn({
    Joi,
    usersDb,
    compareHashValue,
}) {
    return async function userLogIn({
        linkname,
        email,
        password,
    }) {
        console.info({
            linkname,
            email,
        });

        // validatin userInput
        validateInput({
            linkname,
            email,
            password,
        });

        // check if user has exist or not. if not throw error.
        const isUserExist = await usersDb.getUserDetailsByEmail({
            linkname,
            email,
            columnsToGet: ['id', 'accessToken'],
        });
        if (!isUserExist) throw new Error('User do not exist.');

        // compare password for login.
        const isValidUserLogin = await compareHashValue({
            plainText: password,
            hashValue: isUserExist.accessToken,
        });

        if (!isValidUserLogin) {
            throw new Error('Email or Password is incorrect.');
        }
        return 'Login successful.';
    }

    function validateInput({
        linkname,
        email,
        password,
    }) {
        const schema = Joi.object({
            linkname: Joi.string().domain().required(),
            email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).required(),
            password: Joi.string().min(8).required(),
        });
        const {error} = schema.validate({
            linkname,
            email,
            password,
        });
        if (error) {
            throw new Error(error.message);
        }
    }
}