import fs from 'node:fs';

import { decode, encode } from '..';

describe('decode image with bit depth of 8', () => {
  test('5x5 image', () => {
    const buffer = fs.readFileSync('src/__test__/files/gray5x5.bmp');
    const imageResult = decode(buffer);
    const encodedImage = encode(imageResult);
    expect(Buffer.from(encodedImage)).toEqual(buffer);
  });
  test('lena image', () => {
    const buffer = fs.readFileSync('src/__test__/files/lena.bmp');
    const imageResult = decode(buffer);
    const encodedImage = encode(imageResult);
    expect(Buffer.from(encodedImage)).toEqual(buffer);
  });
  test('blackbuck image', () => {
    const buffer = fs.readFileSync('src/__test__/files/blackbuck.bmp');
    const imageResult = decode(buffer);
    const encodedBuffer = encode(imageResult);

    expect(Buffer.from(encodedBuffer)).toEqual(buffer);
  });
  test('simple RGB image to check color encoding', () => {
    const buffer = fs.readFileSync('src/__test__/files/bmp_24.bmp');
    const imageResult = decode(buffer);
    const encodedBuffer = encode(imageResult);

    expect(Buffer.from(encodedBuffer)).toEqual(buffer);
  });
  test('5x5 color grid image', () => {
    const buffer = fs.readFileSync('src/__test__/files/ColorGrid5x5.bmp');
    const imageResult = decode(buffer);
    const encodedBuffer = encode(imageResult);

    expect(Buffer.from(encodedBuffer)).toEqual(buffer);
  });
});
