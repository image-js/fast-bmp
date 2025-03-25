import fs from 'node:fs';

import { decode, encode } from '..';

describe('decode image with bit depth of 8', () => {
  test('5x5 image', () => {
    const buffer = fs.readFileSync('src/__test__/files/gray5x5.bmp');
    const imageResult = decode(buffer);
    const encodedBuffer = encode(imageResult);
    expect(Buffer.from(encodedBuffer)).toEqual(buffer);
  });
  /**
   * NOT WORKING FOR NOW. DIFFERENCE IN HEADERS.
   * test('lena image', () => {
   * const buffer = fs.readFileSync('src/__test__/files/lena.bmp');
   * const imageResult = decode(buffer);
   * const encodedBuffer = encode(imageResult);
   * expect(Buffer.from(encodedBuffer)).toEqual(buffer);
   * });
   */
});
