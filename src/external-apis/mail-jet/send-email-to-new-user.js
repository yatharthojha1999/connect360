module.exports = function makeSendEmail({
    axios,
}) {
    return async function sendEmail({apiKey, apiSecret, messageBody}) {
        console.info(`External Api to send email called !`);
        try {
            const apiResponse = await axios({
                method: 'POST',
                url: 'https://api.mailjet.com/v3.1/send',
                auth: {
                    username: apiKey,
                    password: apiSecret,
                },
                data: messageBody,
            });
            return (apiResponse.Messages) ? apiResponse.Messages : apiResponse;
        } catch (error) {
            console.info('Error in makeSendEmail API');
            throw new Error(error);
        }
    }                
}
