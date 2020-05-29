const EnumKeys = {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
    PENDING: 'pending'
}

const UploadStatus = {
    SUCCESS: 'success',
    FAILED: 'failed'
}

const VehicleStatusEnum={
    NEW:'new',
    ALLOCATED:'allocated',
    RELEASEWIP:'releaseWIP',
    RELEASE:'released',
    ASSIGNED:'assigned',
    WIP:'wip',
    COMPLETED:'completed',
    PREDELIVERY:'pre-delivery',
    SHIPPING:'shipping',
    DELIVERED:'delivered',
    SOLD:'sold',
    PENDINGTRANSFER: 'pending-transfer',
    TRANSFERRING: 'transferring',
    PENDINGDELIVERY: 'pending-delivery',
    DELIVERING: 'delivering',
    ADHOC: 'adhoc',
    ORDERED: 'ordered',
    GOODRETURN: 'goodreturn'
}

const vdcStatusEnum = {
    TAGGED: 'tagged',
    CARWASHCOMPLETE: 'carwashcomplete',
    STDACCSFITMENTCOMPLETE: 'stdaccsfitmentcomplete',
    OPTACCSFITMENTCOMPLETE: 'optaccsfitmentcomplete',
    PDICWIP: 'pdicwip',
    PDICCOMPLETE: 'pdiccomplete',
    RESETTAG: 'resettag',
    PLOT4_IN: 'plot4_in',
    PLOT4_OUT: 'plot4_out',
    ORDERED: 'ordered',
    GOODRETURN: 'goodreturn',
    EXIT: 'exit',
    RECTIFIED: 'rectified',
    COMPLETED:'completed',
}

const StreamSource={
    SALES:'sales',
    SERVICE:'service'
}

const typeVehicleUploadFunction={
    SHARED:'shared',
    SALES:'sales',
    SERVICE: 'service'
}

module.exports = {
    ...EnumKeys,
    uploadStatus: [UploadStatus.SUCCESS,UploadStatus.FAILED],
    status: [EnumKeys.ENABLED, EnumKeys.DISABLED, EnumKeys.PENDING],
    VehicleStatusEnum,
    vehicleStatus: Object.values(VehicleStatusEnum),
    streamSource: Object.values(StreamSource),
    vdcStatus: Object.values(vdcStatusEnum),
    typeVehicleUploadFunction: Object.values(typeVehicleUploadFunction)
}