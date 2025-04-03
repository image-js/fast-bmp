import fs from 'node:fs';
import path from 'node:path';

import { decode, encode } from '..';
import type { ImageCodec } from '../BMPEncoder';

/**
 * Helper function to check decoding results.
 * @param data - Comparison data.
 * @param filename - File to decode.
 */
export function testDecode(data: ImageCodec, filename: string) {
  if (process.env.FAST_BMP_WRITE_DATA_FILES) {
    fs.writeFileSync(path.join(__dirname, 'files', filename), encode(data));
  } else {
    const fileData = fs.readFileSync(path.join(__dirname, 'files', filename));
    const decodedInfo = decode(fileData);
    expect(decodedInfo).toEqual(data);
  }
}
