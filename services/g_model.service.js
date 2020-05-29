var GenerateService = require('./generate.service');
const Helper = require('../common/helper.class');
const FILE_NAME = 'default.json';
const g_define = require('../define');
class GModelService extends GenerateService {
    constructor(data, project) {
        super(data, project);
        this.type = 'model';
    }

    // @Overide
    OnInitListFile() {
        return new Promise((resolve, reject) =>{
            try {
                this.listFile = [];
                this.data.forEach((item, index)=>{
                    let file_item = {
                        id : index,
                        type : "js",
                        data_config : {
                            "table": item.table.charAt(0).toUpperCase() + item.table.slice(1),
                            "field": this.generateField(item.fields),
                            "associate": this.generateAssociate(item.associate, item.table.charAt(0).toUpperCase() + item.table.slice(1)),
                        },
                        template_file_name : "model.txt",
                        name : item.table + ".js",
                        dir_save : g_define.PATH.FOLDER.TMP.PROJECT+this.project.name+"/models/",
                    }
                    this.listFile.push(file_item);
                });
                resolve(true);
            } catch (error) {
                reject(error);
            }
        })
    }

    // Private
    generateField(list_field){
        list_field["createdBy"] = {
            type: "DataTypes.INTEGER"
        }
        list_field["updatedBy"] = {
            type: "DataTypes.INTEGER"
        }
        list_field["createdAt"] = {
            type: "DataTypes.DATE",
            defaultValue: "sequelize.literal('NOW()')"
        }
        list_field["updatedAt"] = {
            type: "DataTypes.DATE",
            defaultValue: "sequelize.literal('NOW()')"
        }
        list_field["deleted"] = {
            type: "DataTypes.BOOLEAN",
            allowNull: true,
            defaultValue: false
        }
        return JSON.stringify(list_field)
            .replace(/"DataTypes/g,"DataTypes")
            .replace(/"sequelize/g,"sequelize")
            .replace(/","/g,",\"")
            .replace(/"}/g,"}");
    }

    generateAssociate(list_associate, table){
        let result = 
        list_associate.map(item=>{
            return `
            ${table}.${item.relationship}(models.${item.to}, {
                foreignKey: '${item.foreignKey}'
              })
            `;
        }).join(`,
        `);
        return `{${result}}`;
    }
}

module.exports = GModelService;