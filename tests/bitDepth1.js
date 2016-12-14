'use strict';

const testEncode = require('./testEncode');

describe('encode image with bitDepth of 1', function () {
     it('encode a 5x5 image', function () {
         // 0 0 0 0 0
         // 0 1 1 1 0
         // 0 1 0 1 0
         // 0 1 1 1 0
         // 0 0 0 0 0
         const data = {
             width: 5,
             height: 5,
             data: new Uint8Array([0b000000011, 0b10010100, 0b11100000, 0b00000000]),
             bitDepth: 1,
             components: 1,
             channels: 1
         };
         testEncode(data, '5x5.bmp');
     })
});
