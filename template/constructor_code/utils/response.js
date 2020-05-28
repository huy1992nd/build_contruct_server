exports.responsePaging = (code, message, data, count) => {
    return {
        code: code,
        message : message,
        data : data,
        count: count
    }
}
exports.responseNormal = (code, message, data) => {
    return {
        code: code,
        message : message,
        data : data
    }
}
exports.responseError = (message, error) => {
    return {
        message : message,
        error : error
    }
}