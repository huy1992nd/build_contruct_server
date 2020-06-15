/**
 * Created by nguyen.quang.huy on 22/5/2020.
 */
const js_beautify = require('js-beautify').js;
const g_define = require('../define');
const fse = require('fs-extra');
const fs = require('fs');
const SequelizeAuto = require('sequelize-auto');
var pluralize = require('pluralize');
class Helper {
    constructor() {
    }

    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    parseDatabase(list_env, project_name) {
        return new Promise(async (resolve, reject) => {

            try {
                let dbInfor = list_env[0].db_connect;
                let output = g_define.PATH.FOLDER.MODEL_RENDER + project_name;
                await fse.ensureDir(output);
                await fse.emptyDir(output);
                var auto = new SequelizeAuto(dbInfor.database, dbInfor.username, dbInfor.password, {
                    host: dbInfor.host,
                    dialect: dbInfor.dialect,
                    directory: output, // prevents the program from writing to disk
                    port: output.port ? output.port : '3306',
                    output: output,
                    additional: {
                        timestamps: true
                    }
                });
                auto.run(function (err) {
                    if (err) throw err;
                    let list_table = Object.keys(auto.tables).map(table_name => {
                        return table_name;
                    });
                    let list_associate = {};
                    Object.keys(auto.foreignKeys).forEach(table => {
                        Object.keys(auto.foreignKeys[table]).forEach(field => {
                            let field_info = auto.foreignKeys[table][field];
                            if (field_info.isForeignKey && field_info.foreignSources) {
                                let table_to = field_info.foreignSources.target_table;
                                if (list_associate[table] == undefined) {
                                    list_associate[table] = {
                                        "belongsTo": [],
                                        "hasMany": []
                                    };
                                }
                                if (list_associate[table_to] == undefined) {
                                    list_associate[table_to] = {
                                        "belongsTo": [],
                                        "hasMany": []
                                    };
                                }
                                list_associate[table].belongsTo.push({
                                    foreignKey: field_info.foreignSources.source_column,
                                    table_to
                                });
                                list_associate[table_to].hasMany.push({
                                    foreignKey: field,
                                    targetKey: field_info.foreignSources.target_column,
                                    table_to: table
                                });
                            }
                        });
                    });
                    let list_table_singular = [];
                    let list_field = {
                    };
                    list_table.forEach(table_name => {
                        list_table_singular.push(pluralize.singular(table_name));
                        list_field[table_name] = Object.keys(auto.tables[table_name]);
                    })
                    resolve({
                        list_table,
                        list_table_singular,
                        list_field,
                        list_associate
                    })
                });
            } catch (error) {
                reject(error)
            }
        })
    }

    removeFolder(project_name) {
        return new Promise((resolve, reject) => {
            try {
                fse.emptyDir(g_define.PATH.FOLDER.TMP.PROJECT + project_name)
                    .then(() => {
                        resolve(true);
                    })
                    .catch(err => reject(err))
            } catch (error) {
                reject(error);
            }
        })
    }

    cloneFolder(project_name) {
        return new Promise((resolve, reject) => {
            try {
                fse.copy(g_define.PATH.FOLDER.TEMPLATE.PROJECT, g_define.PATH.FOLDER.TMP.PROJECT + project_name)
                    .then(() => {
                        resolve(true)
                    })
                    .catch(err => reject(error))
            } catch (error) {
                reject(error);
            }
        })
    }

    getContentFileTemplate(path_file) {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(path_file, { encoding: 'utf-8' }, (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                        console.log(err);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    replaceFileContent(content, list_atribute) {
        Object.keys(list_atribute).forEach((key) => {
            let search = `***${key}***`;
            content = content.split(search).join(list_atribute[key]);
        });
        return content;
    }

    createFolderIfNotExit(dir) {
        return new Promise((resolve, reject) => {
            try {
                fse.ensureDir(dir)
                    .then(() => {
                        resolve(true);
                    })
                    .catch(err => {
                        reject(err)
                    })
            } catch (error) {
                reject(error)
            }
        });
    }

    saveFile(content, path_file_save, file) {
        console.log('path_file_save', path_file_save);
        return new Promise(async (resolve, reject) => {
            try {
                if (file.type == "json") {
                    await fs.writeFile(path_file_save, JSON.stringify(content, null, 4), (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(true);
                            console.log('The file' + path_file_save + ' has been saved!');
                        }
                    });
                } else {
                    const data = new Uint8Array(Buffer.from(js_beautify(content, { indent_size: 4, space_in_empty_paren: true })));
                    fs.writeFile(path_file_save, data, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(true);
                            console.log('The file' + path_file_save + ' has been saved!');
                        }
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    upFirst(input){
        return input.charAt(0).toUpperCase() + input.slice(1);
    }
}

module.exports = new Helper();

