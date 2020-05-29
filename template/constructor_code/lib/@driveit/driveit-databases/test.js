process.env.NODE_ENV = 'development-local';
process.env.TEST = 'true';

// const runMigration = require('./utils/database.utils').runMigration;
const processEnvironmentVariables = require('./index').processEnvironmentVariables;
const {
    authSyncDatabase,
    deleteDatabase
} = require('./utils/database.utils');
const importFresh = require('import-fresh');

processEnvironmentVariables().then(async () => {


    console.info("Database info: ", process.env.databaseAccount);

    const databases = [
        './databases/auth',
        './databases/customerMaster',
        './databases/generalMaster',
        './databases/notificationMaster',
        './databases/salesMaster',
        './databases/serviceMaster',
        './databases/specMaster',
        './databases/pricingMaster',
        './databases/tradeinMaster',
    ];

    
    // const force = false; // Default is false. WARNING: THIS WILL DELETE ALL DATA if set to true
    const runMi = true; // change this to true test migration, false to skip
    const newEnvironment = false;
    const runInitTest = (process.env.NODE_ENV === 'development-local') || false;
    let results = {};
    if (runInitTest) {
        results.initializationTest = await testDatabasesInit(databases, runMi, newEnvironment);
    }

    results.migrationTest = await testDatabases(databases,  false, runMi, newEnvironment);
    console.log("Full results: ", results);
    console.info("Testing done.");
})

async function testDatabases(dbPaths, force, runMi, newEnvironment) {
    console.log("force: " , force);
    const results = [];
    for (const dbPath of dbPaths) {
        // console.log("Running test for database: " , db.sequelize.config.database);
        const db = importFresh(dbPath);

        console.log("db: ", db);
        await authSyncDatabase(db, {
            runMigration: runMi,
            runSyncBackground: false,
            force,
            newEnvironment,
        }).then((migrationResults) => {
            // console.log("Successfully sync database: ", db.sequelize.config.database, " MigrationStatus: " , migrationResults.migrationStatus.status);
            results.push("Successfully sync database: " + db.sequelize.config.database 
            + " ~ MigrationStatus: " + migrationResults.migrationStatus.status 
            + (migrationResults.migrationStatus.status == "FAILED" ? (" ~ ERROR: " + migrationResults.migrationStatus.error) : ""));
        }).catch((error) => {
            // console.log("Failed sync database: ", db.sequelize.config.database, error);
            results.push("Failed sync database: " + db.sequelize.config.database);
        });
        delete db;

    }

    return results;
}

async function testDatabasesInit(dbPaths, runMi, newEnvironment) {
    const force = false;

    const results = [];
    process.env.dbtest = 'test_';
    for (const dbPath of dbPaths) {
        // console.log("Running test for database: " , db.sequelize.config.database);
        const db = importFresh(dbPath);

        await authSyncDatabase(db, {
            runMigration: runMi,
            runSyncBackground: false,
            force,
            newEnvironment,
        }).then(() => {
            console.log("Successfully sync database: ", db.sequelize.config.database);
            results.push("Successfully sync database: " + db.sequelize.config.database);
        }).catch((error) => {
            console.log("Failed sync database: ", db.sequelize.config.database, error);
            results.push("Failed sync database: " + db.sequelize.config.database);
        }).then(() => {
            //drop database
            deleteDatabase(process.env.databaseAccount, db.sequelize.config.database);
        });
        delete db;

    }
    delete process.env.dbtest;
    return results;
}