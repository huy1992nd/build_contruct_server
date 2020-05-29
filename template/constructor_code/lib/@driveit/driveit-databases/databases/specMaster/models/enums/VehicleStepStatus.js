const EnumKeys = {
    CARWASH: 'car_wash',
    PDICIN: 'pdic_in',
    PDICCOMPLETE: 'pdic_complete',
    PLOT4IN: 'plot4_in',
    PLOT4OUT: 'plot4_out',
    FGIN: 'fg_in',
    EXIT: 'exit'
}

module.exports = {
    ...EnumKeys,
    status: [
        EnumKeys.CARWASH, EnumKeys.PDICIN, EnumKeys.PDICCOMPLETE,
        EnumKeys.PLOT4IN, EnumKeys.PLOT4OUT, EnumKeys.FGIN,
        EnumKeys.EXIT
    ]
}