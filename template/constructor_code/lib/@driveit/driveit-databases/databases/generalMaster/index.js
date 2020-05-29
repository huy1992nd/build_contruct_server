/*jshint esversion: 9 */

const Sequelize = require("sequelize");
const databaseName = (process.env.dbtest ? process.env.dbtest : "") + "general_master"

var databaseAccount = JSON.parse(process.env.databaseAccount);
console.info(`new instance of sequelize with config - dbname: ${databaseName} - username: ${databaseAccount.username} - dialect: ${databaseAccount.options.dialect}`);
let options = databaseAccount.options;
// options.logging = (process.env.NODE_ENV !== 'production' ? console.info : null);
// options.port = 90;
if (process.env.NODE_ENV === 'development-local') {
    delete options.dialectOptions;
}
// options.logging = true
console.log('connection config', options);

options.define = {
    // charset: 'utf8mb4',
    // collate: 'utf8mb4_0900_ai_ci'
}

let sequelize = new Sequelize(
    databaseName,
    databaseAccount.username,
    databaseAccount.password,
    options);

// sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
sequelize.dialect.supports.schemas = true; //this to prevent schema name in table

const models = {
    Country: require("./models/01.country").init(sequelize, Sequelize, databaseName),
    State: require("./models/02.state").init(sequelize, Sequelize, databaseName),
    City: require("./models/03.city").init(sequelize, Sequelize, databaseName),
    PostCode: require("./models/04.postcode").init(sequelize, Sequelize, databaseName),
    TimeZone: require("./models/05.timezone").init(sequelize, Sequelize, databaseName),
    Language: require("./models/06.language").init(sequelize, Sequelize, databaseName),
    Region: require("./models/07.region").init(sequelize, Sequelize, databaseName),
    Education: require("./models/08.education").init(sequelize, Sequelize, databaseName),
    Religion: require("./models/09.religion").init(sequelize, Sequelize, databaseName),
    Salutation: require("./models/10.salutation").init(sequelize, Sequelize, databaseName),
    Ethnicity: require("./models/11.ethnicity").init(sequelize, Sequelize, databaseName),
    Identity: require("./models/12.identity").init(sequelize, Sequelize, databaseName),
    PreferModeOfContact: require("./models/13.preferModeOfContact").init(sequelize, Sequelize, databaseName),
    Currency: require("./models/14.currency").init(sequelize, Sequelize, databaseName),
    TopicSeries: require("./models/15.topic-series").init(sequelize, Sequelize, databaseName),
    Uom: require("./models/16.uom").init(sequelize, Sequelize, databaseName),
    ItemCategory: require("./models/17.itemCategory").init(sequelize, Sequelize, databaseName),
    MaterialType: require("./models/18.materialType").init(sequelize, Sequelize, databaseName),
    MaterialMaster: require("./models/19.materialMaster").init(sequelize, Sequelize, databaseName),
    MaterialContractor: require("./models/20.materialContractor").init(sequelize, Sequelize, databaseName),
    Campaign: require("./models/21.campaign").init(sequelize, Sequelize, databaseName),
    Material: require("./models/22.materialGroupCode").init(sequelize, Sequelize, databaseName),
    QuantityConversion: require("./models/26.materialQuantityConv").init(sequelize, Sequelize, databaseName),
    Procurement: require("./models/27.materialProcurement").init(sequelize, Sequelize, databaseName),
    Sales: require("./models/28.materialSales").init(sequelize, Sequelize, databaseName),
    Accounting: require("./models/29.materialAccounting").init(sequelize, Sequelize, databaseName),
    Storage: require("./models/30.materialStorage").init(sequelize, Sequelize, databaseName),
    SuperSession: require("./models/31.materialSuperSession").init(sequelize, Sequelize, databaseName),
    VendorBasic: require("./models/32.vendorBasic").init(sequelize, Sequelize, databaseName),
    VendorCommunication: require("./models/33.vendorCommunication").init(sequelize, Sequelize, databaseName),
    VendorGroup: require("./models/34.vendorGroup").init(sequelize, Sequelize, databaseName),
    VendorAccountGroup: require("./models/35.vendorAccountGroup").init(sequelize, Sequelize, databaseName),
    PaymentMethod: require("./models/36.paymentMethod").init(sequelize, Sequelize, databaseName),
    VendorBusinessFinancial: require("./models/37.vendorBusinessFinancial").init(sequelize, Sequelize, databaseName),
    VendorBusinessPurchasing: require("./models/38.vendorBusinessPurchasing").init(sequelize, Sequelize, databaseName),
    VendorBusinessBankData: require("./models/39.vendorBusinessBankData").init(sequelize, Sequelize, databaseName),
    CampaignType: require("./models/40.campaignType").init(sequelize, Sequelize, databaseName),
    CampaignIssuance: require("./models/41.campaignIssuance").init(sequelize, Sequelize, databaseName),
    CampaignRedemption: require("./models/42.campaignRedemption").init(sequelize, Sequelize, databaseName),
    TermsAndConditions: require("./models/43.termsAndCondition").init(sequelize, Sequelize, databaseName),
    TermsAndConditionsTemplate: require("./models/44.termsAndConditionTemplate").init(sequelize, Sequelize, databaseName),
    Evoucher: require("./models/45.evoucher").init(sequelize, Sequelize, databaseName),
    VehicleList: require("./models/46.vehicleList").init(sequelize, Sequelize, databaseName),
    Payment: require("./models/47.payment").init(sequelize, Sequelize, databaseName),
    PaymentDeposit: require("./models/48.paymentDeposit").init(sequelize, Sequelize, databaseName),
    // WarrantycClaimCategory: require("./models/49.warrantyClaimCategory").init(sequelize, Sequelize, databaseName),
    // WarrantycClaimType: require("./models/50.warrantyClaimType").init(sequelize, Sequelize, databaseName),
    // warrantyClaimItemType: require("./models/51.warrantyClaimItemType").init(sequelize, Sequelize, databaseName),
    /** warranty Claim schema move to appointment service - service_master db - Abe */
    WarrantyCategory: require("./models/52.warrantyCategory").init(sequelize, Sequelize, databaseName),
    WarrantyProfile: require("./models/53.warrantyProfile").init(sequelize, Sequelize, databaseName),
    TroubleCode: require("./models/54.troubleCode").init(sequelize, Sequelize, databaseName),
    SymptomCode: require("./models/55.symptomCode").init(sequelize, Sequelize, databaseName),
    RecallMaster: require("./models/56.RecallMaster").init(sequelize, Sequelize, databaseName),
    RecallMasterItems: require("./models/57.RecallMasterItems").init(sequelize, Sequelize, databaseName),
    RecallMasterVehicles: require("./models/58.RecallMasterVehicles").init(sequelize, Sequelize, databaseName),
    RecallMasterSkipHistory: require("./models/59.RecallMasterSkipHistory").init(sequelize, Sequelize, databaseName),
    AreaOperatorCode: require("./models/60.areaOperatorCode").init(sequelize, Sequelize, databaseName),
    RejectedReason: require("./models/61.rejectedReason").init(sequelize, Sequelize, databaseName),
    RegistrationRegion: require("./models/62.registrationRegion").init(sequelize, Sequelize, databaseName),
    PaymentMode: require("./models/63.paymentMode").init(sequelize, Sequelize, databaseName),
    SystemSetting: require("./models/64.systemSetting").init(sequelize, Sequelize, databaseName),
    JPJOriginalStatus: require("./models/65.jpjOriginalStatus").init(sequelize, Sequelize, databaseName),
    DocumentSeries: require("./models/66.document-series").init(sequelize, Sequelize, databaseName),
    DocumentBranchSeries: require("./models/67.document-branch-series").init(sequelize, Sequelize, databaseName),
    EVoucherSeries: require("./models/68.eVoucher-series").init(sequelize, Sequelize, databaseName),
    SuffixSeries: require("./models/69.suffix-series").init(sequelize, Sequelize, databaseName),
    FinancierType: require("./models/70.financierType").init(sequelize, Sequelize, databaseName),
    DocumentType: require("./models/71.document-type").init(sequelize, Sequelize, databaseName),
    VehicleWarrantyCategory: require("./models/72.vehicleWarrantyCategory").init(sequelize, Sequelize, databaseName),
    materialWarranty: require("./models/73.materialWarranty").init(sequelize, Sequelize, databaseName),
    WarrantyClaimCategoryType: require("./models/74.warrantyClaimCategoryType").init(sequelize, Sequelize, databaseName),
    WarrantyClaimPartsPrice: require("./models/75.warrantyClaimPartsPrice").init(sequelize, Sequelize, databaseName),
    MaterialMakeId: require("./models/76.materialMakeIds").init(sequelize, Sequelize, databaseName),
    TechnicianTeam: require("./models/77.technicianTeam").init(sequelize, Sequelize, databaseName),
    TaxCode: require("./models/78.taxCode").init(sequelize, Sequelize, databaseName),
    OutputType: require("./models/79.outputType").init(sequelize, Sequelize, databaseName),
    
    // Order Tables schema
    OrderHeader: require("./models/80.orderHeader").init(sequelize, Sequelize, databaseName),
    OrderAddData: require("./models/81.orderAddData").init(sequelize, Sequelize, databaseName),
    OrderRemark: require("./models/82.orderRemark").init(sequelize, Sequelize, databaseName),
    OrderItems: require("./models/91.orderItems").init(sequelize, Sequelize, databaseName),
    
    InvoiceHeader: require("./models/83.invoiceHeader").init(sequelize, Sequelize, databaseName),
    InvoiceItem: require("./models/84.invoiceItem").init(sequelize, Sequelize, databaseName),
    InvoicePayment: require("./models/85.invoicePayment").init(sequelize, Sequelize, databaseName),
    Adjustment: require("./models/86.adjustment").init(sequelize, Sequelize, databaseName),
    AdjustmentActivityLog: require("./models/87.adjustmentActivityLog").init(sequelize, Sequelize, databaseName),
    NavisionJVSHistory: require("./models/88.navisionJVSHistory").init(sequelize, Sequelize, databaseName),
    ConstantParameter: require("./models/89.constantParameter").init(sequelize, Sequelize, databaseName),
    NavisionCustomerHistory: require("./models/90.navisionCustomerHistory").init(sequelize, Sequelize, databaseName),
    NavisionPOHistory: require("./models/92.navisionPOHistory").init(sequelize, Sequelize, databaseName),
    Receipt: require("./models/93.receipt").init(sequelize, Sequelize, databaseName),
    NavisionInvHistory: require("./models/94.navisionInvHistory").init(sequelize, Sequelize, databaseName),
    NavisionCRonJobs: require("./models/95.navisionCRonJobs").init(sequelize, Sequelize, databaseName),
    NavisionServiceInvoiceHistory: require("./models/96.navisionServiceInvoiceHistory").init(sequelize, Sequelize, databaseName),
    ReasonCodes: require("./models/97.reasonCodes").init(sequelize, Sequelize, databaseName),
    NavisionInvoiceCancelHistory: require("./models/98.navisionInvoiceCancelHistory").init(sequelize, Sequelize, databaseName),
    NavisionCOSInvoiceHistory: require("./models/99.navisionCOSInvoiceHistory").init(sequelize, Sequelize, databaseName),
    InvoiceItemExtra: require("./models/100.invoiceItemExtra").init(sequelize, Sequelize, databaseName),
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(models));

const db = {
    ...models,
    sequelize
};

module.exports = db;