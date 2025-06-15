import { expect } from 'vitest';

import type { ImageCodec } from '../bmp_encoder.ts';
import { decode } from '../index.ts';

import { readTestFile } from './read_test_file.js';

/**
 * Helper function to check decoding results.
 * @param data - Comparison data.
 * @param filename - File to decode.
 */
export function testDecode(data: ImageCodec, filename: string) {
  const fileData = readTestFile(`GIMP_images/${filename}`);
  const decodedInfo = decode(fileData);
  expect(decodedInfo).toEqual(data);
}
