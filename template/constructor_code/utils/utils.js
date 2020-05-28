function toCamel(o) {
  let newO, originKey, newKey, value;
  if (o instanceof Array) {
    newO = []
    for (origKey in o) {
      value = o[origKey]
      if (typeof value === "object") {
        value = toCamel(value)
      }
      newO.push(value)
    }
  } else {
    newO = {}
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString()
        value = o[origKey]
        if (value !== null && value.constructor === Object) {
          value = toCamel(value)
        }
        newO[newKey] = value
      }
    }
  }
  return newO;
};
function convertKeysToLowerCase(o) {
  var output = {};
  for (i in o) {
    if (Object.prototype.toString.apply(o[i]) === '[object Object]') {
      output[i.toLowerCase()] = convertKeysToLowerCase(o[i]);
    } else if (Object.prototype.toString.apply(o[i]) === '[object Array]') {
      output[i.toLowerCase()] = [];
      output[i.toLowerCase()].push(convertKeysToLowerCase(o[i][0]));
    } else {
      output[i.toLowerCase()] = o[i];
    }
  }
  return output;
};
module.exports = {
  toCamel: toCamel,
  convertKeysToLowerCase: convertKeysToLowerCase,
  toCamelResponse(data) {
    let result = data.map((item) => {
      return item.toJSON();
    })
    return toCamel(result);
  },
  generateCode(value, length) {
    let result = parseInt(value) + 1;
    let size = result.toString().length;
    numberOfZero = length - size;
    for (let i = 0; i < numberOfZero; i++) {
      result = '0' + result;
    }
    return result;
  },
  generateFirstNumber(prefix, length) {
    let result = '1';
    if (prefix) {
      let numberOfZero = length - prefix.length - 1;
      for (let i = 0; i < numberOfZero; i++) {
        result = '0' + result;
      }
      result = prefix + result;
    }
    return result;
  },
  addZeroToNumber(num, maxLength) {
    num = num.toString();
    let numberOfZero = maxLength - num.length;
    for (let i = 0; i < numberOfZero; i++) {
      num = '0' + num;
    }
    return num;
  },
  whereEqual(options, condition) {
    for (key of Object.keys(condition)) {
      if (condition[key]) {
        options.where[key] = condition[key];
      }
    }
    return options;
  },
  whereEqualOrLessThan(options, condition) {
    for (key of Object.keys(condition)) {
      if (condition[key]) {
        options.where[key] = {
          $or: {
            $lt: condition[key],
            $eq: condition[key]
          }
        }
      }
    }
    return options;
  },
  whereEqualOrGreaterThan(options, condition) {
    for (key of Object.keys(condition)) {
      if (condition[key]) {
        options.where[key] = {
          $or: {
            $gt: condition[key],
            $eq: condition[key]
          }
        }
      }
    }
    return options;
  },
  whereLike(options, condition) {
    for (key of Object.keys(condition)) {
      if (condition[key]) {
        options.where[key] = { $like: '%' + condition[key] + '%' }
      }
    }
    return options;
  },
  whereNotEqual(options, condition) {
    for (key of Object.keys(condition)) {
      if (condition[key]) {
        options.where[key] = { $notIn: [condition[key]] }
      }
    }
    return options;
  },
  whereIn(options, condition) {
    for (key of Object.keys(condition)) {
      if (condition[key]) {
        options.where[key] = { $in: [condition[key]] };
      }
    }
    return options;
  },
  isEmpty(obj) {
    if (obj == null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    if (typeof obj !== "object") return true;
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  },
  convertToPlainArr(input) {
    return input.map(record => record.toJSON());
  },
  reformatDate(dateStr) {
    let dArr;
    dArr = dateStr.split("/");
    return dateStr = dArr[2] + "-" + dArr[1] + "-" + dArr[0];
  },
  btoa(input) {
    if (Buffer.byteLength(str) !== str.length)
      throw new Error('bad string!');
    return new Buffer(str, 'binary').toString('base64');
  },
  atob(input) {
    return new Buffer(input, 'base64').toString('ascii');
  },
  getValueDate(date, positison) {
    let dArr;
    let result;
    dArr = date.split("-");
    if (positison == "year") {
      return result = dArr[0];
    } else if (positison == "month") {
      return result = dArr[1];
    } else if (positison == "day") {
      return result = dArr[2];
    }
    return null;
  }
}