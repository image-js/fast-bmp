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
  compression: number;
  colorMasks: number[];
  imageSize: number;
  logicalColorSpace: number;
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
    this.compression = this.bufferData.readUint32();
    this.imageSize = this.bufferData.readUint32();
    this.xPixelsPerMeter = this.bufferData.seek(38).readInt32();
    this.yPixelsPerMeter = this.bufferData.readInt32();
    this.logicalColorSpace = this.bufferData.readUint32();
    this.colorMasks = [
      this.bufferData.seek(54).readUint32(),
      this.bufferData.readUint32(),
      this.bufferData.readUint32(),
    ];
  }

  decode(): ImageCodec {
    this.bufferData.seek(this.pixelDataOffset);
    this.bufferData.setBigEndian();
    const channels = Math.ceil(this.bitDepth / 8);
    const components = channels % 2 === 0 ? channels - 1 : channels;
    const data: Uint8Array = this.decodePixelData(channels, components);
    return {
      width: this.width,
      height: this.height,
      bitDepth: this.bitDepth,
      compression: this.compression,
      colorMasks: this.colorMasks,
      channels,
      components,
      data,
      yPixelsPerMeter: this.yPixelsPerMeter,
      xPixelsPerMeter: this.xPixelsPerMeter,
      logicalColorSpace: this.logicalColorSpace,
    };
  }

  decodePixelData(channels: number, components: number): Uint8Array {
    const data = new Uint8Array(this.height * this.width * channels);

    if (this.bitDepth === 1) {
      this.decodeBitDepth1Pixels(data);
    } else if (channels === components) {
      this.decodeStandardPixels(data, channels);
    } else {
      this.decodePixelsWithAlpha(data, channels, components);
    }

    return data;
  }

  private decodeBitDepth1Pixels(data: Uint8Array) {
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
  }

  private decodeStandardPixels(data: Uint8Array, channels: number) {
    const padding = this.calculatePadding(channels);

    for (let row = 0; row < this.height; row++) {
      const rowOffset = (this.height - row - 1) * this.width;

      for (let col = 0; col < this.width; col++) {
        for (let channel = channels - 1; channel >= 0; channel--) {
          data[(rowOffset + col) * channels + channel] =
            this.bufferData.readByte();
        }
      }

      this.bufferData.skip(padding);
    }
  }

  private decodePixelsWithAlpha(
    data: Uint8Array,
    channels: number,
    components: number
  ) {
    const padding = this.calculatePadding(channels);

    for (let row = 0; row < this.height; row++) {
      const rowOffset = (this.height - row - 1) * this.width;

      for (let col = 0; col < this.width; col++) {
        const pixelBaseIndex = (rowOffset + col) * channels;

        // Decode color components
        for (let component = components - 1; component >= 0; component--) {
          data[pixelBaseIndex + component] = this.bufferData.readByte();
        }

        // Decode alpha channel
        data[pixelBaseIndex + components] = this.bufferData.readByte();
      }

      this.bufferData.skip(padding);
    }
  }

  private calculatePadding(channels: number): number {
    return (this.width * channels) % 4 === 0
      ? 0
      : 4 - ((this.width * channels) % 4);
  }
}
