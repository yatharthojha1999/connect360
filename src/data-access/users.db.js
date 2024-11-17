const TABLE_NAME = 'users';
const DATABASE_NAME = 'connect360_users';

function makeUsersDb({mysql}) {
    return Object.freeze({
        create,
        getUserDetailsByEmail,
    });

    async function create({
        linkname, firstName, lastName, email, password, accessToken, isBlocked,
        userType, signUpPlatform, createdBy, createdAt,
    }) {
        const tableColumns = `linkname, firstName, lastName, email, password,
        accessToken, isBlocked, userType, signUpPlatform, createdBy, createdAt`;
        const values = [
            linkname, firstName, lastName, email, password, accessToken,
            isBlocked, userType, signUpPlatform, createdBy, createdAt,
        ];
        const valuesToBeInserted = `?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?`;
        const query = `INSERT INTO ${DATABASE_NAME}.${TABLE_NAME} (${tableColumns}) values (${valuesToBeInserted})`;
        console.info({query});
        console.info({values});
        const [result] = await mysql.execute(
          query,
          values,
        );
        return result;
    }

    async function getUserDetailsByEmail({linkname, email, columnsToGet = ['*']}) {
        const whereCondition = `linkname = ? AND email = ?`;
        const query = `select ${columnsToGet.join(',')} from ${DATABASE_NAME}.${TABLE_NAME} where ${whereCondition}`;
        const values = [linkname, email];
        const [result] = await mysql.execute(
          query,
          values,
        );
        return result[0];
    }
}

module.exports = makeUsersDb;