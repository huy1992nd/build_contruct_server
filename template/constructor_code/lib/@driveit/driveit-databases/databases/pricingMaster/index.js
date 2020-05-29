const Sequelize = require("sequelize");

const databaseAccount = JSON.parse(process.env.databaseAccount);
const databaseName = (process.env.dbtest ? process.env.dbtest : "") + "general_master"

console.info(`new instance of sequelize with config - dbname: ${databaseName} - username: ${databaseAccount.username} - dialect: ${databaseAccount.options.dialect}`);
let options = databaseAccount.options;

if (process.env.NODE_ENV === 'development-local') {
    delete options.dialectOptions;
}
console.log('connection config', options);

let sequelize = new Sequelize(
    databaseName,
    databaseAccount.username,
    databaseAccount.password,
    options);

// sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
sequelize.dialect.supports.schemas = true; //this to prevent schema name in table


const models = {
    TenantGroup : require('./models/01.tenantGroup').init(sequelize, Sequelize, databaseName),
    TenantGrouping : require('./models/02.tenantGrouping').init(sequelize, Sequelize, databaseName),
    RulesSetup: require('./models/03.rulesSetup').init(sequelize, Sequelize, databaseName),
    // PricingRules: require('./models/04.pricingRules').init(sequelize, Sequelize, databaseName),
    // PricingRuleGroup: require('./models/05.pricingRuleGroup').init(sequelize, Sequelize, databaseName),

    // PricingForm: require('./models/06.pricingForm').init(sequelize, Sequelize, databaseName),
    // FormFields: require('./models/07.formFields').init(sequelize, Sequelize, databaseName),
    // FormFieldsConditions: require('./models/08.formFieldsConditions').init(sequelize, Sequelize, databaseName),
    // FormFieldsRules: require('./models/09.formFieldsRules').init(sequelize, Sequelize, databaseName),
    // PricingFormData: require('./models/10.pricingFormData').init(sequelize, Sequelize, databaseName),
    // PricingConditionType: require('./models/11.pricingConditionType').init(sequelize, Sequelize, databaseName),
    
    // PricingRulesData: require('./models/12.pricingRulesData').init(sequelize, Sequelize, databaseName),
    
    // PricingRec: require('./models/15.pricingRec').init(sequelize, Sequelize, databaseName),
    // PricingRecKeys: require('./models/16.pricingRecKeys').init(sequelize, Sequelize, databaseName),
    // PricingRecValues: require('./models/17.pricingRecValues').init(sequelize, Sequelize, databaseName),
    // PricingRecJoin: require('./models/18.pricingRecJoin').init(sequelize, Sequelize, databaseName),

    PricingConditionType: require('./models/11.pricingConditionType').init(sequelize, Sequelize, databaseName),
    PricingRules: require('./models/20.pricingRules').init(sequelize, Sequelize, databaseName),
    pricingRulesAndCond: require('./models/21.pricingRulesAndCond').init(sequelize, Sequelize, databaseName),
    pricingRulesData: require('./models/22.pricingRulesData').init(sequelize, Sequelize, databaseName),
    SalesPricing: require('./models/23.salesPricing').init(sequelize, Sequelize, databaseName),
    SalesPricingStdPacAcc: require('./models/24.salesPricingStdPacAcc').init(sequelize, Sequelize, databaseName),
    SalesPricingVehicle: require('./models/25.salesPricingVehicle').init(sequelize, Sequelize, databaseName),
    MiscCharges: require('./models/26.miscCharges').init(sequelize, Sequelize, databaseName),
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