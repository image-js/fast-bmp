import { IOBuffer } from 'iobuffer';

export default class BMPDecoder {
  bufferData: IOBuffer;
  pixelDataOffset: number;
  width: number;
  height: number;
  bitDepth: number;

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
  }

  decode() {
    this.bufferData.seek(this.pixelDataOffset);
    this.bufferData.setLittleEndian();

    let currentNumber = 0;
    let currentWordIndex = 0;
    let currentWord = 0;
    let currentDataIndex = 0;
    const rowSize = Math.floor((this.width + 31) / 32) * 4;

    const data = new Uint8Array(Math.ceil((this.height * this.width) / 8));
    this.bufferData.seek(this.pixelDataOffset);
    this.bufferData.mark();
    for (let row = this.height - 1; row >= 0; row--) {
      this.bufferData.skip(row * rowSize);
      for (let col = 0; col < this.width; col++) {
        const byte = Math.ceil((col + 1) / 8);
        const bitIndex = col % 32;
        if (col % 32 === 0) {
          currentNumber = this.bufferData.readUint32();
        }
        const currentBit =
          currentNumber & (1 << (byte * 8 - (bitIndex % 8) - 1));

        if (currentWordIndex % 8 === 0 && currentWordIndex !== 0) {
          data[currentDataIndex++] = currentWord;
          currentWordIndex = 0;
          currentWord = 0;
        }

        const mask = currentBit
          ? 1 << (8 - (currentWordIndex % 8) - 1)
          : 0 << (8 - (currentWordIndex % 8) - 1);
        currentWord |= mask;
        currentWordIndex++;
      }
      this.bufferData.reset();
    }
    data[currentDataIndex] = currentWord;
    const channels = Math.ceil(this.bitDepth / 8);
    const components = channels % 2 === 0 ? channels - 1 : channels;
    return {
      width: this.width,
      height: this.height,
      bitDepth: this.bitDepth,
      channels,
      components,
      data,
    };
  }
}
