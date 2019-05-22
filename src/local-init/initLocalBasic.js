const awsParamHandler = require('../common/awsParamHandler');
const preloadBasic = require('../../data/item/basicItem');
const BasicSchema = require('../../data/table/basicSchema');

module.exports = {
    run: (ddb, docClient) => {
        tableName = BasicSchema.getTableName; // Basic
        // delete expired table
        const deleteTableParam = {
            TableName: tableName
        };
        // initial table
        const createTableParam = BasicSchema.getBasicSchema;
        // Data
        const basicItem = preloadBasic.getInitData();
        const basicItemParam = awsParamHandler.formateBatchWrite(tableName, basicItem);

        const deleteTableMustSuccess = new Promise(resolve => ddb.deleteTable(deleteTableParam).promise().then(r => {
            resolve(r);
        }).catch(e => {
            resolve(e);
        }));

        deleteTableMustSuccess.then(() => {
            console.log('[success] Delete ', '\x1b[35m' + `${tableName}` + '\x1b[0m');
            return ddb.createTable(createTableParam).promise();
        }).then(r => {
            console.log('[success] Create ', '\x1b[35m' + `${tableName}` + '\x1b[0m');
            return docClient.batchWrite(basicItemParam).promise(); // Item Data
        }).then(r => {
            console.log('[success] Insert Basic in ', '\x1b[35m' + `${tableName}` + '\x1b[0m');
        }).catch(e => {
            console.log('failed', e);
        });
    },
};