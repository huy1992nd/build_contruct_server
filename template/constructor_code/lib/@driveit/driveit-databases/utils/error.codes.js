module.exports = {
    ADD_FAILED: {
        status: 400,
        code: "ADD_FAILED",
        message: "Failed to add record"
    },
    UPDATE_FAILED: {
        status: 400,
        code: "UPDATE_FAILED",
        message: "Failed to update record"
    },
    INVALID_PARAMETER: {
        status: 400,
        code: "INVALID_PARAMETER",
        message: "Parameters given are either missing or invalid"
    },
    INVALID_USERINFO: {
        status: 400,
        code: "INVALID_USERINFO",
        message: "Userinfo from token has expired or invalid"
    },
    TOKEN_EXPIRED: {
        status: 401,
        code: "TOKEN_EXPIRED",
        message: "Token session has expired"
    },
    NOT_UNIQUE: {
        status: 400,
        code: "NOT_UNIQUE",
        message: "Record is not unique."
    },
    NOT_FOUND: {
        status: 404,
        code: "NOT_FOUND",
        message: "URL does not exist"
    },
    DATA_NOT_FOUND: {
        status: 404,
        code: "NOT_FOUND",
        message: "Data not found"
    },
    RECORD_NOT_FOUND: {
        status: 400,
        code: "RECORD_NOT_FOUND",
        message: "Record does not exist"
    },
    MASTERDATA_VEHICLE_BOOKING_NOT_FOUND: {
        status: 400,
        code: "MASTERDATA_VEHICLE_BOOKING_NOT_FOUND",
        message: "Vehicle Booking does not exist"
    },
    MASTERDATA_VEHICLE_BOOKING_REFUND_NOT_FOUND: {
        status: 400,
        code: "MASTERDATA_VEHICLE_BOOKING_REFUND_NOT_FOUND",
        message: "Vehicle Booking Refund does not exist"
    },

    MASTERDATA_VEHICLE_BOOKING_TRADE_IN_DETAIL_NOT_FOUND: {
        status: 400,
        code: "MASTERDATA_VEHICLE_BOOKING_TRADE_IN_DETAIL_NOT_FOUND",
        message: "Vehicle Booking Trade In Detail does not exist"
    },

    MASTERDATA_ACCESSORIES_FITMENT_NOT_FOUND: {
        status: 400,
        code: "MASTERDATA_ACCESSORIES_FITMENT_NOT_FOUND",
        message: "Accessories Fitment does not exist"
    },
    MASTERDATA_ACCESSORIES_ITEM_NOT_FOUND: {
        status: 400,
        code: "MASTERDATA_ACCESSORIES_ITEM_NOT_FOUND",
        message: "Accessories Item does not exist"
    },
    MASTERDATA_ACCESSORIES_FITMENT_DOCUMENT_NOT_FOUND: {
        status: 400,
        code: "MASTERDATA_ACCESSORIES_FITMENT_DOCUMENT_NOT_FOUND",
        message: "Accessories Fitment Document does not exist"
    },
    MASTERDATA_ACCESSORIES_DISMANTLE_NOT_FOUND: {
        status: 400,
        code: "MASTERDATA_ACCESSORIES_DISMANTLE_NOT_FOUND",
        message: "Accessories Dismantle does not exist"
    },

    DATABASE_ISSUE: {
        status: 400,
        code: "DATABASE_ISSUE",
        message: "Database issue or invalid query execution."
    },
    END_NUMBER_EXCEEDED: {
        status: 400,
        code: "END_NUMBER_EXCEEDED",
        message: "Current number have exceeded the allowed end number."
    },

    JVS_CALENDAR_NOT_PASSED: {
        status: 400,
        code: "JVS_CALENDAR_NOT_UNIQUE",
        message: "Payroll year can not be a past year."
    },
    JVS_CALENDAR_NOT_UNIQUE: {
        status: 400,
        code: "JVS_CALENDAR_NOT_UNIQUE",
        message: "Payroll year is not unique."
    },
    COMPUTE_PAYROLL_FAILED: {
        status: 400,
        code: "COMPUTE_PAYROLL_FAILED",
        message: "Compute and Extract Payroll fail."
    },
    BRANCH_NOT_FOUND:{
        status: 400,
        code: "BRANCH_NOT_FOUND",
        message: "Please create the Document Number Series"
    }
}