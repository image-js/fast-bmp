import fs from 'node:fs';
import path from 'node:path';

import { decode, encode } from '..';
import type { ImageCodec } from '../BMPEncoder';
import { BITMAPV5HEADER } from '../constants';

/**
 * Helper function to check decoding results.
 * @param data - Comparison data.
 * @param filename - File to decode.
 */
function testDecode(data: ImageCodec, filename: string) {
  const fileData = fs.readFileSync(path.join(__dirname, 'files', filename));
  const decodedInfo = decode(fileData);
  expect(decodedInfo).toEqual(data);
}

const data = {
  width: 0,
  height: 0,
  data: new Uint8Array(),
  bitDepth: 1,
  components: 1,
  channels: 1,
  logicalColorSpace: 2,
  compression: 0,
  colorMasks: [16711680, 65280, 255],
  xPixelsPerMeter: BITMAPV5HEADER.DEFAULT_PIXELS_PER_METER,
  yPixelsPerMeter: BITMAPV5HEADER.DEFAULT_PIXELS_PER_METER,
};

describe('decode image with bitDepth of 1', () => {
  it('decode a 5x5 image', () => {
    // 0 0 0 0 0
    // 0 1 1 1 0
    // 0 1 0 1 0
    // 0 1 1 1 0
    // 0 0 0 0 0
    data.width = 5;
    data.height = 5;

    data.data = new Uint8Array([
      0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
    ]);
    testDecode(data, '5x5.bmp');
  });

  it('decode a 1x5 image', () => {
    // 0
    // 1
    // 0
    // 1
    // 1
    data.width = 1;
    data.height = 5;

    data.data = new Uint8Array([0, 1, 0, 1, 1]);
    testDecode(data, '1x5.bmp');
  });

  it('decode a 5x1 image', () => {
    // 1 0 1 0 0
    data.width = 5;
    data.height = 1;

    data.data = new Uint8Array([1, 0, 1, 0, 0]);
    testDecode(data, '5x1.bmp');
  });

  it('decode a 6x4 image', () => {
    data.width = 6;
    data.height = 4;

    data.data = new Uint8Array([
      1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
    ]);
    testDecode(data, '6x4.bmp');
  });

  it('decode a 62x4', () => {
    data.width = 62;
    data.height = 4;

    data.data = new Uint8Array([
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    testDecode(data, '62x4.bmp');
  });

  it('decode a 10x2 image', () => {
    // 1 1 1 0 0 1 0 1 0 1
    // 1 0 1 0 1 0 0 1 1 1
    data.width = 10;
    data.height = 2;

    data.data = new Uint8Array([
      1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1,
    ]);
    testDecode(data, '10x2.bmp');
  });

  it('decode image with exactly 4 bytes width', () => {
    data.width = 32;
    data.height = 2;

    data.data = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    testDecode(data, '32x2.bmp');
  });

  it('decode image with more that 4 bytes width', () => {
    data.width = 42;
    data.height = 2;

    data.data = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1,
    ]);
    testDecode(data, '42x2.bmp');
  });

  it('decode image where skipBit can equal relOffset on the last column', () => {
    data.width = 60;
    data.height = 4;

    data.data = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ]);

    testDecode(data, '60x4.bmp');
  });

  it('decode image must return the same data as encoded version', () => {
    const encodedImage = encode(data);
    const decodedData = decode(Buffer.from(encodedImage));
    expect(decodedData).toEqual(data);
  });
});
