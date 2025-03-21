import { IOBuffer } from 'iobuffer';

import { BITMAPV5HEADER } from './constants';

export interface ImageCodec {
  /**
   * Image bit depth.
   */
  bitDepth: number;
  /**
   * Image height.
   */
  height: number;
  /**
   * Image width.
   */
  width: number;
  /**
   * Image data.
   */
  data: IOBuffer | ArrayBufferLike | ArrayBufferView | Buffer;
  /**
   * Image number of channels.
   */
  channels: number;
  /**
   * Image number of channels excluding alpha.
   */
  components: number;
  /**
   * Horizontal number of pixels per meter.
   */
  xPixelsPerMeter?: number;
  /**
   * Vertical number of pixels per meter.
   */
  yPixelsPerMeter?: number;
}

export default class BMPEncoder {
  width: number;
  height: number;
  bitDepth: number;
  channels: number;
  components: number;
  data: Uint8Array;
  xPixelsPerMeter: number;
  yPixelsPerMeter: number;
  encoded: IOBuffer = new IOBuffer();
  constructor(data: ImageCodec) {
    if (data.bitDepth !== 1) {
      throw new Error('Only bitDepth of 1 is supported');
    }
    if (!data.height || !data.width) {
      throw new Error('ImageData width and height are required');
    }
    this.data = data.data as Uint8Array;
    this.width = data.width;
    this.height = data.height;
    this.bitDepth = data.bitDepth;
    this.channels = data.channels;
    this.components = data.components;
    this.xPixelsPerMeter =
      data.xPixelsPerMeter ?? BITMAPV5HEADER.DEFAULT_PIXELS_PER_METER;
    this.yPixelsPerMeter =
      data.yPixelsPerMeter ?? BITMAPV5HEADER.DEFAULT_PIXELS_PER_METER;
  }

  encode() {
    this.encoded = new IOBuffer();
    this.encoded.skip(14);

    this.writeBitmapV5Header();
    this.writeColorTable();
    const offset = this.encoded.offset;

    this.writePixelArray();

    const imageSize = this.encoded.getWrittenByteLength();

    this.encoded.rewind();
    this.writeBitmapFileHeader(offset, imageSize);

    return this.encoded.toArray();
  }

  writePixelArray() {
    this.encoded.setBigEndian();
    let byte = 0;

    for (let row = this.height - 1; row >= 0; row--) {
      for (let col = 0; col < this.width; col++) {
        if (col % 32 === 0 && row * this.width !== row * this.width + col) {
          this.encoded.writeUint32(byte);
          byte = 0;
        }
        byte |= this.data[row * this.width + col] << (31 - (col % 32));
      }
      this.encoded.writeUint32(byte);
      byte = 0;
    }
    this.encoded.setLittleEndian();
  }

  writeColorTable() {
    // We only handle 1-bit images
    this.encoded
      .writeUint32(0x00000000) // black
      .writeUint32(0x00ffffff); // white
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
    const rowSize = Math.floor((this.bitDepth * this.width + 31) / 32) * 4;
    const totalBytes = rowSize * this.height;
    // Size of the header
    this.encoded
      .writeUint32(124) // Header size
      .writeInt32(this.width) // bV5Width
      .writeInt32(this.height) // bV5Height
      .writeUint16(1) // bv5Planes - must be set to 1
      .writeUint16(this.bitDepth) // bV5BitCount
      .writeUint32(BITMAPV5HEADER.Compression.BI_RGB) // bV5Compression - No compression
      .writeUint32(totalBytes) // bv5SizeImage - size of pixel buffer (can be 0 if uncompressed)
      .writeInt32(this.xPixelsPerMeter) // bV5XPelsPerMeter - resolution
      .writeInt32(this.yPixelsPerMeter) // bV5YPelsPerMeter - resolution
      .writeUint32(2 ** this.bitDepth)
      .writeUint32(2 ** this.bitDepth)
      .writeUint32(0x00ff0000) // bV5BlueMask
      .writeUint32(0x0000ff00) // bV5GreenMask
      .writeUint32(0x000000ff) // bV5RedMask
      .writeUint32(0x00000000) // bv5ReservedData
      .writeUint32(BITMAPV5HEADER.LogicalColorSpace.LCS_sRGB)
      .skip(36) // bV5Endpoints
      .skip(12) // bV5GammaRed, Green, Blue
      .writeUint32(BITMAPV5HEADER.GamutMappingIntent.LCS_GM_GRAPHICS)
      .skip(12); // ProfileData, ProfileSize, Reserved
  }
}
