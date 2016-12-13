'use strict';
const IOBuffer = require('iobuffer');
const constants = require('./constants');

exports.encode = function(imageData) {
    if(imageData.bitDepth !== 1) {
        throw new Error('Only bitDepth of 1 is supported');
    }
    if(!imageData.height || !imageData.width) {
        throw new Error('ImageData width and height are required');
    }

    var iobuffer = new IOBuffer();
    // skip header
    io.skip(14);
    io.setLittleEndian();

    writeCoreDIBHeader(iobuffer, imageData);

    // write header at the end
    io.rewind();
    writeBitmapV5Header(iobuffer);
};

function writeCoreDIBHeader(io, imageData) {
    // Size of the header
    io.writeUint32(124);
    io.writeInt32(imageData.width);
    io.writeInt32(imageData.height);
    io.writeUint16(1);                               // bv5Planes - must be set to 1
    io.writeUint16(imageData.bitDepth);
    io.writeUint32(constants.BITMAPV5HEADER.Compression.BI_RGB);

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