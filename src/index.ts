import type { InputData } from 'iobuffer';

import Decoder from './bmp_decoder.ts';
import type { ImageCodec } from './bmp_encoder.ts';
import Encoder from './bmp_encoder.ts';

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
export function decode(data: InputData) {
  const decoder = new Decoder(data);
  return decoder.decode();
}
