const awsParamHandler = require('../common/awsParamHandler');
const preloadCar = require('../../data/item/carItem');
const CarSchema = require('../../data/table/carSchema');

module.exports = {
    run: (ddb, docClient) => {
        const tableName = CarSchema.getTableName; // CarStorage
        // delete expired table
        const deleteTableParam = {
            TableName: tableName
        };
        // initial table
        const createTableParam = CarSchema.getTableSchema;
        // Data
        const carItem = preloadCar.getInitData();
        const carItemParam = awsParamHandler.formateBatchWrite(tableName, carItem);

        const deleteTableMustSuccess = new Promise(resolve =>
            ddb.deleteTable(deleteTableParam).promise().then(r => {
                resolve(r);
            }).catch(e => {
                resolve(e);
            })
        );

        deleteTableMustSuccess.then(() => {
            console.log('[success] Delete ', '\x1b[35m' + `${tableName}` + '\x1b[0m');
            return ddb.createTable(createTableParam).promise();
        }).then(r => {
            console.log('[success] Create ', '\x1b[35m' + `${tableName}` + '\x1b[0m');
            return docClient.batchWrite(carItemParam).promise(); // Item Data
        }).then(r => {
            console.log('[success] Insert Car in ', '\x1b[35m' + `${tableName}` + '\x1b[0m');
        }).catch(e => {
            console.log('failed', e);
        });
    },
};