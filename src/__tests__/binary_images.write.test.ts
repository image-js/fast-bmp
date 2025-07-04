import { describe, expect, it } from 'vitest';

import { decode, encode } from '../index.ts';

import { createTestData } from './create_test_data.ts';
import { testEncode } from './test_encode.ts';

describe('encode image with bitDepth of 1', () => {
  it('encode a 5x5 image', () => {
    // 0 0 0 0 0
    // 0 1 1 1 0
    // 0 1 0 1 0
    // 0 1 1 1 0
    // 0 0 0 0 0
    const data = createTestData({
      colorModel: 'BINARY',
      width: 5,
      height: 5,
      data: new Uint8Array(
        [
          [0, 0, 0, 0, 0],
          [0, 1, 1, 1, 0],
          [0, 1, 0, 1, 0],
          [0, 1, 1, 1, 0],
          [0, 0, 0, 0, 0],
        ].flat(),
      ),
    });
    testEncode(data, '5x5.bmp');
  });

  it('encode a 1x5 image', () => {
    // 0
    // 1
    // 0
    // 1
    // 1
    const data = createTestData({
      colorModel: 'BINARY',
      width: 1,
      height: 5,
      data: new Uint8Array([[0], [1], [0], [1], [1]].flat()),
    });

    testEncode(data, '1x5.bmp');
  });

  it('encode a 5x1 image', () => {
    // 1 0 1 0 0
    const data = createTestData({
      colorModel: 'BINARY',
      width: 5,
      height: 1,
      data: new Uint8Array([1, 0, 1, 0, 0]),
    });
    testEncode(data, '5x1.bmp');
  });

  it('encode a 6x4 image', () => {
    const data = createTestData({
      colorModel: 'BINARY',
      width: 6,
      height: 4,
      data: new Uint8Array(
        [
          [1, 1, 1, 1, 1, 1],
          [0, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 1],
          [0, 0, 0, 0, 0, 0],
        ].flat(),
      ),
    });
    testEncode(data, '6x4.bmp');
  });

  it('encode a 62x4', () => {
    const data = createTestData({
      colorModel: 'BINARY',
      width: 62,
      height: 4,
      data: new Uint8Array(
        [
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
          ],
          [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          ],
        ].flat(),
      ),
    });
    testEncode(data, '62x4.bmp');
  });

  it('encode a 10x2 image', () => {
    // 1 1 1 0 0 1 0 1 0 1
    // 1 0 1 0 1 0 0 1 1 1
    const data = createTestData({
      colorModel: 'BINARY',
      width: 10,
      height: 2,
      //prettier-ignore
      data: new Uint8Array(        [
        [1, 1, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 1, 1, 1],
      ].flat()),
    });
    testEncode(data, '10x2.bmp');
  });

  it('encode image with exactly 4 bytes width', () => {
    const data = createTestData({
      colorModel: 'BINARY',
      width: 32,
      height: 2,
      data: new Uint8Array(
        [
          [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
          ],
        ].flat(),
      ),
    });
    testEncode(data, '32x2.bmp');
  });

  it('encode image with more that 4 bytes width', () => {
    const data = createTestData({
      colorModel: 'BINARY',
      width: 42,
      height: 2,
      data: new Uint8Array(
        [
          [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
        ].flat(),
      ),
    });
    testEncode(data, '42x2.bmp');
  });
  it('encode image where skipBit can equal relOffset on the last column', () => {
    const data = createTestData({
      colorModel: 'BINARY',
      width: 60,
      height: 4,
      data: new Uint8Array(
        [
          [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          ],
          [
            0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          ],
          [
            0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
        ].flat(),
      ),
    });

    testEncode(data, '60x4.bmp');
  });
  it('encode image after decode must give the same image', () => {
    const data = createTestData({
      colorModel: 'BINARY',
      width: 60,
      height: 4,
      data: new Uint8Array(
        [
          [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          ],
          [
            0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
          [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          ],
          [
            0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ],
        ].flat(),
      ),
    });
    const encodedImage = encode(data);
    const decodedImage = decode(encodedImage);

    expect(decodedImage).toEqual(data);
  });

  it('encode a 5x5 image without optional parameters', () => {
    const dataWithoutOptions = {
      width: 5,
      height: 5,

      data: new Uint8Array(
        [
          [0, 0, 0, 0, 0],
          [0, 1, 1, 1, 0],
          [0, 1, 0, 1, 0],
          [0, 1, 1, 1, 0],
          [0, 0, 0, 0, 0],
        ].flat(),
      ),
      bitsPerPixel: 1,
      components: 1,
      channels: 1,
      compression: 0,
      colorMasks: [0x00ff0000, 0x0000ff00, 0x000000ff],
    };

    testEncode(dataWithoutOptions, '5x5.bmp');
  });
});
