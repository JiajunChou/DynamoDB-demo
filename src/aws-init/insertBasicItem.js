const awsParamHandler = require('../common/awsParamHandler');

const BasicSchema = require('../../data/table/basicSchema');
const TableName = BasicSchema.getTableName;
const BasicItem = require('../../data/item/basicItem');

module.exports = {
    run: (docClient) => {

        const basicItem = BasicItem.getInitData();
        const basicAmount = basicItem.length;
        const basicParam1 = awsParamHandler.formateBatchWrite(TableName, basicItem.slice(0, basicAmount));  // 控制單次寫入量20筆已內

        docClient.batchWrite(basicParam1).promise().then(r => {

            console.log('[success] BatchWrite ( BasicItem1: ' + basicAmount + ') in ', `${TableName}`, r);
        }).catch(e => {
            console.log('failed', e);
        });
    }
};