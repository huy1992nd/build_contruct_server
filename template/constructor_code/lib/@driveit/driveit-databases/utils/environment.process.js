//get environment variables from storage and set it in env
const googleStorage = require('./storage.googlecloud');

async function processEnvironmentVariables() {

    let databaseAccount;

    console.info('Environment variable process: ' + process.env.NODE_ENV);

    if (process.env.NODE_ENV === 'development-local') {
        process.env.databaseAccount = await googleStorage.readFile('keys-store', 'driveit/databaseAccount.json');
        /** For testing SIT locally */
        // const test = {
        //     username: "proxyuser",
        //     password: "P@ssw0rd@#1",
        //     options: {
        //         host: "localhost",
        //         port: 90,
        //         dialect: "mysql",
        //         logging: false,
        //         dialectOptions: {
        //             socketPath: "/cloudsql/driveit-sit:asia-southeast1:tc3s-master"
        //         }
        //     }
        // };
        // process.env.databaseAccount = JSON.stringify(test);
        
    } else {

        databaseAccount = {
            "database" : process.env.DB_NAME,
            "username": process.env.DB_USER_NAME,
            "password": process.env.DB_PASS,
            "options": {
                "host": process.env.DB_HOST,
                "port": parseInt(process.env.DB_PORT),
                "dialect": process.env.DB_DIALECT,
                "logging": false,
                "dialectOptions": {
                    "socketPath": process.env.DB_SOCKET_PATH
                }
            }
        };

        process.env.databaseAccount = JSON.stringify(databaseAccount);
    }

}

module.exports = {
    processEnvironmentVariables
}