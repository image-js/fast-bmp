import fs from 'node:fs';
import path from 'node:path';

import { decode } from '..';
import type { ImageCodec } from '../BMPEncoder';

/**
 * Helper function to check decoding results.
 * @param data - Comparison data.
 * @param filename - File to decode.
 */
export function testDecode(data: ImageCodec, filename: string) {
  const fileData = fs.readFileSync(
    path.join(__dirname, 'files/GIMP_images/', filename)
  );
  const decodedInfo = decode(fileData);
  expect(decodedInfo).toEqual(data);
}
