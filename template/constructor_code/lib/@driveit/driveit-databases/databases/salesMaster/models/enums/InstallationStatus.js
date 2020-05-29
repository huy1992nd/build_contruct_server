const EnumKeys = {
    WIP: 'wip',
    INSTALLED: 'installed',
    NOTFITTED: 'not_fitted'
}

module.exports = {
    ...EnumKeys,
    status: Object.values(EnumKeys)
}