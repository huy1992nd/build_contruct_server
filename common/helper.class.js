/**
 * Created by nguyen.quang.huy on 22/5/2020.
 */
const js_beautify = require('js-beautify').js;
const g_define = require('../define');
const fse = require('fs-extra');
const fs = require('fs')
class Helper {
    constructor() {
    }

    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
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
            content =  content.split(search).join(list_atribute[key]);
        });
        return content;
    }

    createFolderIfNotExit(dir){
        return new Promise((resolve, reject)=>{
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
                if(file.type == "json"){
                    await fs.writeFile(path_file_save, JSON.stringify(content, null, 4), (err) => {
                        if(err) {
                            reject(err);
                        } else {
                            resolve(true);
                            console.log('The file'+path_file_save+' has been saved!');
                        }
                    }); 
                }else{
                    const data = new Uint8Array(Buffer.from(js_beautify(content, { indent_size: 2, space_in_empty_paren: true })));
                    fs.writeFile(path_file_save, data, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(true);
                            console.log('The file'+path_file_save+' has been saved!');
                        }
                    });
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = new Helper();

