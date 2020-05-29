const EnumKeys = require('./EnumKeys');
module.exports = {
    ...EnumKeys,
    status: [EnumKeys.ENABLED, EnumKeys.DISABLED, EnumKeys.PENDING, EnumKeys.DELETED],

}