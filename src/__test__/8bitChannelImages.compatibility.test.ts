import fs from 'node:fs';

import { decode, encode } from '..';

describe('decode image with bit depth of 8', () => {
  test('5x5 grayscale image', () => {
    const buffer = fs.readFileSync(
      'src/__test__/files/GIMP_images/gray5x5.bmp'
    );
    const imageResult = decode(buffer);
    const encodedImage = encode(imageResult);
    expect(Buffer.from(encodedImage)).toEqual(buffer);
  });
  test('lena grayscale image', () => {
    const buffer = fs.readFileSync('src/__test__/files/GIMP_images/lena.bmp');
    const imageResult = decode(buffer);
    const encodedImage = encode(imageResult);
    expect(Buffer.from(encodedImage)).toEqual(buffer);
  });
  test('blackbuck RGB image', () => {
    const buffer = fs.readFileSync(
      'src/__test__/files/GIMP_images/blackbuck.bmp'
    );
    const imageResult = decode(buffer);
    const encodedBuffer = encode(imageResult);

    expect(Buffer.from(encodedBuffer)).toEqual(buffer);
  });
  test('simple RGB image to check color encoding', () => {
    const buffer = fs.readFileSync('src/__test__/files/GIMP_images/bmp_24.bmp');
    const imageResult = decode(buffer);
    const encodedBuffer = encode(imageResult);

    expect(Buffer.from(encodedBuffer)).toEqual(buffer);
  });
  test('5x5 color grid RGBA image', () => {
    const buffer = fs.readFileSync(
      'src/__test__/files/GIMP_images/ColorGrid5x5.bmp'
    );
    const imageResult = decode(buffer);
    const encodedBuffer = encode(imageResult);

    expect(Buffer.from(encodedBuffer)).toEqual(buffer);
  });
});
