const bcrypt = require('bcrypt');

// create hash from plain text
async function createHashValue({textInput}) {
    const saltRounds = 10;
    return await bcrypt.hash(textInput, saltRounds);
}

// compare plain text with hash value.
async function compareHashValue({plainText, hashValue}) {
    return bcrypt.compare(plainText, hashValue);
}

module.exports = {
    createHashValue,
    compareHashValue,
};