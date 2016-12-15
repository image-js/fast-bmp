'use strict';
const fs = require('fs');
const path = require('path');
const encode = require('..').encode;

module.exports = function (data, filename) {
    var buffer = encode(data);
    if (process.env.FAST_BMP_WRITE_DATA_FILES) {
        console.log('write');
        fs.writeFileSync(path.join(__dirname, 'files', filename), buffer);
    } else {
        const fileData = fs.readFileSync(path.join(__dirname, 'files', filename));
        buffer.should.deepEqual(fileData);
    }


};
