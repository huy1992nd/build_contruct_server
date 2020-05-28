var storage = {
    startMode: 'test', // default start mode is for test server
    getStartMode: function () {
        if (process.argv.length >= 3) {
            if (process.argv.indexOf('--dev')) {
                // console.log('Server start with dev profile');
                return 'dev';
            }
            if (process.argv.indexOf('--test')) {
                // console.log('Server start with test profile');
                return 'test';
            }
            if (process.argv.indexOf('--prod')) {
                // console.log('Server start with production profile');
                return 'pro';
            }
            throw 'Tung : Invalid argument, please special a mode for start (--dev --prod --test --dev-nopass)';
        };
        return 'pro';
    }
}
module.exports = storage;