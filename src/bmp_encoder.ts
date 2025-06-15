import { IOBuffer } from 'iobuffer';

import { BITMAPV5HEADER } from './constants.ts';

export interface ImageCodec {
  /**
   * Image height.
   */
  height: number;
  /**
   * Image width.
   */
  width: number;
  /**
   * Image number of channels.
   */
  channels: number;
  /**
   * Image number of channels excluding alpha.
   */
  components?: number;
  /**
   * Image bit depth.
   */
  bitsPerPixel: number;
  /**
   * Image compression type.
   */
  compression?: number;
  /**
   * Defines which bits represent which color.
   */
  colorMasks?: number[];
  /**
   * Horizontal number of pixels per meter.
   */
  xPixelsPerMeter?: number;
  /**
   * Vertical number of pixels per meter.
   */
  yPixelsPerMeter?: number;
  /**
   * Image data.
   */
  data: IOBuffer | ArrayBufferLike | ArrayBufferView | Buffer;
}

export default class BMPEncoder {
  width: number;
  height: number;
  bitsPerPixel: number;
  channels: number;
  components: number;
  data: Uint8Array;
  xPixelsPerMeter: number;
  yPixelsPerMeter: number;
  encoded: IOBuffer = new IOBuffer();
  compression: number;
  colorMasks: [number, number, number];

  constructor(data: ImageCodec) {
    if (!data.height || !data.width) {
      throw new Error('ImageData width and height are required.');
    }
    this.data = data.data as Uint8Array;
    this.width = data.width;
    this.height = data.height;
    if (this.data.length !== data.width * data.height * data.channels) {
      throw new Error('Invalid data length.');
    }
    this.bitsPerPixel = data.bitsPerPixel;
    if (
      this.bitsPerPixel !== 1 &&
      this.bitsPerPixel !== 8 &&
      this.bitsPerPixel !== 24 &&
      this.bitsPerPixel !== 32
    ) {
      throw new Error(
        `Invalid number of bits per pixel. Supported number of bits per pixel: 1, 8, 24, 32. Received: ${this.bitsPerPixel}`,
      );
    }
    this.channels = data.channels;
    this.components =
      this.channels % 2 === 0 ? this.channels - 1 : this.channels;
    this.xPixelsPerMeter =
      data.xPixelsPerMeter ?? BITMAPV5HEADER.DEFAULT_PIXELS_PER_METER;
    this.yPixelsPerMeter =
      data.yPixelsPerMeter ?? BITMAPV5HEADER.DEFAULT_PIXELS_PER_METER;
    this.compression = data.compression ?? 0;
    this.colorMasks = (data.colorMasks as [number, number, number]) ?? [
      0x00ff0000, 0x0000ff00, 0x000000ff,
    ];
  }

  encode() {
    this.encoded = new IOBuffer();
    this.encoded.skip(14);

    this.writeBitmapV5Header();
    if (this.bitsPerPixel <= 8) {
      this.writeColorTable();
    }

    const offset = this.encoded.offset;

    this.writePixelArray();

    const imageSize = this.encoded.getWrittenByteLength();

    this.encoded.rewind();
    this.writeBitmapFileHeader(offset, imageSize);

    return this.encoded.toArray();
  }

  private writePixelArray() {
    this.encoded.setBigEndian();
    if (this.bitsPerPixel === 1) {
      this.writeBitDepth1Pixels();
    } else if (this.channels === this.components) {
      this.writeStandardPixels();
    } else {
      this.writePixelsWithAlpha();
    }
    this.encoded.setLittleEndian();
  }

  private writeBitDepth1Pixels() {
    let byte = 0;
    for (let row = this.height - 1; row >= 0; row--) {
      for (let col = 0; col < this.width; col++) {
        if (col % 32 === 0 && col !== 0) {
          this.encoded.writeUint32(byte);
          byte = 0;
        }
        byte |= this.data[row * this.width + col] << (31 - (col % 32));
      }
      this.encoded.writeUint32(byte);
      byte = 0;
    }
  }

  private writeStandardPixels() {
    for (let row = 0; row < this.height; row++) {
      const rowOffset = this.width * (this.height - row - 1) * this.channels;
      for (let col = 0; col < this.width; col++) {
        for (let channel = this.channels - 1; channel >= 0; channel--) {
          this.encoded.writeByte(
            this.data[rowOffset + col * this.channels + channel],
          );
        }
      }
      this.writePadding();
    }
  }

  private writePixelsWithAlpha() {
    const pixel = 0;
    for (let row = 0; row < this.height; row++) {
      const rowOffset = this.width * (this.height - row - 1);
      for (let col = 0; col < this.width; col++) {
        const pixelIndex = (rowOffset + col) * this.channels;
        this.encoded.writeUint32(
          pixel |
            (this.data[pixelIndex + 2] << (3 * 8)) |
            (this.data[pixelIndex + 1] << (2 * 8)) |
            (this.data[pixelIndex] << 8) |
            this.data[pixelIndex + 3],
        );
      }
    }
  }

  private writePadding() {
    const padding =
      (this.width * this.channels) % 4 === 0
        ? 0
        : 4 - ((this.width * this.channels) % 4);

    for (let i = 0; i < padding; i++) {
      this.encoded.writeByte(0);
    }
  }

  private writeColorTable() {
    if (this.bitsPerPixel === 1) {
      this.encoded
        .writeUint32(0x00000000) // black
        .writeUint32(0x00ffffff); // white
    } else {
      //Grayscale 8 bit
      for (let i = 0; i < 256; i++) {
        this.encoded.writeUint32(
          0x00000000 | (i << (4 * 4)) | (i << (2 * 4)) | i,
        );
      }
    }
  }

  writeBitmapFileHeader(imageOffset: number, fileSize: number) {
    this.encoded
      .writeChars('BM') // 14 bytes bitmap file header
      .writeInt32(fileSize) // Size of BMP file in bytes
      .writeUint16(0)
      .writeUint16(0)
      .writeUint32(imageOffset);
  }

  writeBitmapV5Header() {
    const rowSize = Math.floor((this.bitsPerPixel * this.width + 31) / 32) * 4;
    const totalBytes = rowSize * this.height;

    // Size of the header
    this.encoded
      .writeUint32(124) // Header size, offset 14
      .writeInt32(this.width) // bV5Width, offset 18
      .writeInt32(this.height) // bV5Height, offset 22
      .writeUint16(1) // bv5Planes - must be set to 1, offset 26
      .writeUint16(this.bitsPerPixel) // bV5BitCount, offset 30
      .writeUint32(this.compression) // bV5Compression - No compression, offset 34
      .writeUint32(totalBytes) // bv5SizeImage - size of pixel buffer (can be 0 if uncompressed), offset 38
      .writeInt32(this.xPixelsPerMeter) // bV5XPelsPerMeter - resolution, offset 42
      .writeInt32(this.yPixelsPerMeter) // bV5YPelsPerMeter - resolution, offset 46
      .writeUint32(this.bitsPerPixel <= 8 ? 2 ** this.bitsPerPixel : 0) // number of colors used, set to 0 if number of pixels is bigger than 8 set to 0, offset 50
      .writeUint32(this.bitsPerPixel <= 8 ? 2 ** this.bitsPerPixel : 0); // number of important colors, set to 0 if number of pixels is bigger than 8 set to 0,  offset 54
    if (
      this.bitsPerPixel === 32 &&
      (this.colorMasks[0] !== 0x00ff0000 ||
        this.colorMasks[1] !== 0x0000ff00 ||
        this.colorMasks[2] !== 0x000000ff)
    ) {
      throw new Error(
        `Unsupported color masks detected in 32-bit BMP image. Only standard RGBA (${(0x00ff0000).toString(
          16,
        )}, ${(0x0000ff00).toString(16)}, ${(0x000000ff).toString(
          16,
        )}) masks are supported. Received: ${this.colorMasks[0].toString(
          16,
        )},${this.colorMasks[1].toString(16)},${this.colorMasks[2].toString(
          16,
        )}.`,
      );
    }
    this.encoded
      .writeUint32(this.colorMasks[0]) // bV5RedMask, offset 58
      .writeUint32(this.colorMasks[1]) // bV5GreenMask, offset 62
      .writeUint32(this.colorMasks[2]) // bV5BlueMask, offset 66
      .writeUint32(this.channels === this.components ? 0x00000000 : 0xff000000) // bv5ReservedData
      .writeUint32(BITMAPV5HEADER.LogicalColorSpace.LCS_sRGB)
      .skip(36) // bV5Endpoints
      .skip(12) // bV5GammaRed, Green, Blue
      .writeUint32(BITMAPV5HEADER.GamutMappingIntent.LCS_GM_GRAPHICS)
      .skip(12); // ProfileData, ProfileSize, Reserved
  }
}
