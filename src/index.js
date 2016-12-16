'use strict';

const Encoder = require('./BMPEncoder');

exports.encode = function (data) {
    const encoder = new Encoder(data);
    return encoder.encode();
};

