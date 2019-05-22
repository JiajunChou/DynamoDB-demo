const BasicSchema = require('./../../data/table/basicSchema');
const tableName = BasicSchema.getTableName;

module.exports = {
    run: (ddb) => {
        // delete expired table
        const deleteTableParam = {
            TableName: tableName
        };

        ddb.deleteTable(deleteTableParam).promise().then(() => {
            console.log('[success] Delete ', '\x1b[35m' + `${tableName}` + '\x1b[0m');
        }).catch(e => {
            console.log('failed', e);
        });
    }
}