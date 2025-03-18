import Decoder from './BMPDecoder';
import Encoder from './BMPEncoder';
import type { ImageCodec } from './BMPEncoder';
/**
 * Encodes data into BMP format.
 * @param data - Data for encoding.
 * @returns typed array buffer.
 */
export function encode(data: ImageCodec) {
  const encoder = new Encoder(data);
  return encoder.encode();
}
/**
 * Decodes BMP format image into data.
 * @param data - Buffer with image data.
 * @returns - Decoded data.
 */
export function decode(data: Buffer) {
  const decoder = new Decoder(data);
  return decoder.decode();
}
