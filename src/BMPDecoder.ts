import { IOBuffer } from 'iobuffer';

import type { ImageCodec } from './BMPEncoder';

export default class BMPDecoder {
  bufferData: IOBuffer;
  pixelDataOffset: number;
  width: number;
  height: number;
  bitDepth: number;
  xPixelsPerMeter: number;
  yPixelsPerMeter: number;
  constructor(bufferData: Buffer) {
    this.bufferData = new IOBuffer(bufferData);
    const formatCheck = this.bufferData.readBytes(2);
    if (formatCheck[0] !== 0x42 && formatCheck[1] !== 0x4d) {
      throw new Error(
        'This is not a BMP image or the encoding is not correct.'
      );
    }
    this.pixelDataOffset = this.bufferData.skip(8).readUint32();
    this.width = this.bufferData.skip(4).readUint32();
    this.height = this.bufferData.readUint32();
    this.bitDepth = this.bufferData.seek(28).readUint16();
    this.xPixelsPerMeter = this.bufferData.seek(38).readInt32();
    this.yPixelsPerMeter = this.bufferData.readInt32();
  }

  decode(): ImageCodec {
    this.bufferData.seek(this.pixelDataOffset);
    this.bufferData.setBigEndian();
    const channels = Math.ceil(this.bitDepth / 8);
    const components = channels % 2 === 0 ? channels - 1 : channels;
    const data: Uint8Array = this.decodePixelData(channels);
    return {
      width: this.width,
      height: this.height,
      bitDepth: this.bitDepth,
      channels,
      components,
      data,
      yPixelsPerMeter: this.yPixelsPerMeter,
      xPixelsPerMeter: this.xPixelsPerMeter,
    };
  }

  decodePixelData(channels: number) {
    const data = new Uint8Array(this.height * this.width * channels);
    if (this.bitDepth === 1) {
      let currentNumber = 0;
      for (let row = 0; row < this.height; row++) {
        for (let col = 0; col < this.width; col++) {
          const bitIndex = col % 32;
          if (bitIndex === 0) {
            currentNumber = this.bufferData.readUint32();
          }
          if (currentNumber & (1 << (31 - bitIndex))) {
            data[(this.height - row - 1) * this.width + col] = 1;
          }
        }
      }
    } else {
      const padding =
        (this.width * channels) % 4 === 0
          ? 0
          : 4 - ((this.width * channels) % 4);

      for (let row = 0; row < this.height; row++) {
        for (let col = 0; col < this.width; col++) {
          for (let channel = channels - 1; channel >= 0; channel--) {
            data[
              ((this.height - row - 1) * this.width + col) * channels + channel
            ] = this.bufferData.readByte();
          }
        }
        this.bufferData.skip(padding);
      }
    }
    return data;
  }
}
