const EnumKeys = require('./EnumKeys');
module.exports = {
    ...EnumKeys,
    status: [EnumKeys.ENABLED, EnumKeys.DISABLED, EnumKeys.PENDING],
    roles: [EnumKeys.VISITOR, EnumKeys.EDITOR, EnumKeys.ADMIN, EnumKeys.NO_ACCESS]

} 