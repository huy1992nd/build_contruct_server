var SMB2 = require('smb2');
const objCommon = require('../utils/common');
var config = require('../config/main');
var path = require('path');
var response = require('../utils/response');
const httpStatus = require('../utils/httpStatus');
const message = require('../utils/messages');
exports.uploadImage = async (req, res, next) => {
    try {
        // console.log('update image processing', req);
        let folderPath = 'jobOrders';
        var smb2Client = new SMB2({
            share: '\\\\' + config.IMAGE_SERVER.HOST + '\\sharing',
            domain: '',
            username: config.IMAGE_SERVER.USERNAME,
            password: config.IMAGE_SERVER.PASSWORD
        });
        if (req.file) {
            let fileName = generateName(req.file);
            let finalFilePath = path.join(folderPath + '\\', fileName);
            req.file.path = folderPath + '/' + fileName;
            await saveFile(smb2Client, finalFilePath, req.file.buffer);
        } else if (req.files && req.files.length) {
            for (let i = 0; i < req.files.length; i++) {
                let fileName = generateName(req.files[i]);
                let finalFilePath = path.join(folderPath + '\\', fileName);
                req.files[i].path = folderPath + '/' + fileName;
                await saveFile(smb2Client, finalFilePath, req.files[i].buffer);
            }
            return next();
        }
        return next();
    } catch (ex) {
        console.log('upload image error', ex);
        next(ex);
        return res.status(httpStatus.SERVER_ERROR).json(response.responseError(message.messageCommon.error, ex.message));
    }
}

function generateName(file) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    const nameImage = objCommon.generateUUID();
    return (nameImage + '.' + extension)
}

function saveFile(smb2Client, filePath, fileContext) {
    return new Promise(function (resolve, reject) {
		smb2Client.writeFile(filePath, fileContext, function (err) {
            if (err) {
                reject(err);
            }
            resolve(true)
        });
	});
}