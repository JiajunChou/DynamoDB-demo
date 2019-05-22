exports.formateBatchWrite = function(table_name, preLoadData) {
    const putItemParam = {
        RequestItems: {}
    };
    putItemParam.RequestItems[table_name] = [];
    
    preLoadData.forEach(preloadItem => {
        const item = {
            PutRequest: {
                Item: preloadItem
            },
        };
        putItemParam.RequestItems[table_name].push(item);
    });
    return putItemParam;
};