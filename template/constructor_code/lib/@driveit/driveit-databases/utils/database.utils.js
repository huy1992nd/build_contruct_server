const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const migrationPath = require('../databases/migrations-path');
const fs = require('fs');
var _ = require('lodash');
const {
  QueryTypes
} = require('sequelize');

function generateWhereClause(searches) {
  if (!searches) return "";

  let searchQuery = " WHERE ";
  searches.forEach(search => {
    searchQuery +=
      search.colId + " REGEXP " + generateWhereValues(search.text) + " OR ";
  });

  searchQuery = searchQuery.slice(0, -4);

  return searchQuery;
}

function generateWhereValues(text) {
  //Array<text>
  if (!text) return "";

  let searchValue = "";
  text.forEach(value => {
    searchValue += "|" + value;
  });

  if (searchValue && searchValue.length > 0) {
    searchValue = searchValue.substring(1);
    searchValue = "'" + searchValue + "'";
  }

  return searchValue;
}

function getConfig(moduleArr) {
  let requiredModule;
  let error;
  for (let t = 0; t < moduleArr.length; t++) {
    try {
      requiredModule = require(moduleArr[t]);
      if (requiredModule) {
        console.info("Config path used: ", moduleArr[t]);
        return requiredModule;
      }
    } catch (e) {
      error = e;
    }
  }

  throw error;
}

function filterGenerateRawStatement(filters = []) {
  const valueArr = _.cloneDeep(filters);
  let arr = [];
  if (valueArr.length) {
    valueArr.forEach(value => {
      if (value.filterCondition) {

        let rangeAndCondition = [];
        for (let t = 0; t < value.filterCondition.length; t++) {

          let operation = value.filterCondition[t].direction;

          if (
            value.text[t] !== null ||
            (value.text[t] === null && (operation === "eq" || operation === "ne" || operation === "not"))
          ) {
            rangeAndCondition.push({
              [value.colId]: {
                [operation]: value.text[t]
              }
            });
          }

        }

        if (rangeAndCondition.length > 0) {
          arr = _.concat(arr, rangeAndCondition);
        }

      } else if (value.dateTimeRange) {

        let startDateTime = null;
        let endDateTime = null;
        _.forEach(value.dateTimeRange, (val) => {
          if (val.isStart) {
            startDateTime = val.dateTimeValue;
          } else {
            endDateTime = val.dateTimeValue;
          }
        });
        
        if (startDateTime !== null && endDateTime !== null) {
          arr.push({
            [value.colId]: { gte: startDateTime, lte: endDateTime }
          });
        } else {
          if (startDateTime === null && endDateTime !== null) {
            arr.push({
              [value.colId]: { lte: endDateTime }
            });
          } else if (startDateTime !== null && endDateTime === null) {
            arr.push({
              [value.colId]: { gte: startDateTime }
            });
          }
        }

      } else if (value.text) {

        let texts = [];
        let hasNull = false;
        _.forEach(value.text, (singleText) => {
          if (singleText && singleText !== null) {
            texts.push(singleText);
          } else {
            hasNull = true;
          }
        });

        arr.push({
          [value.colId]: {
            in: texts
          }
        });
        if (hasNull) {
          arr.push({
            [value.colId]: {
              is: null
            }
          });
        }

      }
    });
  }

  let prepQry = [];
  if (arr.length > 0) {
    _.forEach(arr, (val) => {
      _.forEach(val, (v, k) => {
        let getValue, getOperation;
        _.forEach(v, (value, operation) => {
          getValue = value;
          getOperation = operation;
        });

        let statemt = ``;
        let tableCol = `A.${k}`;

        switch (getOperation) {
          case "ne":
            statemt += tableCol + `!=` + getValue;
            break;
          case "notIn":
            statemt += tableCol + ` NOT IN(${JSON.stringify(getValue).replace(/[\[\]]/g, "")})`;
            break;
          case "in":
            statemt += tableCol + ` IN(${JSON.stringify(getValue).replace(/[\[\]]/g, "")})`;
            break;
          case "notBetween":
            statemt += tableCol + ` NOT BETWEEN ${getValue[0]} AND ${getValue[1]}`;
            break;
          case Op.between:
            statemt += tableCol + ` BETWEEN ${getValue[0]} AND ${getValue[1]}`;
            break;
          case "not":
            statemt += tableCol + ` IS NOT ${getValue}`;
            break;
          case "is":
            statemt += tableCol + ` IS ${getValue}`;
            break;
          case "eq":
            statemt += tableCol + `=` + getValue;
            break;
          case "lte":
            statemt += tableCol + `<=` + getValue;
            break;
          case "lt":
            statemt += tableCol + `<` + getValue;
            break;
          case "gte":
            statemt += tableCol + `>=` + getValue;
            break;
          case "gt":
            statemt += tableCol + `>` + getValue;
            break;
          case "or":
            break;
          default:
            break;
        }

        if (!_.isEmpty(statemt)) {
          prepQry.push(statemt);
        }

      });
    });

  }

  return prepQry;
}

function filterGenerator(filters = []) {
  const valueArr = _.cloneDeep(filters);
  let arr = [];
  if (valueArr.length) {
    valueArr.forEach(value => {

      if (value.colId.includes(".")) {
        value.colId = '$' + value.colId + '$';
      }

      value.colId = value.colId.replace(/\[0\]/g, '');

      if (value.filterCondition) {

        let rangeAndCondition = [];
        for (let t = 0; t < value.filterCondition.length; t++) {

          let operation = null;
          switch (value.filterCondition[t].direction) {
            case "ne":
              operation = Op.ne;
              break;
            case "notIn":
              operation = Op.notIn;
              break;
            case "in":
              operation = Op.in;
              break;
            case "notBetween":
              operation = Op.notBetween;
              break;
            case "between":
              operation = Op.between;
              break;
            case "not":
              operation = Op.not;
              break;
            case "is":
              operation = Op.is;
              break;
            case "eq":
              operation = Op.eq;
              break;
            case "lte":
              operation = Op.lte;
              break;
            case "lt":
              operation = Op.lt;
              break;
            case "gte":
              operation = Op.gte;
              break;
            case "gt":
              operation = Op.gt;
              break;
            case "or":
              operation = Op.or;
              break;
            default:
              break;
          }

          if (operation !== null) {
            if (
              value.text[t] !== null ||
              (value.text[t] === null && (operation === Op.eq || operation === Op.ne || operation === Op.not))
            ) {
              rangeAndCondition.push({
                [value.colId]: {
                  [operation]: value.text[t]
                }
              });
            }
          }
        }

        if (rangeAndCondition.length > 0) {
          arr = _.concat(arr, rangeAndCondition);
        }

      } else if (value.dateTimeRange) {

        let startDateTime = null;
        let endDateTime = null;
        _.forEach(value.dateTimeRange, (val) => {
          if (val.isStart) {
            startDateTime = val.dateTimeValue;
          } else {
            endDateTime = val.dateTimeValue;
          }
        });
        
        if (startDateTime !== null && endDateTime !== null) {
          arr.push({
            [value.colId]: { [Op.gte]: startDateTime, [Op.lte]: endDateTime }
          });
        } else {
          if (startDateTime === null && endDateTime !== null) {
            arr.push({
              [value.colId]: { [Op.lte]: endDateTime }
            });
          } else if (startDateTime !== null && endDateTime === null) {
            arr.push({
              [value.colId]: { [Op.gte]: startDateTime }
            });
          }
        }

      } else if (value.text) {
        // value.text.forEach(singleText => {

        //   arr.push({
        //     [value.colId]: singleText
        //   });
        // });

        let texts = [];
        let hasNull = false;
        _.forEach(value.text, (singleText) => {
          if (singleText && singleText !== null) {
            texts.push(singleText);
          } else {
            hasNull = true;
          }
        });

        /*    if (value.colId.includes(".")) {
             value.colId = '$' + value.colId + '$';
           } */

        arr.push({
          [value.colId]: {
            [Op.in]: texts
          }
        });
        if (hasNull) {
          arr.push({
            [value.colId]: {
              [Op.is]: null
            }
          });
        }

      }

    });

  }
  return arr;
}

function searchGenerator(valueArr = []) {
  let arr = [];
  if (valueArr.length) {
    valueArr.forEach(value => {

      value.text.forEach(singleText => {
        arr.push({
          [value.colId]: singleText
        });
      });
    });

  }
  return arr;
}

function searchGeneratorV2(searches = []) {
  const valueArr = _.cloneDeep(searches);
  let whereAnd = [];
  if (valueArr && valueArr.length > 0) {
    valueArr.forEach((search) => {
      //this is to fix where clause in child when  subQuery: false,
      //https://stackoverflow.com/questions/42439183/sequelize-associations-causing-sub-query

      if (search.colId.includes(".")) {
        search.colId = '$' + search.colId + '$';
      }
      search.colId = search.colId.replace(/\[0\]/g, '');

      search.text.forEach((text) => {
        let prepQry = {};
        prepQry[search.colId] = {
          [Op.like]: '%' + text + '%'
        };

        whereAnd.push({
          [Op.or]: prepQry
        });
      })


    })
  }

  return whereAnd;
}

function leadingZeros(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

function pickObjectKeysFromArray(array, thingsToPick) {
  return _.map(array, _.partial(_.ary(_.pick, thingsToPick.length), _, thingsToPick));
}

function multiIncludes(values, input) {
  var re = new RegExp(values.join('|'));
  return re.test(input);
}

function checkTextFilter(filter) {
  for (const item of filter) {
    if (item.text && item.text.length && item.text[0] && typeof item.text[0] === "object" && item.text[0].length === 0) {
      item.text = [];
    }
  }
  return filter;
}

async function runMigration(database) {
  //get path
  const databaseName = database.sequelize.config.database;
  console.log("Database name: ", databaseName);
  if (!databaseName) {
    console.warn("WARNING: Migration run failed due to missing database name. Please check migrations-path.js");
    return;
  }

  const migrationPathString = _.get(migrationPath, databaseName);
  console.log("Database migrationPathString: ", migrationPathString);

  if (!migrationPathString) {
    console.warn("WARNING: Migration run failed due to missing migrations path name. Please check migrations-path.js");
    return;
  }
  const databaseAccount = JSON.parse(process.env.databaseAccount);
  let url = " --url 'mysql://" + encodeURIComponent(databaseAccount.username) + ":" +
    encodeURIComponent(databaseAccount.password) + "@" + databaseAccount.options.host + ":" +
    databaseAccount.options.port + "/" + databaseName + "'";


  console.log("Migrating for db: ", process.env.DB_NAME);
  if (!process.env.DB_NAME) {
    process.env.DB_NAME = databaseName;
  }

  if (!databaseAccount.database) {
    databaseAccount.database = databaseName;
    process.env.databaseAccount = JSON.stringify(databaseAccount);
    console.log("Migrating for db changed to: ", process.env.DB_NAME);
  }

  if (!process.env.TEST) {
    console.log("Running non test config js");
    url = " --config " + __dirname + '/config.js';
  }

  console.log("Url path: ", url);
  console.log("data config: ", require('./config'));

  const {
    exec
  } = require('child_process');

  return new Promise((resolve, reject) => {
    const migrate = exec(
      'sequelize db:migrate --migrations-path ' + migrationPathString + url, {
      env: process.env
    },
      (err, stdout, stderr) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
    // Forward stdout+stderr to this process
    migrate.stdout.pipe(process.stdout);
    migrate.stderr.pipe(process.stderr);
  }).then(() => {
    console.info("Successfully run migrations");
    return true;
  }).catch((err) => {
    console.error("FAILED: Migration: ", err);
    throw err;
  });
}


function skipMigration(database) {
  //get path
  const databaseName = database.sequelize.config.database;
  console.log("Skipping database name: ", databaseName);
  if (!databaseName) {
    console.warn("WARNING: Migration run failed due to missing database name. Please check migrations-path.js");
    return;
  }

  const migrationPathString = _.get(migrationPath, databaseName);
  console.log("Database migrationPathString2: ", migrationPathString);

  if (!migrationPathString) {
    console.warn("WARNING: Migration run failed due to missing migrations path name. Please check migrations-path.js");
    return;
  }

  return Promise.resolve().then(() => {
    return database.sequelize.query("CREATE TABLE IF NOT EXISTS `SequelizeMeta` (`name` varchar(255) COLLATE utf8_unicode_ci NOT NULL, PRIMARY KEY (`name`), UNIQUE KEY `name` (`name`))", {
      type: QueryTypes.RAW
    });
  }).then(() => {
    return Promise.all(fs.readdirSync(migrationPathString, {
      withFileTypes: true
    })
      .filter(item => !item.isDirectory())
      .map((item) => {
        console.log("item.name: ", item.name);
        return database.sequelize.query("INSERT INTO SequelizeMeta (name) VALUES (:name) ON DUPLICATE KEY UPDATE name = :name;", {
          replacements: {
            name: item.name
          },
          type: QueryTypes.INSERT
        }).then(() => {
          return "Successfully skipped: " + item.name;
        }).catch((err) => {
          return "Failed to skip migration: " + item.name + ":" + err.message;
        })
      })).then((results) => {
        console.log("skipMigration results: ", results)
        return results;
      }).catch((error) => {
        console.warn("skipMigration failed results: ", error)
        return error;
      })
  })



}

const createDatabase = (databaseAccount, databaseName) => {
  if (!databaseAccount || !databaseName) return false;

  databaseAccount = JSON.parse(databaseAccount);

  if (process.env.NODE_ENV === 'development-local') {
    delete databaseAccount.options.dialectOptions;
  }

  console.log("databaseAccount: ", databaseAccount);
  const mysql = require('promise-mysql');

  return mysql.createConnection({
    user: _.get(databaseAccount, 'username'),
    password: _.get(databaseAccount, 'password'),
    socketPath: _.get(databaseAccount, 'options.dialectOptions.socketPath'),
    host: _.get(databaseAccount, 'options.host'),
    port: _.get(databaseAccount, 'options.port'),
  }).then((connection) => {
    return connection.query(`CREATE DATABASE ${databaseName};`).then((results) => {
      console.log("results from create database: ", results);
      return {
        connection,
        results: true
      };
    }).catch((error) => {
      console.warn("Warning during creating database: ", error.message);
      return {
        connection,
        results: false
      };
    })
  }).then((values) => {
    values.connection.end();
    return values.results;
  })
}

const deleteDatabase = (databaseAccount, databaseName) => {
  if (!databaseAccount || !databaseName) return false;

  databaseAccount = JSON.parse(databaseAccount);

  if (process.env.NODE_ENV === 'development-local') {
    delete databaseAccount.options.dialectOptions;
  }

  console.log("databaseAccount: ", databaseAccount);
  const mysql = require('promise-mysql');

  return mysql.createConnection({
    user: _.get(databaseAccount, 'username'),
    password: _.get(databaseAccount, 'password'),
    socketPath: _.get(databaseAccount, 'options.dialectOptions.socketPath'),
    host: _.get(databaseAccount, 'options.host'),
    port: _.get(databaseAccount, 'options.port'),
  }).then((connection) => {
    return connection.query(`DROP DATABASE ${databaseName};`).then((results) => {
      console.log("results from dropping database: ", results);
      return {
        connection,
        results: true
      };
    }).catch((error) => {
      console.warn("Warning during dropping database: ", error.message);
      return {
        connection,
        results: false
      };
    })
  }).then((values) => {
    values.connection.end();
    return values.results;
  })
}

const authSyncDatabase = async (database, options = {
  runMigration: true,
  runSyncBackground: true,
  logging: false,
  force: false,
  newEnvironment: false,
}) => {

  if (options.runMigration === undefined) options.runMigration = true;
  if (options.runSyncBackground === undefined) options.runSyncBackground = true;
  if (options.runSyncBackground) options.force = false;

  // console.log("database: ", database);
  const sequelize = database.sequelize;

  if (options.logging) {
    sequelize.options.logging = true;
  }

  if (options.runSyncBackground) {
    console.info("Running migration in background...");
    // 
    return Promise.resolve().then(() => {
      setTimeout(function () {
        runDBSequence(database, options);
      }, 10000);
      return {
        sequelize
      }
    })
  } else {
    return runDBSequence(database, options);
  }


}

function runDBSequence(database, options) {
  const sequelize = database.sequelize;

  let isNewDB = false;
  return Promise.resolve().then(() => {
    return createDatabase(process.env.databaseAccount, database.sequelize.config.database).then((results) => {
      isNewDB = results;
    });
  }).then(() => {
    return sequelize.authenticate();
  }).then(() => {

    // console.info('Connection has been established successfully.');
    return sequelize.query('SET FOREIGN_KEY_CHECKS = 0', {
      raw: true
    });

  }).then(() => {
    console.log("options.force: ", options.force, database.sequelize.config.database);

    return sequelize.sync({
      force: options.force
    });
  }).then(() => {
    // console.info('Database syncronized.');
    if (options.newEnvironment || isNewDB) {
      //copy filename from migration folder to SequelizeMeta
      return skipMigration(database);
    }
    return;
  }).then(() => {
    let migrationStatus = {
      status: 'SKIPPED'
    };

    if (options.runMigration) {
      return runMigration(database).then(() => {
        migrationStatus = {
          status: "PASSED"
        }
        return {
          sequelize,
          migrationStatus
        };
      }).catch((err) => {

        migrationStatus = {
          status: "FAILED",
          error: err
        }
        return {
          sequelize,
          migrationStatus
        };
      })
    }

    return {
      sequelize,
      migrationStatus
    };
  })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
      console.error('Please check and validate datastore db values');
      throw err;
    });
}

module.exports = {
  generateWhereClause,
  getConfig,
  filterGenerateRawStatement,
  filterGenerator,
  searchGenerator,
  searchGeneratorV2,
  leadingZeros,
  pickObjectKeysFromArray,
  multiIncludes,
  runMigration,
  authSyncDatabase,
  checkTextFilter,
  deleteDatabase
};

//WHERE interests REGEXP 'sports|pub'