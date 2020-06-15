/**
 * Created by nguyen.quang.huy on 22/5/2020.
 */
const SequelizeAuto = require('sequelize-auto');
class parseMysql {
    constructor() {}

    generateModel(){

        try {
            var auto = new SequelizeAuto('test', 'toanpk', 'abc@123456-', {
                host: '35.187.243.177',
                dialect: 'mysql',
                directory: false, // prevents the program from writing to disk
                port: '3306',
                output: './models',
                additional: {
                    timestamps: false
                },
                // tables: ['rooms', 'users']
            });
            auto.run(function (err) {
                if (err) throw err;
                console.log("table list",JSON.stringify(auto.tables)); // table list
                console.log("foreign key list",JSON.stringify(auto.foreignKeys)); // table list
              });
        } catch (error) {
            console.log('error', error);
        }
        
    }
}

let p =  new parseMysql();
p.generateModel();