import * as sequelize from "sequelize";
export declare class ModelWithPublisher extends sequelize.Model {
    static create(values: any, options: any): any;
    static update(values: any, options: any): any;
    static destroy(options: any): any;
    static bulkCreate(dataArr: any, options?: {}): any;
}
export declare function publishData(database: any, data: any): void;
