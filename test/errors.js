'use strict';
const encode = require('..').encode;

describe('errors', function () {
    it('should throw if width or height are undefined or 0', function () {
        (function () {
            encode({
                width: 0,
                height: 10,
                components: 1,
                bitDepth: 1,
                channels: 1,
                data: new Uint8Array(2)
            });
        }).should.throw(/width and height are required/);

        (function () {
            encode({
                width: 10,
                components: 1,
                bitDepth: 1,
                channels: 1,
                data: new Uint8Array(2)
            });
        }).should.throw(/width and height are required/);
    });

    it('should throw if bitDepth not 1', function () {
        (function() {
            encode({
                width: 10, height: 10,
                components: 1, channels: 1, bitDepth: 8,
                data: new Uint8Array(10)
            });
        }).should.throw(/only bitDepth of 1 is supported/i);
    });

});