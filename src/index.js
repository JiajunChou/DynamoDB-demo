require('dotenv').load();
const AWS = require('aws-sdk');

let environment = 'local';

if (process.argv[2] !== undefined) {
    environment = process.argv[2];
}

console.log('Environment: ', environment);

let config;
if (environment === 'aws') {
    config = {
        region: process.env.region,
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
    }
    const docClient = new AWS.DynamoDB.DocumentClient(config); // for batchWrite

    initAwsBasic.run(docClient);
} else {
    config = {
        endpoint: 'http://localhost:8000',
        region: 'local',
        accessKeyId: 'local',
        secretAccessKey: 'local',
    }
    const ddb = new AWS.DynamoDB(config);  // for create, delete table
    const docClient = new AWS.DynamoDB.DocumentClient(config); // for batchWrite

    initLocalBasic.run(ddb, docClient);
}