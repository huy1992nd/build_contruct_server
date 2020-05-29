const Sequelize = require("sequelize");
const VehicleES = require('./models/09.vehicle/elasticSearch');
const databaseName = (process.env.dbtest ? process.env.dbtest : "") + "spec_master"
// const hook = require("../audit/hook-init");
const databaseAccount = JSON.parse(process.env.databaseAccount);
console.info(`new instance of sequelize with config - dbname: ${databaseName} - username: ${databaseAccount.username} - dialect: ${databaseAccount.options.dialect}`);
let options = databaseAccount.options;

// options.logging = console.log

if (process.env.NODE_ENV === 'development-local') {
    delete options.dialectOptions;
}
console.log('connection config', options);
// options.logging = true
let sequelize = new Sequelize(
    databaseName,
    databaseAccount.username,
    databaseAccount.password,
    options);

// sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
sequelize.dialect.supports.schemas = true; //this to prevent schema name in table

const models = {
    Make: require("./models/01.make").init(sequelize, Sequelize, databaseName),
    Model: require("./models/02.model").init(sequelize, Sequelize, databaseName),
    Variant: require("./models/03.variant").init(sequelize, Sequelize, databaseName),
    TransmissionType: require("./models/04.transmissionType").init(sequelize, Sequelize, databaseName),
    BodyType: require("./models/05.bodyType").init(sequelize, Sequelize, databaseName),
    VehicleType: require("./models/06.vehicleType").init(sequelize, Sequelize, databaseName),
    EngineType: require("./models/07.engineType").init(sequelize, Sequelize, databaseName),
    AssemblyType: require("./models/08.assemblyType").init(sequelize, Sequelize, databaseName),
    Vehicle: require("./models/09.vehicle").init(sequelize, Sequelize, databaseName),
    ColorType: require("./models/10.colorType").init(sequelize, Sequelize, databaseName),
    Color: require("./models/11.color").init(sequelize, Sequelize, databaseName),
    VehicleUsage: require("./models/12.vehicleUsage").init(sequelize, Sequelize, databaseName),
    Product: require("./models/13.product").init(sequelize, Sequelize, databaseName),
    CustomerVehicleRelation: require("./models/14.customerVehicleRelation").init(sequelize, Sequelize, databaseName),
    PackageUsage: require("./models/15.packageUsage").init(sequelize, Sequelize, databaseName),
    PackageType: require("./models/16.packageType").init(sequelize, Sequelize, databaseName),
    Package: require("./models/17.package").init(sequelize, Sequelize, databaseName),
    VehicleUpload: require("./models/18.vehicleUpload").init(sequelize, Sequelize, databaseName),
    VehicleBusinessType: require("./models/19.vehicleBusinessType").init(sequelize, Sequelize, databaseName),
    VehicleAccessories: require("./models/20.vehicleAccessories").init(sequelize, Sequelize, databaseName),
    JpjUsageType: require("./models/21.jpjusagetype").init(sequelize, Sequelize, databaseName),
    JpjEngineType: require("./models/22.jpjenginetype").init(sequelize, Sequelize, databaseName),
    VehicleMovement: require("./models/23.vehicleMovement").init(sequelize, Sequelize, databaseName),
    JpjBodyType: require("./models/24.jpjbodytype").init(sequelize, Sequelize, databaseName),
    VehicleSalesServiceHistory: require("./models/25.vehicleSalesServiceHistory").init(sequelize, Sequelize, databaseName),
    VehicleRegistration: require("./models/26.vehicleRegistration").init(sequelize, Sequelize, databaseName),
    CustomerVehicleRelationHistory: require("./models/27.customerVehicleRelationHistory").init(sequelize, Sequelize, databaseName),
    VehicleKey: require("./models/28.vehicleKey").init(sequelize, Sequelize, databaseName),
    Keys: require("./models/29.keys").init(sequelize, Sequelize, databaseName),
    RegistrationType: require("./models/30.registrationType").init(sequelize, Sequelize, databaseName),
    OICRectification: require("./models/31.oicRectification").init(sequelize, Sequelize, databaseName),
    VehicleModel: require("./models/32.vehicleModel").init(sequelize, Sequelize, databaseName),
    ContractorDetailes: require("./models/33.contractorDetailes").init(sequelize, Sequelize, databaseName),
    Promotion: require("./models/34.promotion").init(sequelize, Sequelize, databaseName),
    PromotionType: require("./models/35.promotionType").init(sequelize, Sequelize, databaseName),
    PromotionItemSet: require("./models/36.promotionItemSet").init(sequelize, Sequelize, databaseName),
    PromotionVariant: require("./models/37.promotionVariant").init(sequelize, Sequelize, databaseName),
    MileageHistory: require("./models/38.mileageHistory").init(sequelize, Sequelize, databaseName),
    JpjMake: require("./models/39.jpjmake").init(sequelize, Sequelize, databaseName),
    JpjColor: require("./models/40.jpjcolor").init(sequelize, Sequelize, databaseName),
    JpjState: require("./models/41.jpjstate").init(sequelize, Sequelize, databaseName),
    JpjCity: require("./models/42.jpjcity").init(sequelize, Sequelize, databaseName),
    vehicleUploadFunction: require("./models/43.vehicleUploadFunction").init(sequelize, Sequelize, databaseName),
    VehicleRemarks: require("./models/44.vehicleRemarks").init(sequelize, Sequelize, databaseName),
    JpjOwnerCategory: require("./models/45.jpjOwnerCategory").init(sequelize, Sequelize, databaseName),
    WheelDrive: require("./models/46.wheeldrive").init(sequelize, Sequelize, databaseName),
    TempVehicleCust: require("./models/47.tempVehicleCust").init(sequelize, Sequelize, databaseName)
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(models));

// Init ElasticSearch - Calling a function to create the indices
VehicleES.createTableOrIndex();
// VehicleES.deleteUserTableOrIndex();
// sequelize = hook.initHookEvent(sequelize);

const db = {
    ...models,
    sequelize
};


module.exports = db;