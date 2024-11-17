const bcrypt = require('bcrypt');

async function createHashValue({textInput}) {
    const saltRounds = 10;
    return await bcrypt.hash(textInput, saltRounds);
}

module.exports = {
    createHashValue,
};