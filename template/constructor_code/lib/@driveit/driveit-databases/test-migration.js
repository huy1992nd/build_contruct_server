process.env.NODE_ENV = 'development-local';
process.env.TEST = 'true';

// const runMigration = require('./utils/database.utils').runMigration;
const processEnvironmentVariables = require('./index').processEnvironmentVariables;

processEnvironmentVariables().then(() => {
    const authSyncDatabase = require('./utils/database.utils').authSyncDatabase;

    console.info("Database info: ", process.env.databaseAccount);


    const auth = require('./databases/auth');
    authSyncDatabase(auth, {runMigration: true}).then(() => {
        console.log("success run auth sync");
    });    
    console.log("auth passed.")


    console.info("Testing done.");
})