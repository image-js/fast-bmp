import fs from 'node:fs';
import path from 'node:path';

import { encode } from '..';
import type { DataToEncode } from '../BMPEncoder';

/**
 * Testing function for BMP encoding.
 * @param data - Data for encoding.
 * @param filename - Filename for a file to write.
 */
export function testEncode(data: DataToEncode, filename: string) {
  const buffer = encode(data);
  if (process.env.FAST_BMP_WRITE_DATA_FILES) {
    fs.writeFileSync(path.join(__dirname, 'files', filename), buffer);
  } else {
    const fileData = fs.readFileSync(path.join(__dirname, 'files', filename));
    const fileDataUint8 = Uint8Array.from(fileData);
    expect(buffer).toStrictEqual(fileDataUint8);
  }
}
