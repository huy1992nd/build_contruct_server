const enumKeys = require('./EnumKeys');

module.exports = {
    ...enumKeys,
    status: [enumKeys.ENABLED, enumKeys.DISABLED],
}