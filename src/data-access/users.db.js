const TABLE_NAME = 'users';
const DATABASE_NAME = 'connect360_users';

function makeUsersDb({mysql}) {
    return Object.freeze({
        create,
        getUserDetailsByEmail,
        getAllUserDetails,
        updateUserDetails,
        getUserDetailsByIds,
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

    async function getAllUserDetails({linkname, isBlocked, columnsToGet = ['*']}) {
        const whereCondition = `linkname = ? AND isBlocked = ?`;
        const query = `select ${columnsToGet.join(',')} from ${DATABASE_NAME}.${TABLE_NAME} where ${whereCondition}`;
        const values = [linkname, isBlocked];
        const [result] = await mysql.execute(
          query,
          values,
        );
        return result;
    }

    async function updateUserDetails({linkname, userId}) {
        const whereCondition = `linkname = ? AND id = ?`;
        const setCondition = `isBlocked = ?`;
        const values = [true, linkname, userId];
        const query = `UPDATE ${DATABASE_NAME}.${TABLE_NAME} SET ${setCondition} WHERE ${whereCondition}`;
        const [result] = await mysql.execute(
            query,
            values,
        );
        return result[0];
    }
    
    async function getUserDetailsByIds({linkname, ids, columnsToGet = ['*']}) {
        const placeholders = ids.map(() => '?').join(',');
        const whereCondition = `linkname = ? AND id IN (${placeholders})`;
        const query = `select ${columnsToGet.join(',')} from ${DATABASE_NAME}.${TABLE_NAME} where ${whereCondition}`;
        const values = [linkname, ...ids];
        const [result] = await mysql.execute(
          query,
          values,
        );
        return result;
    }
}

module.exports = makeUsersDb;