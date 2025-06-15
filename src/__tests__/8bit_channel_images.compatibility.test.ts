import { describe, expect, it } from 'vitest';

import { decode, encode } from '../index.ts';

import { readTestFile } from './read_test_file.js';

describe('decode image with bit depth of 8', () => {
  it('5x5 grayscale image', () => {
    const buffer = readTestFile('GIMP_images/gray5x5.bmp');
    const imageResult = decode(buffer);
    const encodedImage = encode(imageResult);
    expect(Buffer.from(encodedImage)).toStrictEqual(buffer);
  });

  it('lena grayscale image', () => {
    const buffer = readTestFile('GIMP_images/lena.bmp');
    const imageResult = decode(buffer);
    const encodedImage = encode(imageResult);
    expect(Buffer.from(encodedImage)).toStrictEqual(buffer);
  });

  it('blackbuck RGB image', () => {
    const buffer = readTestFile('GIMP_images/blackbuck.bmp');
    const imageResult = decode(buffer);
    const encodedBuffer = encode(imageResult);
    expect(Buffer.from(encodedBuffer)).toStrictEqual(buffer);
  });

  it('simple RGB image to check color encoding', () => {
    const buffer = readTestFile('GIMP_images/bmp_24.bmp');
    const imageResult = decode(buffer);
    const encodedBuffer = encode(imageResult);
    expect(Buffer.from(encodedBuffer)).toStrictEqual(buffer);
  });

  it('5x5 color grid RGBA image', () => {
    const buffer = readTestFile('GIMP_images/ColorGrid5x5.bmp');
    const imageResult = decode(buffer);
    const encodedBuffer = encode(imageResult);
    expect(Buffer.from(encodedBuffer)).toStrictEqual(buffer);
  });
});
