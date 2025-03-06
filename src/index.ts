import Encoder from './BMPEncoder';
import type { DataToEncode } from './BMPEncoder';

/**
 * Encodes data into BMP format.
 * @param data - Data for encoding.
 * @returns typed array buffer.
 */
export function encode(data: DataToEncode) {
  const encoder = new Encoder(data);
  return encoder.encode();
}
