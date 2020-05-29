const Sequelize = require("sequelize");

const databaseAccount = JSON.parse(process.env.databaseAccount);
const databaseName = (process.env.dbtest ? process.env.dbtest : "") + "auth"

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
    InternalUsers: require("./models/internalUsers").init(sequelize, databaseName),
    InternalUsersTenants: require("./models/internal_users_tenants").init(sequelize, databaseName),
    Tenants: require("./models/tenants").init(sequelize, databaseName),
    Tags: require("./models/tags").init(sequelize, databaseName),
    EmployeePosition: require('./models/employeePosition').init(sequelize, databaseName),
    EmployeeType: require('./models/employeeType').init(sequelize, databaseName),
    TenantTagRelation: require('./models/tenantTagRelation').init(sequelize, databaseName),
    Employees: require('./models/employees').init(sequelize, databaseName),
};

// Run `.associate` if it exists,
// ie create relationships in the ORM      
Object.values(models)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(models));

//Adding user for OFFICE SALE (HARD CODE)
if(!process.env.dbtest){ //inser only if not in test mode
    models.InternalUsers.upsert({
        id: 'OFFICE_SALE',
        fullName: 'OFFICE SALE',
        role: 'no-access',
        createdBy: 'ADMIN',
        updatedBy: 'ADMIN'
    })
    models.Employees.upsert({
        id: 'OFFICE_SALE',
        fullName: 'OFFICE SALE',
        role: 'no-access',
        createdBy: 'ADMIN',
        updatedBy: 'ADMIN'
    })
}


const db = {
    ...models,
    sequelize
};

module.exports = db;