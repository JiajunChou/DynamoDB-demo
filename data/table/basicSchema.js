const tableName = 'Basic';

const partitionKeyName = 'pk';
const partitionKeyType = 'N';
const partitionKeySchemaType = 'HASH';

const sortKeyName = 'typeRange';
const sortKeyType = 'S';
const sortKeySchemaType = 'RANGE';
// GSI
const gsiPartionKeyName = 'typeRange';
const gsiPartionKeySchemaType = 'HASH';

const gsiSortKeyName = 'attr1';
const gsiSortKeyType = 'S';
const gsiSortKeySchemaType = 'RANGE';

module.exports = {
    getTableName: tableName,
    getBasicSchema:
    {
        TableName: tableName,
        AttributeDefinitions: [{
            AttributeName: partitionKeyName,
            AttributeType: partitionKeyType
        },
        {
            AttributeName: sortKeyName,
            AttributeType: sortKeyType
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
            KeyType: sortKeySchemaType
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
    }

};