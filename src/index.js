'use strict';
const IOBuffer = require('iobuffer');
const constants = require('./constants');

exports.encode = function(imageData) {
    if(imageData.bitDepth !== 1) {
        throw new Error('Only bitDepth of 1 is supported');
    }

    var iobuffer = new IOBuffer();
    // skip header
    io.skip(14);

    writeCoreDIBHeader(iobuffer);

    // write header at the end
    io.rewind();
    writeBitmapFileHeader(iobuffer);
};

function writeCoreDIBHeader(iobuffer) {
    iobuffer
}

function writeBitmapFileHeader(iobuffer) {
    //
    iobuffer.writeChars('BM');
    // Size of BMP file in bytes
    iobuffer.writeInt32(iobuffer._writtenLength);
    iobuffer.writeUInt16(0);
    iobuffer.writeUInt16(0);
}

function writeBitmapV5Header(iobuffer) {

}