const awsParamHandler = require('../common/awsParamHandler');

const CarSchema = require('../../data/table/carSchema');
const TableName = CarSchema.getTableName;
const CarItem = require('../../data/item/carItem');

module.exports = {
    run: (docClient) => {

        const carItem = CarItem.getInitData();
        const carAmount = carItem.length;
        const carParam1 = awsParamHandler.formateBatchWrite(TableName, carItem.slice(0, carAmount));  // 控制單次寫入量20筆已內

        docClient.batchWrite(carParam1).promise().then(r => {

            console.log('[success] BatchWrite ( CarItem1: ' + carAmount + ') in ', `${TableName}`, r);
        }).catch(e => {
            console.log('failed', e);
        });
    }
};