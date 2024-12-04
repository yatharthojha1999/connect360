const {sendEmail} = require('../../external-apis/mail-jet');
const Joi = require('joi');
const {usersDb} = require('../../data-access');

const makePreapreDataForNewUserEmail = require('./prepare-data-for-new-user-email');
const preapreDataForNewUserEmail = makePreapreDataForNewUserEmail({
    Joi,
    sendEmail,
    usersDb,
    apiKey: process.env.API_KEY || `8939e32d64083005ab701c401ed6f1c0`,
    apiSecret: process.env.API_SECRET_KEY || `5b7eb8e90abce4cc5503e14ef71b176d`,
});


module.exports = {
    preapreDataForNewUserEmail,
};