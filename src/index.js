require('dotenv').config();
const AWS = require('aws-sdk');
const awsParamHandler = require('./common/awsParamHandler');
const initLocalBasic = require('./local-init/initLocalBasic');
const delAwsTable = require('./aws-init/deleteAwsTable');
const crtAwsTable = require('./aws-init/createAwsTable');
const isrAwsTable = require('./aws-init/insertAwsItem');

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
    const ddb = new AWS.DynamoDB(config);  // for create, delete table
    const docClient = new AWS.DynamoDB.DocumentClient(config); // for batchWrite

    isrAwsTable.run(docClient);

    // delAwsTable.run(ddb);
    // crtAwsTable.run(ddb);

    // initail Aws Table 盡量不使用: schema 不應該經常更動
    // awsParamHandler.sleep(1).then(() => {
    //     delAwsTable.run(ddb);
    //     console.log('wait 25 seconds to create table.');
    //     return awsParamHandler.sleep(250000);
    // }).then(() => {
    //     crtAwsTable.run(ddb);
    //     console.log('wait 25 seconds to create table.');
    //     return awsParamHandler.sleep(250000);
    // }).then(() => {
    //     isrAwsTable.run(docClient);
    // }).catch(e => {
    //     console.log(e);
    // });

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
    console.log('http://localhost:8000/shell/');

}