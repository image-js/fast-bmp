import fs from 'node:fs';

import { decode, encode } from '..';

describe('errors', () => {
  it('should throw if width or height are undefined or 0', () => {
    expect(() => {
      encode({
        width: 0,
        height: 10,
        components: 1,
        bitDepth: 1,
        channels: 1,
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
        bitDepth: 1,
        channels: 1,
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
});
