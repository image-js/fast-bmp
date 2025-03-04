import Encoder from './BMPEncoder';
import type { DataToEncode } from './BMPEncoder';

export function encode(data: DataToEncode) {
  const encoder = new Encoder(data);
  return encoder.encode();
}
