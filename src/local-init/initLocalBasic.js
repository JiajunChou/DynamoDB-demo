const awsParamHandler = require('../common/awsParamHandler');
const preloadMember = require('../../data/table/item');

const tableName = 'Basic';

const partitionKeyName = 'pk';
const partitionKeyType = 'N';
const partitionKeySchemaType = 'HASH';
const sortKeyName = 'typeRange';
const sortKeyType = 'S';
const sortKeySchemaType = 'RANGE';
// GSI
const gsiPartionKeyName = 'typeRange';
const gsiPartionKeyType = 'S';
const gsiPartionKeySchemaType = 'HASH';

const gsiSortKeyName = 'attr1';
const gsiSortKeyType = 'S';
const gsiSortKeySchemaType = 'RANGE';

module.exports = {
    run: (ddb, docClient) => {
        // delete expired table
        const deleteTableParam = {
            TableName: tableName
        };
        // initial table

        const createTableParam = {
            TableName: tableName,
            AttributeDefinitions: [{
                AttributeName: partitionKeyName,
                AttributeType: partitionKeyType
            },
            {
                AttributeName: gsiPartionKeyName,
                AttributeType: gsiPartionKeyType
            },
            {
                AttributeName: gsiSortKeyName,
                AttributeType: gsiSortKeyType
            },
            ],
            KeySchema: [{
                AttributeName: partitionKeyName,
                KeyType: partitionKeySchemaType
            },
            {
                AttributeName: sortKeyName,
                KeyType: sortKeyType
            },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 20,
                WriteCapacityUnits: 2,
            },
            GlobalSecondaryIndexes: [{
                IndexName: 'Basic_GSI',
                KeySchema: [{
                    AttributeName: gsiPartionKeyName,
                    KeyType: gsiPartionKeySchemaType
                },
                {
                    AttributeName: gsiSortKeyName,
                    KeyType: gsiSortKeySchemaType
                },
                ],
                Projection: {
                    ProjectionType: 'ALL',
                },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 20,
                    WriteCapacityUnits: 2,
                },
            },],
        };

        // Member Data
        const memberItem = preloadMember.getInitData();
        const memberParam = awsParamHandler.formateBatchWrite(tableName, memberItem);

        const deleteTableMustSuccess = new Promise(resolve => ddb.deleteTable(deleteTableParam).promise().then(r => {
            resolve(r);
        }).then(() => {
            console.log('[success] Create ', '\x1b[35m' + `${tableName}` + '\x1b[0m');
            return docClient.batchWrite(memberParam).promise(); // Item Data
        }).catch(e => {
            resolve(e);
        }));

        deleteTableMustSuccess.then(() => {
            console.log('[success] Delete ', '\x1b[35m' + `${tableName}` + '\x1b[0m');
            return ddb.createTable(createTableParam).promise();
        }).catch(e => {
            console.log('failed', e);
        });
    },
};