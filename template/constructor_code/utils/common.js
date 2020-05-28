const request = require('request');
var obj = {};
const main = require('../config/main');
// generate TAC code
obj.generateTacCode= ()=>{
    return Math.random().toString().slice(2,8);
}

obj.generateUUID = function () {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};
obj.getTotalFeeOfJob = (job) => {
    let totallFeeService = job.totallFeeService? job.totallFeeService : 0;
    let feeTime = job.feeTime? job.feeTime : 0;
    let feeDistance = job.feeDistance? job.feeDistance : 0;
    let adjustCost = job.adjustCost ? job.adjustCost : 0;
    let adjFeeServiceTime = job.adjFeeServiceTime ? job.adjFeeServiceTime : 0;
    let adjFeeDistance = job.adjFeeDistance ? job.adjFeeDistance : 0;
    let cancellationFee = job.cancellationFee ? job.cancellationFee : 0;
    return totallFeeService + feeTime + feeDistance + adjustCost + adjFeeServiceTime+ adjFeeDistance + cancellationFee;

}
obj.distinctListObjecs = function (array) {
    let listResult = [];
    if (array.length > 0) {
        array.forEach(function (item) {
            let listStr = JSON.stringify(listResult);
            let itemStr = JSON.stringify(item);
            if (!listStr.includes(itemStr)) {
                listResult.push(item);
            };
        })
    }
    return listResult;
};
obj.paging = function (list, page = 1, per_page = 20) {
    let startIndex = per_page * (page - 1);
    let endIndex = startIndex + per_page;
    let total = list.length;
    if (endIndex > total) {
        endIndex = total;
    }
    return list.slice(startIndex, endIndex);
}
obj.escape = function (str) {
    return str.replace(/([<>*()'"`%$?])/g, "\\$1");
}
obj.getNumber = (strInput) => {
    return strInput.replace(/\D/g, '');
}
obj.getDistance = (currentLocation, workshops) => {
    let destinationList = [];
    workshops.forEach(w => {
        let destination = `${w.lat}, ${w.long}`
        destination += w.lat
    })
    distance.get(
        {
            origins: [`${currentLocation.lat}, ${currentLocation.long}`],

            destinations: ['San Diego, CA', 'Seattle, WA']
        },
        function (err, data) {
            if (err) return console.log(err);
            console.log(data);
        });
}
obj.isJson = (str) => {
    // console.log(str);
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
obj.getDataFromRedis = async (redis, key) => {
    return new Promise((resolve, reject) => {
        redis.get(key, (err, data) => {
            if (err)
                reject(err);
            else {
                resolve(data);
            }
        })
    })
}

obj.telnet = async (tcpp, server, port) => {
    return new Promise((resolve, reject) => {
        tcpp.probe(server, port, (err, data) => {
            if (err)
                reject(err);
            else {
                resolve(data);
            }
        })
    })
}

obj.ping = async (tcpp, server, port) => {
    return new Promise((resolve, reject) => {
        tcpp.ping({ address: server, port: port }, (err, data) => {
            if (err)
                reject(err);
            else {
                resolve(data);
            }
        })

    })
}
// obj.getUserInform = async (req, res) =>
obj.getUserInform = (req, res) => {
    return new Promise((resolve, reject) => {
        const options = {
            url: `${main.URL_SERVICE_AUTHEN}/auth/api/user`,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': req.headers.authorization
            },
        };

        request(options, function (err, response, body) {
            if (err) reject(err);
            else resolve(body);
        });
    })
}
// with value 1, lengt 6 => 000001
obj.transform = (value, length, prefix) => {
    if (length && !isNaN(length)) {
        length = parseInt(length);
        let sign = Math.sign(value) === -1 ? '-' : '';
        value = sign + new Array(length).concat([Math.abs(value)]).join('0').slice(-length);
    }
    if (prefix)
        value = prefix + value;
    return value;
}

// obj.getUserInform = async (req, res) =>
obj.getListManagers = () => {
    return new Promise((resolve, reject) => {
        // 'Authorization': req.headers.authorization
        const options = {
            url: `${main.URL_SOCKET}/socket/api/user/getUserWithRoleManager`,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        };
        request(options, function (err, response, body) {
            if (err) reject(err);
            else resolve(body);
        });
    })
}

// convert string to Date Time with format receive from client: 'dd/mm/yyyy'
obj.converDate = (strDate, todateConvert) => {
    try {
        let items = strDate.split('/');

        if (items
            && items.length === 3
            && items[0].length === 2
            && items[1].length === 2
            && items[2].length === 4) {
            let date = new Date(`${items[1]}-${items[0]}-${items[2]}`);
            if (todateConvert) {
                date.setDate(date.getDate() + 1);
            }
            return date;
        } else {
            return null;
        }
    } catch (ex) {
        console.log(ex);
        return null;
    }

}
obj.timeBetweenDate = function (date1, date2) {
    //Get 1 min in milliseconds
    var one_min = 1000 * 60;
    var one_hour = one_min * 60;
    var one_day = one_hour * 24;
    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;
    let diffence_d = difference_ms / one_day;
    if (diffence_d && diffence_d >= 1) {
        return {days: Number.parseFloat(diffence_d.toFixed(2))};
    } else {
        let diffence_hour = difference_ms / one_hour;
        if (diffence_hour && diffence_hour >= 1) {
            return {hours: Number.parseFloat(diffence_hour.toFixed(2))};
        }
        else {
            let diffence_m = difference_ms / one_min;
            return {mins: Number.parseFloat(diffence_m.toFixed(2))};
        }
    }
}
obj.isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
module.exports = obj;
