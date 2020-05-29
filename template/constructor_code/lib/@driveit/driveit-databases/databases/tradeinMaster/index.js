const Sequelize = require("sequelize");
const databaseName = (process.env.dbtest ? process.env.dbtest : "") + "tradein_master"
// const config = utils.getConfig(['/opt/environment/config/environment.json', 'config']);
// const databaseName = (process.env.dbtest ? process.env.dbtest : "") + require('config').db.dbname; 

const databaseAccount = JSON.parse(process.env.databaseAccount);
console.info(`new instance of sequelize with config - dbname: ${databaseName} - username: ${databaseAccount.username} - dialect: ${databaseAccount.options.dialect}`);

let options = databaseAccount.options;

if (process.env.NODE_ENV === 'development-local') {
    delete options.dialectOptions;
    // options.port=90;
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

    uv_purpose: require("./models/01.uv_purpose").init(sequelize, databaseName),
    uv_condition: require("./models/02.uv_condition").init(sequelize, databaseName),
    uv_cond_section: require("./models/03.uv_cond_section").init(sequelize, databaseName),
    uv_cond_reason: require("./models/04.uv_cond_reason").init(sequelize, databaseName),
    uv_price_item: require("./models/05.uv_price_item").init(sequelize, databaseName),
    uv_price_channel: require("./models/06.uv_price_channel").init(sequelize, databaseName),
    uv_status: require("./models/07.uv_status").init(sequelize, databaseName),
    uv_tyre_area: require("./models/08.uv_tyre_area").init(sequelize, databaseName),
    uv_specification: require("./models/09.uv_specification").init(sequelize, databaseName),
    uv_file_upload: require("./models/10.uv_file_upload").init(sequelize, databaseName),
    echecklists: require("./models/11.echecklists").init(sequelize, databaseName),
    echecklist_spec: require("./models/12.echecklist_spec").init(sequelize, databaseName),
    echecklist_attachement: require("./models/13.echecklist_attachement").init(sequelize, databaseName),
    echecklist_inspection: require("./models/14.echecklist_inspection").init(sequelize, databaseName),
    echecklist_tyre_thread: require("./models/15.echecklist_tyre_thread").init(sequelize, databaseName),
    echecklist_condlists: require("./models/16.echecklist_condlists").init(sequelize, databaseName),
    echecklist_conddetails: require("./models/17.echecklist_conddetails").init(sequelize, databaseName),
    echecklist_priceguide: require("./models/18.echecklist_priceguide").init(sequelize, databaseName),
    uv_file_upload_config: require("./models/19.uv_file_upload_config").init(sequelize, databaseName),
    uv_role: require("./models/20.uv_role").init(sequelize, databaseName),
    uv_role_function: require("./models/21.uv_role_function").init(sequelize, databaseName),
    uv_route: require("./models/22.uv_route").init(sequelize, databaseName),
    uv_email_group: require("./models/23.uv_email_group").init(sequelize, databaseName),
    uv_email_list: require("./models/24.uv_email_list").init(sequelize, databaseName),
    uv_email_config: require("./models/25.uv_email_config").init(sequelize, databaseName),
    uv_expenses: require("./models/26.uv_expenses").init(sequelize, databaseName),
    uv_price_config: require("./models/27.uv_price_config").init(sequelize, databaseName),
    edisposals: require("./models/28.edisposals").init(sequelize, databaseName),
    edisposal_route: require("./models/29.edisposal_route").init(sequelize, databaseName),
    edisposal_email: require("./models/30.edisposal_email").init(sequelize, databaseName),
    edisposal_priceguide: require("./models/31.edisposal_priceguide").init(sequelize, databaseName),
    edisposal_proposal: require("./models/32.edisposal_proposal").init(sequelize, databaseName),
    edisposal_expenses: require("./models/33.edisposal_expenses").init(sequelize, databaseName),
    edisposal_log: require("./models/34.edisposal_log").init(sequelize, databaseName),
    addresses: require("./models/35.addresses").init(sequelize, databaseName),
    edisposal_cycle: require("./models/36.edisposal_cycle").init(sequelize),
    edisposal_attachement: require("./models/37.edisposal_attachement").init(sequelize),
    edisposal_emailrecipient: require("./models/38.edisposal_emailrecipient").init(sequelize),
    uv_route_config: require("./models/39.uv_route_config").init(sequelize)
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