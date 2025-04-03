import fs from 'node:fs';

import { decode } from '..';
import { BITMAPV5HEADER } from '../constants';

import { testDecode } from './testDecode';

const data = {
  width: 0,
  height: 0,
  data: new Uint8Array(),
  bitsPerPixel: 1,
  colorMasks: [0x00ff0000, 0x0000ff00, 0x000000ff],
  compression: 0,
  channels: 1,
  components: 1,
  xPixelsPerMeter: BITMAPV5HEADER.DEFAULT_PIXELS_PER_METER,
  yPixelsPerMeter: BITMAPV5HEADER.DEFAULT_PIXELS_PER_METER,
};

describe('decode image with bitDepth of 1', () => {
  it('decode a 2x2 RGBA image', () => {
    // R G
    // B W
    data.width = 2;
    data.height = 2;
    data.channels = 4;
    data.components = 3;
    data.bitsPerPixel = 32;
    data.data = new Uint8Array([
      255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255, 255, 255, 255, 255,
    ]);
    testDecode(data, '2x2RGBA.bmp');
  });

  it('decode an RGB 5x1 image', () => {
    // R R R R R
    data.width = 5;
    data.height = 1;
    data.channels = 3;
    data.components = 3;
    data.bitsPerPixel = 24;
    data.data = new Uint8Array([
      255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0, 255, 0, 0,
    ]);
    testDecode(data, '5x1RGB.bmp');
  });

  it('decode a 1x6RGB image', () => {
    // R
    // G
    // B
    // R
    // G
    // B
    data.width = 1;
    data.height = 6;
    data.channels = 3;
    data.components = 3;
    data.bitsPerPixel = 24;
    data.data = new Uint8Array([
      255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255,
    ]);
    testDecode(data, '1x6RGB.bmp');
  });

  it('decode a 6x4 grey image', () => {
    data.width = 6;
    data.height = 4;
    data.channels = 1;
    data.components = 1;
    data.bitsPerPixel = 8;
    data.data = new Uint8Array([
      255, 255, 255, 0, 0, 0, 110, 110, 110, 110, 110, 110, 0, 0, 0, 255, 255,
      255, 0, 50, 100, 150, 200, 250,
    ]);
    testDecode(data, '6x4Grey.bmp');
  });
  it('checks BI_BITFIELDS compression decoding', () => {
    const imageData = decode(
      fs.readFileSync('src/__test__/files/ColorGrid5x5.bmp')
    );
    expect(imageData.compression).toEqual(3);
  });
});
