const Sequelize = require("sequelize");
const databaseName = (process.env.dbtest ? process.env.dbtest : "") + "sales_master"
const hook = require("../audit/hook-init");
const databaseAccount = JSON.parse(process.env.databaseAccount);
console.info(`new instance of sequelize with config - dbname: ${databaseName} - username: ${databaseAccount.username} - dialect: ${databaseAccount.options.dialect}`);

let options = databaseAccount.options;
// options.logging = true;
if (process.env.NODE_ENV === 'development-local') {
    // options.port=3306;
    delete options.dialectOptions;
    // options.logging = true
}
// options.logging = true
console.log('connection config', options);

let sequelize = new Sequelize(
    databaseName,
    databaseAccount.username,
    databaseAccount.password,
    options);

// sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
sequelize.dialect.supports.schemas = true; //this to prevent schema name in table

const models = {
    VehicleBooking: require("./models/01.vehicleBooking").init(sequelize, Sequelize, databaseName),
    InsuranceSettlementType: require("./models/02.insuranceSettlementType").init(sequelize, Sequelize, databaseName),
    BookingType: require("./models/03.bookingType").init(sequelize, Sequelize, databaseName),
    // ExciseType: require("./models/05.exciseType").init(sequelize, Sequelize, databaseName),
    LeadSource: require("./models/04.leadSource").init(sequelize, Sequelize, databaseName),
    LeadSourceGroup: require("./models/05.leadSourceGroup").init(sequelize, Sequelize, databaseName),
    LeadType: require("./models/06.leadType").init(sequelize, Sequelize, databaseName),
    Lead: require("./models/07.lead").init(sequelize, Sequelize, databaseName),
    LeadCustomer: require("./models/08.leadCustomer").init(sequelize, Sequelize, databaseName),
    LeadVehicleOwn: require("./models/09.leadVehicleOwn").init(sequelize, Sequelize, databaseName),
    ExciseType: require("./models/10.exciseType").init(sequelize, Sequelize, databaseName),
    VehicleBookingRefund: require("./models/11.vehicleBookingRefund").init(sequelize, Sequelize, databaseName),
    AccessoriesDismantle: require("./models/12.accessoriesDismantle").init(sequelize, Sequelize, databaseName),
    Forecast: require("./models/13.forecast").init(sequelize, Sequelize, databaseName),
    ForecastApproval: require("./models/14.forecastApproval").init(sequelize, Sequelize, databaseName),
    ForecastSetup: require("./models/15.forecastSetup").init(sequelize, Sequelize, databaseName),
    ForecastSetupData: require("./models/16.forecastSetupData").init(sequelize, Sequelize, databaseName),
    Target: require("./models/17.target").init(sequelize, Sequelize, databaseName),
    TargetSetup: require("./models/18.targetSetup").init(sequelize, Sequelize, databaseName),
    TargetSetupData: require("./models/19.targetSetupData").init(sequelize, Sequelize, databaseName),
    Order: require("./models/20.order").init(sequelize, Sequelize, databaseName),
    OrderSetup: require("./models/21.orderSetup").init(sequelize, Sequelize, databaseName),
    OrderSetupModel: require("./models/22.orderSetupModel").init(sequelize, Sequelize, databaseName),
    OrderSetupVariant: require("./models/23.orderSetupVariant").init(sequelize, Sequelize, databaseName),
    OrderSetupProduct: require("./models/24.orderSetupProduct").init(sequelize, Sequelize, databaseName),
    OrderSetupColor: require("./models/25.orderSetupColor").init(sequelize, Sequelize, databaseName),
    OrderList: require("./models/26.orderList").init(sequelize, Sequelize, databaseName),
    OrderListSetup: require("./models/27.orderListSetup").init(sequelize, Sequelize, databaseName),
    AdhocOrder: require("./models/28.adhocOrder").init(sequelize, Sequelize, databaseName),
    AdhocOrderSetup: require("./models/29.adhocOrderSetup").init(sequelize, Sequelize, databaseName),
    AdhocOrderSetupModel: require("./models/30.adhocOrderSetupModel").init(sequelize, Sequelize, databaseName),
    AdhocOrderSetupVariant: require("./models/31.adhocOrderSetupVariant").init(sequelize, Sequelize, databaseName),
    AdhocOrderSetupProduct: require("./models/32.adhocOrderSetupProduct").init(sequelize, Sequelize, databaseName),
    AdhocOrderSetupColor: require("./models/33.adhocOrderSetupColor").init(sequelize, Sequelize, databaseName),
    VehicleBookingTradeInDetail: require("./models/34.vehicleBookingTradeInDetail").init(sequelize, Sequelize, databaseName),
    AdhocOrderPreorder: require("./models/35.adhocOrderPreorder").init(sequelize, Sequelize, databaseName),
    AccessoriesFitment: require("./models/36.accessoriesFitment").init(sequelize, Sequelize, databaseName),
    AccessoriesItem: require("./models/37.accessoriesItem").init(sequelize, Sequelize, databaseName),
    AccessoriesFitmentDocument: require("./models/38.accessoriesFitmentDocument").init(sequelize, Sequelize, databaseName),
    ForecastNew: require("./models/39.forecastNew").init(sequelize, Sequelize, databaseName),
    ForecastApprovalNew: require("./models/40.forecastApprovalNew").init(sequelize, Sequelize, databaseName),
    ForecastModelData: require("./models/41.forecastModelData").init(sequelize, Sequelize, databaseName),
    ForecastVariantData: require("./models/42.forecastVariantData").init(sequelize, Sequelize, databaseName),
    ForecastProductData: require("./models/43.forecastProductData").init(sequelize, Sequelize, databaseName),
    ForecastColorData: require("./models/44.forecastColorData").init(sequelize, Sequelize, databaseName),
    AdhocAccessoriesOrder: require("./models/45.adhocAccessoriesOrder").init(sequelize, Sequelize, databaseName),
    AdhocAccessoriesItem: require("./models/46.adhocAccessoriesItem").init(sequelize, Sequelize, databaseName),
    VehicleTransfer: require("./models/47.vehicleTransfer").init(sequelize, Sequelize, databaseName),
    UsedVehicleBookingData: require("./models/48.usedVehicleBookingData").init(sequelize, Sequelize, databaseName),
    Edisposal: require("./models/49.mockTableEdisposals").init(sequelize, Sequelize, databaseName),
    VehicleTransferAttachment: require("./models/50.vehicleTransferAttachment").init(sequelize, Sequelize, databaseName),
    JvsGroup: require("./models/52.jvsGroup").init(sequelize, Sequelize, databaseName),
    JvsTypesControl: require("./models/53.jvsTypesControl").init(sequelize, Sequelize, databaseName),
    InvoiceAndInsurance: require("./models/54.invoiceAndInsurance").init(sequelize, Sequelize, databaseName),
    Jvs: require("./models/55.jvs").init(sequelize, Sequelize, databaseName),
    JvsCalendarTransaction: require("./models/56.jvsCalendarTransaction").init(sequelize, Sequelize, databaseName),
    JvsCalendarPeriod: require("./models/57.jvsCalendarPeriod").init(sequelize, Sequelize, databaseName),
    JvsCalendar: require("./models/58.jvsCalendar").init(sequelize, Sequelize, databaseName),
    Commissions: require("./models/59.commissions").init(sequelize, Sequelize, databaseName),
    CommissionsSalesAdvisor: require("./models/60.commissionsSalesAdvisior").init(sequelize, Sequelize, databaseName),
    CommissionsDealer: require("./models/61.commissionsDealer").init(sequelize, Sequelize, databaseName),
    DiscretionaryMarginLimit: require("./models/62.discretionaryMarginLimit").init(sequelize, Sequelize, databaseName),
    MarginLimitDealerValues: require("./models/63.marginLimitDealerValues").init(sequelize, Sequelize, databaseName),
    DealerRebates: require("./models/64.dealerRebates").init(sequelize, Sequelize, databaseName),
    DealerRebatesGroups: require("./models/65.dealerRebatesGroups").init(sequelize, Sequelize, databaseName),
    DealerGroupRelation: require("./models/66.dealerGroupRelation").init(sequelize, Sequelize, databaseName),
    MarginLimitDealerGroup: require("./models/65.marginLimitDealerGroup").init(sequelize, Sequelize, databaseName),
    MarginLimitRegistrationRegion: require("./models/68.marginLimitRegistrationRegion").init(sequelize, Sequelize, databaseName),
    MarginLimitTableListValue: require("./models/67.marginLimitTableListValue").init(sequelize, Sequelize, databaseName),
    SelectedDealerGroup: require("./models/69.selectedDealerGroup").init(sequelize, Sequelize, databaseName),
    DealerDebateRegions: require("./models/70.dealerDebateRegions").init(sequelize, Sequelize, databaseName),
    ExcisePaymentHistory: require("./models/71.excisePaymentHistory").init(sequelize, Sequelize, databaseName),
    LocalPurchaseOrder: require("./models/72.localPurchaseOrder").init(sequelize, Sequelize, databaseName),
    LocalPurchaseOrderItems: require("./models/73.localPurchaseOrderItems").init(sequelize, Sequelize),
    ExcisePayment: require("./models/74.excisePayment").init(sequelize, Sequelize, databaseName),
	VehicleBookingInsurance: require("./models/75.vehicleBookingInsurance").init(sequelize, Sequelize, databaseName),
    BookingFee: require("./models/76.bookingFee").init(sequelize, Sequelize, databaseName),
    ExciseEndorsement: require("./models/77.exciseEndorsement").init(sequelize, Sequelize, databaseName),
    VehicleTransferOptionalItem: require("./models/78.vehicleTransferOptionalItem").init(sequelize, Sequelize, databaseName),
    VehicleTransferCompulsoryPackageItem: require("./models/79.vehicleTransferCompulsoryPackageItem").init(sequelize, Sequelize, databaseName),
    VehicleTransferOptionalPackageItem: require("./models/80.vehicleTransferOptionalPackageItem").init(sequelize, Sequelize, databaseName),
    VehicleBookingFreeGift: require("./models/81.vehicleBookingFreeGift").init(sequelize, Sequelize, databaseName),
    ENik: require("./models/82.eNik").init(sequelize, Sequelize, databaseName),
    EDaftar: require("./models/83.eDaftar").init(sequelize, Sequelize, databaseName),
    EDaftarHistory: require("./models/84.edaftarHistory").init(sequelize, Sequelize, databaseName),
    LeadModelOfInterest: require("./models/85.leadModelOfInterest").init(sequelize, Sequelize, databaseName),
    CndnType: require("./models/86.cndnType").init(sequelize, Sequelize, databaseName)
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(models));

const excludeTableAudit = [
    'forecastnew',
    'forecastapprovalnew',
    'forecastmodeldata',
    'forecastvariantdata',
    'forecastproductdata',
    'forecastcolordata',
    'targetsetup',
    'targetsetupdata',
    'ordersetup',
    'ordersetupmodel',
    'ordersetupvariant',
    'ordersetupproduct',
    'ordersetupcolor',
    'adhocordersetup',
    'adhocordersetupmodel',
    'adhocordersetupvariant',
    'adhocordersetupproduct',
    'adhocordersetupcolor',
]
sequelize = hook.initHookEvent(sequelize, excludeTableAudit);
const db = {
    ...models,
    sequelize
};

module.exports = db;