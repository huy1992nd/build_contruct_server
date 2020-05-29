const Sequelize = require("sequelize");
const CustomerES = require('./models/10.customer/elasticSearch');
const databaseName = (process.env.dbtest ? process.env.dbtest : "") + "customer_master"

const databaseAccount = JSON.parse(process.env.databaseAccount);
console.info(`new instance of sequelize with config - dbname: ${databaseName} - username: ${databaseAccount.username} - dialect: ${databaseAccount.options.dialect}`);
let options = databaseAccount.options;
// options.logging = true
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
    Sample: require("./models/0.sample").init(sequelize, Sequelize, databaseName),
    CustomerGroup: require("./models/1.customerGroup").init(sequelize, Sequelize, databaseName),
    PaymentTerms: require("./models/2.paymentTerms").init(sequelize, Sequelize, databaseName),
    Block: require("./models/3.block").init(sequelize, Sequelize, databaseName),
    Leads: require("./models/4.leads").init(sequelize, Sequelize, databaseName),
    ContactRelationship: require("./models/5.contactRelationship").init(sequelize, Sequelize, databaseName),
    CustomerAccountGroup: require("./models/6.customerAccountGroup").init(sequelize, Sequelize, databaseName),
    Company: require("./models/7.company").init(sequelize, Sequelize, databaseName),
    TaxClass: require("./models/8.taxclass").init(sequelize, Sequelize, databaseName),
    Occupation: require("./models/9.occupation").init(sequelize, Sequelize, databaseName),
    Customer: require("./models/10.customer").init(sequelize, Sequelize, databaseName),
    CustomerDetails: require("./models/11.customerDetails").init(sequelize, Sequelize, databaseName),
    CustomerFinance: require("./models/12.customerFinance").init(sequelize, Sequelize, databaseName),
    CustomerContact: require("./models/13.customerContact").init(sequelize, Sequelize, databaseName),
    EmploymentSector: require("./models/14.employmentSector").init(sequelize, Sequelize, databaseName),
    Industry: require("./models/15.industry").init(sequelize, Sequelize, databaseName),
    AnnualIncome: require("./models/16.annualIncome").init(sequelize, Sequelize, databaseName),
    MaritalStatus: require("./models/17.maritalStatus").init(sequelize, Sequelize, databaseName),
    Branch: require("./models/18.branch").init(sequelize, Sequelize, databaseName),
    BusinessStream: require("./models/19.businessStream").init(sequelize, Sequelize, databaseName),
    StorageLocation: require("./models/20.storageLocation").init(sequelize, Sequelize, databaseName),
    BusinessType: require("./models/21.businessType").init(sequelize, Sequelize, databaseName),
    BranchBusinessStream: require("./models/22.branchBusinessStream").init(sequelize, Sequelize, databaseName),
    BranchBusinessType: require("./models/23.branchBusinessType").init(sequelize, Sequelize, databaseName),
    CompanyBranch: require("./models/24.companyBranch").init(sequelize, Sequelize, databaseName),
    Storage: require("./models/25.storage").init(sequelize, Sequelize, databaseName),
    
    EmploymentStatus: require("./models/27.employmentStatus").init(sequelize, Sequelize, databaseName),
    CustomerType: require("./models/28.customerType").init(sequelize, Sequelize, databaseName),
    DealerGroup: require("./models/29.dealerGroup").init(sequelize, Sequelize, databaseName),
    
    BranchRoutes: require("./models/31.branchRoutes").init(sequelize, Sequelize, databaseName),
    CalendarIndicator: require("./models/32.calendarIndicator").init(sequelize, Sequelize, databaseName),
    CustomerCorrespondenceAddress: require("./models/33.customerCorrespondenceAddress").init(sequelize, Sequelize, databaseName),
    CustomerRemarks: require("./models/34.customerRemarks").init(sequelize, Sequelize, databaseName),
    CustomerTags: require("./models/35.customerTags").init(sequelize, Sequelize, databaseName),
    BranchMakeBusinessType: require("./models/36.branchMakeBusinessTypes").init(sequelize, Sequelize, databaseName),
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(models));

// Init ElasticSearch - Calling a function to create the indices
CustomerES.createTableOrIndex();

const db = {
    ...models,
    sequelize
};

module.exports = db;