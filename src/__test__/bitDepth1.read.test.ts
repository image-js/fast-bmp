import fs from 'node:fs';
import path from 'node:path';

import { decode } from '..';
import type { ImageCodec } from '../BMPEncoder';

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
      0b000000011, 0b10010100, 0b11100000, 0b00000000,
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
    data.data = new Uint8Array([0b01011000]);
    testDecode(data, '1x5.bmp');
  });

  it('decode a 5x1 image', () => {
    // 1 0 1 0 0
    data.width = 5;
    data.height = 1;
    data.data = new Uint8Array([0b10100000]);
    testDecode(data, '5x1.bmp');
  });

  it('decode a 6x4 image', () => {
    data.width = 6;
    data.height = 4;
    data.data = new Uint8Array([0b11111100, 0b00001111, 0b11000000]);
    testDecode(data, '6x4.bmp');
  });

  it('decode a 62x4', () => {
    data.width = 62;
    data.height = 4;
    data.data = new Uint8Array([
      0b11111111, 0b11111111, 0b11111111, 0b00000000, 0b00000000, 0b11111111,
      0b11111111, 0b11111100, 0b00000000, 0b00000000, 0b00000011, 0b11111111,
      0b11111100, 0b00000000, 0b00000000, 0b00001111, 0b11111111, 0b11111111,
      0b11110000, 0b00000000, 0b000011111, 0b11111111, 0b11111111, 0b11000000,
      0b00000000, 0b00000000, 0b00111111, 0b11111111, 0b11000000, 0b00000000,
      0b00000000,
    ]);
    testDecode(data, '62x4.bmp');
  });

  it('decode a 10x2 image', () => {
    // 1 1 1 0 0 1 0 1 0 1
    // 1 0 1 0 1 0 0 1 1 1
    data.width = 10;
    data.height = 2;
    data.data = new Uint8Array([0b11100101, 0b01101010, 0b01110000]);
    testDecode(data, '10x2.bmp');
  });

  it('decode image with exactly 4 bytes width', () => {
    data.width = 32;
    data.height = 2;
    data.data = new Uint8Array([
      0b00000000, 0b00000000, 0b11111111, 0b11111111, 0b11111111, 0b11111111,
      0b00000000, 0b00000000,
    ]);
    testDecode(data, '32x2.bmp');
  });

  it('decode image with more that 4 bytes width', () => {
    data.width = 42;
    data.height = 2;
    data.data = new Uint8Array([
      0b00000000, 0b00000000, 0b11111111, 0b11111111, 0b11111111, 0b11000000,
      0b00000000, 0b00111111, 0b11111111, 0b11111111, 0b11110000,
    ]);
    testDecode(data, '42x2.bmp');
  });
  it('decode image where skipBit can equal relOffset on the last column', () => {
    data.width = 60;
    data.height = 4;
    data.data = new Uint8Array([
      0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b00000000,
      0b00000000, 0b00000000, 0b11111111, 0b11111111, 0b11111111, 0b11111111,
      0b11111111, 0b11111111, 0b11111111, 0b00000000, 0b00000000, 0b00000000,
      0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b11111111,
      0b11111111, 0b11111111, 0b11111111, 0b11111111, 0b11111111, 0b11111111,
    ]);
    testDecode(data, '60x4.bmp');
  });
});
