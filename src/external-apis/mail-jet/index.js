const axios = require('axios');


const makeSendEmail = require('./send-email-to-new-user');
const sendEmail = makeSendEmail({axios});


module.exports = {
    sendEmail,
}