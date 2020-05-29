const databaseAccount = JSON.parse(process.env.databaseAccount ? process.env.databaseAccount : '{}');

let options = databaseAccount.options;

if (process.env.NODE_ENV === 'development-local') {

  delete options.dialectOptions;
  // options.port = 90;
}

module.exports = {
  username: databaseAccount.username,
  password: databaseAccount.password,
  database: databaseAccount.database,
  ...options
};