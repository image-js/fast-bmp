import * as fs from 'node:fs';
import { buffer } from 'node:stream/consumers';

import type { IOBuffer } from 'iobuffer';

import type { DataToEncode } from './BMPEncoder';

import { encode } from '.';

function decode(bufferData: IOBuffer) {
  const signature = bufferData.readBytes(2);
  if (signature[0] !== 67 && signature[1] !== 77) {
    throw new Error('This is not a BMP file.');
  }
  const filesize = bufferData.readUint32();
  bufferData.skip(4);
  const offset = bufferData.readUint32();
  const infoHeaderSize = bufferData.readUint32();
  const width = bufferData.readUint32();
  const height = bufferData.readUint32();
  const planes = bufferData.readInt16();
  const bitDepth = bufferData.readInt16();
  const compression = bufferData.readUint32();
  const imageSize = bufferData.readUint32();
  const XpixelsPerM = bufferData.readUint32();
  const YpixelsPerM = bufferData.readUint32();
  const colorsUsed = bufferData.readUint32();
  const colorsImportant = bufferData.readUint32();

  const result = {
    filesize,
    offset,
    infoHeaderSize,
    width,
    height,
    planes,
    bitDepth,
    compression,
    imageSize,
    XpixelsPerM,
    YpixelsPerM,
    colorsUsed,
    colorsImportant,
  };

  const rowSize = Math.floor((width + 31) / 32) * 4;
  const dataRowSize = Math.ceil(width / 8);
  const data = new Uint8Array(Math.ceil((width * height * bitDepth) / 8));

  bufferData.seek(offset);

  for (let i = 0; i < data.length; i++) {
    const row = height - i - 1;

    bufferData.skip(rowSize * row);

    data[i] = bufferData.readByte();

    bufferData.seek(offset);
  }

  return {
    width,
    height,
    bitDepth,
    channels: Math.ceil(bitDepth / 8),
    components:
      Math.ceil(bitDepth / 8) % 2 === 0
        ? Math.ceil(bitDepth / 8) - 1
        : Math.ceil(bitDepth / 8),
    data,
  };
}

const data = {
  width: 5,
  height: 5,
  data: new Uint8Array([0b000000011, 0b10010100, 0b11100000, 0b00000000]),
  bitDepth: 1,
  components: 1,
  channels: 1,
};
