const EnumKeys = {
    NEW: 'new',
    WIP: 'wip',
    SCRAP: 'scrap',
    DISMANTLED: 'dismantled'
}

module.exports = {
    ...EnumKeys,
    status: Object.values(EnumKeys)
}