const {
    Storage
} = require('@google-cloud/storage');

// Creates a client
const storageOptions = {
    keyFilename: './keys/dev/local-key-access.json'
};

const storage = new Storage(process.env.NODE_ENV === 'development-local' ? storageOptions : {});

async function readFile(bucketName, fileName) {
    return storage.bucket(bucketName).file(fileName).download().then((value) => {
        return value.toString();
    });
}

async function readFiles(bucketName, folderName) {
    return storage.bucket(bucketName).getFiles({
        directory: folderName
    }).then((files) => {
        return files[0];
    })
}

module.exports = {
    readFile,
    readFiles,
};