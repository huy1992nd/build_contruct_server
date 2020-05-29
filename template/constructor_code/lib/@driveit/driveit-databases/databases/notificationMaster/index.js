const Sequelize = require("sequelize");
const databaseName = (process.env.dbtest ? process.env.dbtest : "") + "notification_master"

const databaseAccount = JSON.parse(process.env.databaseAccount);
console.info(`new instance of sequelize with config - dbname: ${databaseName} - username: ${databaseAccount.username} - dialect: ${databaseAccount.options.dialect}`);

let options = databaseAccount.options;

if(process.env.NODE_ENV === 'development-local'){
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
    Notification: require("./models/01.notification").init(sequelize, Sequelize, databaseName),
    NotificationSchedule: require("./models/02.notificationSchedule").init(sequelize, Sequelize, databaseName),
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