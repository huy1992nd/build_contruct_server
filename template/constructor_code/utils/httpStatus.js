var httpStatus = {
    SUCCESS : 200,
    ALREADY_EXIST :409,
    NOT_FOUND : 404,
    BAD_REQUEST :400,
    SERVER_ERROR :500,
    NOTIFICATION_ERROR :1000,
    PRECONDITION_FAILED :412,
    PERMISSION: 401,

}
module.exports = httpStatus;