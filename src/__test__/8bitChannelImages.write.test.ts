import { createTestData } from './createTestData';
import { testEncode } from './testEncode';

describe('decode image with bitDepth of 1', () => {
  it('decode an RGBA 2x2  image', () => {
    // R G
    // B W
    const data = createTestData({
      colorModel: 'RGBA',
      width: 2,
      height: 2,
      data: new Uint8Array([
        255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255, 255, 255, 255, 255,
      ]),
    });
    testEncode(data, '2x2RGBA.bmp');
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
    testEncode(data, '5x1RGB.bmp');
  });

  it('decode an RGB 1x6  image', () => {
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
      data: new Uint8Array([
        255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255,
      ]),
    });
    testEncode(data, '1x6RGB.bmp');
  });

  it('decode a 6x4 grey image', () => {
    const data = createTestData({
      colorModel: 'GREYSCALE',
      width: 6,
      height: 4,
      data: new Uint8Array([
        255, 255, 255, 0, 0, 0, 110, 110, 110, 110, 110, 110, 0, 0, 0, 255, 255,
        255, 0, 50, 100, 150, 200, 250,
      ]),
    });
    testEncode(data, '6x4Grey.bmp');
  });
});
