module.exports = function makePrepareDataForNewUserEmail({
    Joi,
    sendEmail,
    usersDb,
    apiKey,
    apiSecret,
}) {
    return async function prepareDataForNewUserEmail({
        linkname, userId, newlyCreatedUserId,
    }) {
        console.info({linkname, userId, newlyCreatedUserId, apiKey, apiSecret});
        validateInput({linkname, userId, newlyCreatedUserId});

        // get user details who has created new user.
        const senderDetails = await usersDb.getUserDetailsById({linkname, id: userId, columnsToGet: ['firstName', 'lastName', 'email']});
        if (!(senderDetails && Object.keys(senderDetails).length)) throw new Error(`Sender Details not found!`);
        
        const receiversDetails = await usersDb.getUserDetailsById({linkname, id: newlyCreatedUserId, columnsToGet: ['firstName', 'lastName', 'email']});
        if (!(receiversDetails && Object.keys(receiversDetails).length)) throw new Error(`Receiver Details not found!`);
        
        const emailSubject = `Welcome to connect360`;
        
        const htmlData = `<h4><b>Dear ${senderDetails.firstName} ${senderDetails.lastName}</b><br /><br />
        ${receiversDetails.firstName} ${receiversDetails.lastName} has invited you to join Connect360.<br /><br />
        kindly click on the button below to activate your account</h4>`;
        
        const messages = [
            {
                "From": {
                    "Email": `${senderDetails.email}`,
                    "Name": `${senderDetails.firstName} ${senderDetails.lastName}`
                },
                "To": [
                    {
                        "Email": `${receiversDetails.email}`,
                        "Name": `${receiversDetails.firstName} ${receiversDetails.lastName}`
                    }
                ],
                "Subject": emailSubject,
                "HTMLPart": htmlData
            }
        ];

        // prepare data here.
        const messageBody = {
            "Messages": messages
        };

        // send email to newly created user.
        return await sendEmail({
            apiKey,
            apiSecret,
            messageBody
        });
    }

    function validateInput({linkname, userId, newlyCreatedUserId}) {
        const schema = Joi.object({
            linkname: Joi.string().domain().required(),
            userId: Joi.number().integer().strict().required(),
            newlyCreatedUserId: Joi.number().integer().strict().required(),
        });

        const {error} = schema.validate({linkname, userId, newlyCreatedUserId});

        if (error) {
            throw new Error(error.message);
        }
    }
}