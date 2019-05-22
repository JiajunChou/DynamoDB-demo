const BasicSchema = require('../../../data/table/basicSchema');

module.exports = {
    run: (ddb) => {
        // initial table
        tableName = BasicSchema.getTableName; // Basic

        const createTableParam = BasicSchema.getTableSchema;

        ddb.createTable(createTableParam).promise().then(r => {
            console.log(r);
            console.log('[success] Create ', '\x1b[35m' + `${tableName}` + '\x1b[0m');
        }).catch(e => {
            console.log('failed', e);
        });
    },
};