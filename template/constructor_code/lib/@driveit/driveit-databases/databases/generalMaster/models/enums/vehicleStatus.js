/*jshint esversion: 9 */
const EnumKeys = {
    SUCCESS: 'success',
    DUPLICATE: 'duplicate',
    PENDING: 'pending',
    EXIST: 'Yes',
    NOTEXIST: 'No'
};

const EnumInventoryKeys = {
    EXIST: 'Yes',
    NOTEXIST: 'No'
};

module.exports = {
    ...EnumKeys,
    ...EnumInventoryKeys,
    status: [
        EnumKeys.DUPLICATE,
        EnumKeys.SUCCESS,
        EnumKeys.PENDING,
        EnumInventoryKeys.EXIST,
        EnumInventoryKeys.NOTEXIST,
    ],

};