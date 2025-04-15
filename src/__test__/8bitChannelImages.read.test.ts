import fs from 'node:fs';

import { decode } from '..';

import { createTestData } from './createTestData';
import { testDecode } from './testDecode';
import { testEncode } from './testEncode';

describe('decode image with bitDepth of 1', () => {
  it('decode a 2x2 RGBA image', () => {
    // R G
    // B W
    const data = createTestData({
      colorModel: 'RGBA',
      width: 2,
      height: 2,
      compression: 3,
      // prettier-ignore
      data: new Uint8Array([
        255, 0, 0, 255, 0, 255, 0, 255,
        0, 0, 255, 255, 255, 255, 255, 255,
      ]),
    });

    testDecode(data, '2x2RGBA.bmp');
  });

  it('decode an RGB 5x1 image', () => {
    // R R R R R
    const data = createTestData({
      colorModel: 'RGB',
      width: 5,
      height: 1,
      data: new Uint8Array([
        255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0,
      ]),
    });
    testDecode(data, '5x1RGB.bmp');
  });

  it('decode a 1x6RGB image', () => {
    // R
    // G
    // B
    // R
    // G
    // B
    const data = createTestData({
      colorModel: 'RGB',
      width: 1,
      height: 6,
      data: new Uint8Array(
        [
          [255, 0, 0],
          [0, 255, 0],
          [0, 0, 255],
          [255, 0, 0],
          [0, 255, 0],
          [0, 0, 255],
        ].flat()
      ),
    });
    testDecode(data, '1x6RGB.bmp');
  });

  it('decode a 6x4 grey image', () => {
    const data = createTestData({
      colorModel: 'GREYSCALE',
      width: 6,
      height: 4,
      data: new Uint8Array(
        [
          [255, 255, 255, 0, 0, 0],
          [110, 110, 110, 110, 110, 110],
          [0, 0, 0, 255, 255, 255],
          [0, 50, 100, 150, 200, 250],
        ].flat()
      ),
    });
    testDecode(data, '6x4Grey.bmp');
  });
  it('checks BI_BITFIELDS compression decoding', () => {
    const imageData = decode(
      fs.readFileSync('src/__test__/files/GIMP_images/ColorGrid5x5.bmp')
    );
    testEncode(imageData, 'ColorGrid5x5.bmp');
  });
});
