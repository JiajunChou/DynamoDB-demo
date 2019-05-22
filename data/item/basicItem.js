const NowDate = new Date();
const CreateDate = NowDate.toISOString();
const OffDate = new Date(
    NowDate.setMonth(NowDate.getMonth() + 1)
).toISOString();

module.exports = {
    getInitData: () => [
        {
            pk: 1,
            typeRange: "Basic",
            attr1: "238000",
            credit: 0,
            deposit: false,
            createDate: CreateDate,
            modifyDate: OffDate,
            active: true,
        }
    ]
};
