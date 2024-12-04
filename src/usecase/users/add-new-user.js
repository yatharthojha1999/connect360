module.exports = function makeAddNewUser({
    Joi,
    usersDb,
    createHashValue,
    preapreDataForNewUserEmail,
}) {
    return async function addNewUser({
        linkname, firstName, lastName, email, userType, signUpPlatform, userId,
    }) {

        console.info('addNewUser  usecase called' , {
            linkname, firstName, lastName, email, userType, signUpPlatform, userId,
        });
        // validate input data, make email firstName lastName and userType as required.
        validateInput({linkname, firstName, lastName, email, userType, signUpPlatform, userId});

        // check if user already exist
        const userData = await usersDb.getUserDetailsByEmail({linkname, email});
        if (userData) {
            throw new Error('User with same email already exist!');
        }

        const password = 'Abcd@1234';
        const accessToken = await createHashValue({textInput: password});
        createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // if no user found create new user
        const newlyCreatedUserId = await usersDb.create({
            linkname, firstName, lastName, email, password, accessToken, isBlocked: true,
            userType, signUpPlatform, createdBy: userId, createdAt,
        });

        // after creating new user send user email notification.
        return await preapreDataForNewUserEmail({linkname, userId, newlyCreatedUserId: newlyCreatedUserId.insertId});
    }

    function validateInput({
        linkname, firstName, lastName, email, userType, signUpPlatform, userId,
    }) {
        const schema = Joi.object({
            linkname: Joi.string().domain().required(),
            firstName: Joi.string().min(3).max(20).required(),
            lastName: Joi.string().min(3).max(20).required(),
            email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}).required(),
            userType: Joi.number().integer().strict().required(),
            signUpPlatform: Joi.string().required(),
            userId: Joi.number().integer().strict().required(),
        });
        const {error} = schema.validate({
            linkname, firstName, lastName, email, userType, signUpPlatform, userId,
        });
        if (error) {
            throw new Error(error.message);
        }
    }
}