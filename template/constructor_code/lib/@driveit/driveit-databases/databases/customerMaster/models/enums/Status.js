const EnumKeys = {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
    PENDING: 'pending',
    DELETED: 'deleted',
    ACTIVE: 'active',
    INACTIVE: 'inactive'
}

const ColorEnum = {
    GREEN: 'green',
    YELLOW: 'yellow',
    ORANGE: 'orange',
    RED: 'red'
}

module.exports = {
    ...EnumKeys,
    ...ColorEnum,
    status: [EnumKeys.ENABLED, EnumKeys.DISABLED, EnumKeys.PENDING, EnumKeys.DELETED, EnumKeys.ACTIVE, EnumKeys.INACTIVE],
    colors: [ColorEnum.GREEN, ColorEnum.YELLOW, ColorEnum.ORANGE, ColorEnum.RED]
}