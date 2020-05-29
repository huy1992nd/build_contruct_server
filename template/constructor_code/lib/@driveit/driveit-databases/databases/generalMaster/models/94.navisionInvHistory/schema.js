const Sequelize = require("sequelize");
const StatusEnum = require("../enums/Status");

module.exports = () => {
  return {
    seqNo: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1
    },
    companyCode: {
      type: Sequelize.STRING(20),
      defaultValue: 'TCEC',
    },
    dataType: {
      type: Sequelize.STRING(1),
    },
    documentType: {
      type: Sequelize.STRING(30),
      defaultValue: 'Invoice',
    },
    documentRef: {
      type: Sequelize.STRING(5),
      defaultValue: 'INN',
      allowNull: false,
    },
    documentNo: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    externalDocumentNo: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    documentDate: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    customerCode: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    bizstreamDimension: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: 'NV',
    },
    costCenter: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    genProdPostingGroup: {
      type: Sequelize.STRING(10), allowNull: false
    },
    modelCode: {
      type: Sequelize.STRING(20), allowNull: false
    },
    accessoryCode: {
      type: Sequelize.STRING(20), allowNull: false
    },
    chassisNo: {
      type: Sequelize.STRING(20), allowNull: false
    },
    registrationNo: {
      type: Sequelize.STRING(20), allowNull: false
    },
    userFieldText1: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    userFieldText2: {
      type: Sequelize.STRING(50), allowNull: false
    },
    customerName: {
      type: Sequelize.STRING(50), allowNull: false
    },
    applyToDocumentType: {
      type: Sequelize.STRING(50), defaultValue: '',
    },
    applyToDocumentNo: {
      type: Sequelize.STRING(20), defaultValue: '',
    },
    chequeNo: {
      type: Sequelize.STRING(20), defaultValue: '',
    },
    payeeName: {
      type: Sequelize.STRING(50), defaultValue: '',
    },
    paymentMethod: {
      type: Sequelize.STRING(20), defaultValue: '',
    },
    userFieldText3: {
      type: Sequelize.STRING(50), defaultValue: '',
    },
    userFieldDate1: { // date
      type: Sequelize.STRING(50), defaultValue: '',
    },
    userFieldText4: {
      type: Sequelize.STRING(50), defaultValue: '',
    },
    makeCode: {
      type: Sequelize.STRING(20), allowNull: false
    },
    gstBusPostingGroup: {
      type: Sequelize.STRING(10), defaultValue: '',
    },
    gstProdPostingGroup: {
      type: Sequelize.STRING(10), defaultValue: '',
    },
    taxCode: {
      type: Sequelize.STRING(10), defaultValue: '',
    },
    gstRate: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0,
    },
    gstAmount: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0,
    },
    gstBaseAmount: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0,
    },
    gstCalcType: {
      type: Sequelize.STRING(10), defaultValue: '',
    },
    supplierName: {
      type: Sequelize.STRING(100), defaultValue: ''
    },
    invoiceNo: {
      type: Sequelize.STRING(100), defaultValue: ''
    },
    supplierBRNNo: {
      type: Sequelize.STRING(30), defaultValue: ''
    },
    reservedField2: {
      type: Sequelize.STRING, defaultValue: '',
      allowNull: true,
    },
    reservedField3: {
      type: Sequelize.STRING, defaultValue: '',
      allowNull: true,
    },
    reservedField4: {
      type: Sequelize.STRING, defaultValue: '',
      allowNull: true,
    },
    reservedField5: {
      type: Sequelize.STRING, defaultValue: '',
      allowNull: true,
    },
    reservedField6: {
      type: Sequelize.STRING, defaultValue: '',
      allowNull: true,
    },
    reservedField7: {
      type: Sequelize.STRING, defaultValue: '',
      allowNull: true,
    },
    reservedField8: {
      type: Sequelize.STRING, defaultValue: '',
    },
    reservedField9: {
      type: Sequelize.STRING, defaultValue: '',
      allowNull: true,
    },
    reservedField10: {
      type: Sequelize.STRING, defaultValue: '',
      allowNull: true,
    },
    // branchId: { // required?
    //   type: Sequelize.STRING,
    //   allowNull: true,
    // },
    // historyType: {
    //   type: Sequelize.ENUM,
    //   allowNull: false,
    //   values: [StatusEnum.navistionHistoryTypes],
    //   defaultValue: StatusEnum.JVS,
    // },
    // poId: {
    //   type: Sequelize.UUID,
    //   allowNull: true,
    // },
    syncStatus: { // updated to kafka status success/fail
      type: Sequelize.ENUM,
      allowNull: false,
      values: [StatusEnum.syncStatus],
      defaultValue: StatusEnum.FAILED,
    },
    deleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdBy: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    updatedBy: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fileId: { // use this as ID check, id is for UUID
        type: Sequelize.UUID,
        allowNull: true,
        defaultValue: Sequelize.UUIDV1
    }
  };
};
