import fs from 'node:fs';
import path from 'node:path';

import { expect } from 'vitest';

import type { ImageCodec } from '../bmp_encoder.ts';
import { encode } from '../index.ts';

import { readTestFile } from './read_test_file.js';

/**
 * Testing function for BMP encoding.
 * @param data - Data for encoding.
 * @param filename - Filename for a file to write.
 */
export function testEncode(data: ImageCodec, filename: string) {
  const buffer = encode(data);
  if (process.env.FAST_BMP_WRITE_DATA_FILES) {
    fs.writeFileSync(
      path.join(import.meta.dirname, 'files/GIMP_images/', filename),
      buffer,
    );
  } else {
    const fileData = readTestFile(`GIMP_images/${filename}`);
    const fileDataUint8 = Uint8Array.from(fileData);
    expect(buffer).toStrictEqual(fileDataUint8);
  }
}
