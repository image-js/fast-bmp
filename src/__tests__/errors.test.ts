import { describe, expect, it } from 'vitest';

import { decode, encode } from '../index.ts';

import { createTestData } from './create_test_data.ts';
import { readTestFile } from './read_test_file.js';

describe('errors', () => {
  it('should throw if width or height are undefined or 0', () => {
    expect(() => {
      encode({
        width: 0,
        height: 10,
        components: 1,
        bitsPerPixel: 1,
        channels: 1,
        compression: 0,
        colorMasks: [0, 0, 0],
        xPixelsPerMeter: 0,
        yPixelsPerMeter: 0,
        data: new Uint8Array(2),
      });
    }).toThrow(/width and height are required/);

    expect(() => {
      encode({
        width: 10,
        height: 0,
        components: 1,
        bitsPerPixel: 1,
        channels: 1,
        compression: 0,
        colorMasks: [0, 0, 0],
        xPixelsPerMeter: 0,
        yPixelsPerMeter: 0,
        data: new Uint8Array(2),
      });
    }).toThrow(/width and height are required/);
  });

  it('should throw if image is not bmp encoded', () => {
    expect(() => {
      decode(readTestFile('color-balance.png'));
    }).toThrow(/This is not a BMP image or the encoding is not correct./i);
  });

  it('should throw if bmp image is compressed', () => {
    expect(() => {
      decode(readTestFile('mt_rle.bmp'));
    }).toThrow(
      /Only BI_RGB and BI_BITFIELDS compression methods are allowed./i,
    );
  });

  it('should throw if image is BI_BITFIELDS 16bit encoded', () => {
    expect(() => {
      decode(readTestFile('custom16bit.bmp'));
    }).toThrow(
      /Invalid number of bits per pixel. Supported number of bits per pixel: 1, 8, 24, 32. Received: 16/i,
    );
  });

  it('should throw if data is invalid', () => {
    const data = createTestData({
      colorModel: 'RGBA',
      width: 5,
      height: 5,
      data: new Uint8Array([1, 1, 1, 1, 1]),
    });
    expect(() => {
      encode(data);
    }).toThrow(/Invalid data length./i);
  });

  it('should throw if number of bits per pixel is invalid', () => {
    expect(() => {
      const data = createTestData({
        colorModel: 'RGBA',
        width: 1,
        height: 1,
        data: new Uint8Array([1, 1, 1, 1]),
      });

      data.bitsPerPixel = 10;
      encode(data);
    }).toThrow(
      /Invalid number of bits per pixel. Supported number of bits per pixel: 1, 8, 24, 32. Received: 10/i,
    );
  });

  it('should throw if color masks are not supported during encoding', () => {
    expect(() => {
      const image = readTestFile('GIMP_images/ColorGrid5x5.bmp');
      image.writeUInt32LE(0x12345678, 58);
      decode(image);
    }).toThrow(
      /Unsupported color masks detected in 32-bit BMP image. Only standard RGBA \(ff0000, ff00, ff\) masks are supported. Received: ff0000,12345678,ff./i,
    );
  });

  it('should throw if color masks are not supported during decoding', () => {
    const data = createTestData({
      colorModel: 'RGBA',
      width: 1,
      height: 1,
      data: new Uint8Array([1, 1, 1, 1]),
      colorMasks: [0x0, 0x10, 0x56],
    });
    expect(() => {
      encode(data);
    }).toThrow(
      /Unsupported color masks detected in 32-bit BMP image. Only standard RGBA \(ff0000, ff00, ff\) masks are supported. Received: 0,10,56./i,
    );
  });
});

it('should throw if colorModel is invalid for test data', () => {
  expect(() => {
    createTestData({
      //@ts-expect-error Invalid color model.
      colorModel: 'rgb',
      width: 2,
      height: 2,
      data: new Uint8Array([1, 1, 1, 1]),
    });
  }).toThrow(/Invalid color model./i);
});
