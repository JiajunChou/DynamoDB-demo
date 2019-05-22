const tableName = 'CarStorage';

const partitionKeyName = 'id';
const partitionKeyType = 'N';
const partitionKeySchemaType = 'HASH';

module.exports = {
    getTableName: tableName,
    getTableSchema:
    {
        TableName: tableName,
        AttributeDefinitions: [{
            AttributeName: partitionKeyName,
            AttributeType: partitionKeyType
        }],
        KeySchema: [{
            AttributeName: partitionKeyName,
            KeyType: partitionKeySchemaType
        }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        }
    }
};