import { decode, encode } from '..';

import { createTestData } from './createTestData';
import { testDecode } from './testDecode';

describe('decode image with bitDepth of 1', () => {
  it('decode a 5x5 image', () => {
    // 0 0 0 0 0
    // 0 1 1 1 0
    // 0 1 0 1 0
    // 0 1 1 1 0
    // 0 0 0 0 0
    const data = createTestData({
      colorModel: 'BINARY',
      width: 5,
      height: 5,
      data: new Uint8Array([
        0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0,
        0,
      ]),
    });
    testDecode(data, '5x5.bmp');
  });

  it('decode a 1x5 image', () => {
    // 0
    // 1
    // 0
    // 1
    // 1
    const data = createTestData({
      colorModel: 'BINARY',
      width: 1,
      height: 5,
      data: new Uint8Array([0, 1, 0, 1, 1]),
    });

    testDecode(data, '1x5.bmp');
  });

  it('decode a 5x1 image', () => {
    // 1 0 1 0 0
    const data = createTestData({
      colorModel: 'BINARY',
      width: 5,
      height: 1,
      data: new Uint8Array([1, 0, 1, 0, 0]),
    });
    testDecode(data, '5x1.bmp');
  });

  it('decode a 6x4 image', () => {
    const data = createTestData({
      colorModel: 'BINARY',
      width: 6,
      height: 4,
      data: new Uint8Array([
        1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
      ]),
    });
    testDecode(data, '6x4.bmp');
  });

  it('decode a 62x4', () => {
    const data = createTestData({
      colorModel: 'BINARY',
      width: 62,
      height: 4,
      data: new Uint8Array([
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
      ]),
    });
    testDecode(data, '62x4.bmp');
  });

  it('decode a 10x2 image', () => {
    // 1 1 1 0 0 1 0 1 0 1
    // 1 0 1 0 1 0 0 1 1 1

    const data = createTestData({
      colorModel: 'BINARY',
      width: 10,
      height: 2,
      data: new Uint8Array([
        1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1,
      ]),
    });
    testDecode(data, '10x2.bmp');
  });

  it('decode image with exactly 4 bytes width', () => {
    const data = createTestData({
      colorModel: 'BINARY',
      width: 32,
      height: 2,
      data: new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]),
    });
    testDecode(data, '32x2.bmp');
  });

  it('decode image with more that 4 bytes width', () => {
    const data = createTestData({
      colorModel: 'BINARY',
      width: 42,
      height: 2,
      data: new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      ]),
    });
    testDecode(data, '42x2.bmp');
  });

  it('decode image where skipBit can equal relOffset on the last column', () => {
    const data = createTestData({
      colorModel: 'BINARY',
      width: 60,
      height: 4,
      data: new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      ]),
    });
    testDecode(data, '60x4.bmp');
  });

  it('decode image must return the same data as encoded version', () => {
    const data = createTestData({
      colorModel: 'BINARY',
      width: 5,
      height: 5,
      data: new Uint8Array([
        0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0,
        0,
      ]),
    });
    const encodedImage = encode(data);
    const decodedData = decode(Buffer.from(encodedImage));
    expect(decodedData).toEqual(data);
  });
});
