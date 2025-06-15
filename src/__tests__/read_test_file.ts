import fs from 'node:fs';
import path from 'node:path';

/**
 * Helper to synchronously read a test file.
 * @param name - File name
 * @returns File contents as a Buffer.
 */
export function readTestFile(name: string): Buffer {
  return fs.readFileSync(path.join(import.meta.dirname, 'files', name));
}
