# DynamoDB-demo

# Dynamodb local initialize

DynamoDB Preload Data 小工具

## 系統環境需求

- nodejs v8.10.0
- npm 5.6.0
- JRE version 6.x or newer.

## 服務啟動流程

### 步驟1. 下載dynamodb jar及開啟本地dynamodb服務

- 下載jar檔 [DynamoDB (Downloadable Version) on Your Computer](https://docs.aws.amazon.com/en_us/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)
- 將解壓縮內的資料夾DynamoDBLocal_lib跟DynamoDBLocal.jar抓到專案內
****
i. 將terminal切換到專案內，啟動本地dynamodb服務
  - Linux:
    ```bash
    java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
    ```
  - Windows PowerShell:
    ```bash
    java -D"java.library.path=./DynamoDBLocal_lib" -jar DynamoDBLocal.jar -sharedDb
    ```

- Local shell: http://localhost:8000/shell/

* 注意：dynamodb使用port 8000*

---------------

### 步驟2. clone repo and initialize dynamodb

* 注意：只有第一次才需要執行此步驟，之後只要執行 步驟1-啟動本地dynamodb服務，就能在本地啟動dynamodb

i. 將repo抓到本機，切換到該專案目錄，安裝相依套件，然後執行dynamodb初始化
```bash
npm install
```

ii. 執行dynamodb preload data初始化，當設計的 preload data，有異動時就需要重新執行
```
npm run local-init
```
__注意:__ 執行init時，dynamodb要為`啟動`狀態，可另開一個terminal，執行`步驟1的指令`

---------------

### (額外)步驟3. 寫入 aws dynamodb

此功能僅 後端人員使用。

i. 建立 `.env`，將 region, accessKeyId, secretAccessKey 填入 credentials'key 值，若本地端使用皆填入 local 即可
```
region=
accessKeyId=
secretAccessKey=
```

ii. 執行已下指令
```bash
npm run aws-push
```

* 注意: 切勿把 credentials'key commit push 上 repo

---------------

## 疑難雜症

- [DynamoDBMapper.DataTypes](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBMapper.DataTypes.html)