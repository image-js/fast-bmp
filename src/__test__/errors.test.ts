import fs from 'node:fs';

import { decode, encode } from '..';

import { createTestData } from './createTestData';

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
      decode(fs.readFileSync('src/__test__/files/color-balance.png'));
    }).toThrow(/This is not a BMP image or the encoding is not correct./i);
  });

  it('should throw if bmp image is compressed', () => {
    expect(() => {
      decode(fs.readFileSync('src/__test__/files/mt_rle.bmp'));
    }).toThrow(
      /Only BI_RGB and BI_BITFIELDS compression methods are allowed./i
    );
  });

  it('should throw if image is BI_BITFIELDS 16bit encoded', () => {
    expect(() => {
      decode(fs.readFileSync('src/__test__/files/custom16bit.bmp'));
    }).toThrow(/4 and 16 bits per pixel are not supported./i);
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
    }).toThrow(/This number of bits per pixel is not supported./i);
  });

  it('should throw if color masks are not supported during encoding', () => {
    expect(() => {
      const image = fs.readFileSync('src/__test__/files/ColorGrid5x5.bmp');
      image.writeUInt32LE(0x12345678, 58);
      decode(Buffer.from(image));
    }).toThrow(/These color masks are not supported by this color model./i);
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
    }).toThrow(/These color masks are not supported by this color model./i);
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
