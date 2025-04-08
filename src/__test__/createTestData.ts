import type { ImageCodec } from '../BMPEncoder';
import { BITMAPV5HEADER } from '../constants';

interface CreateTestDataOptions {
  /**
   * Test image width.
   */
  width: number;
  /**
   * Test image height.
   */
  height: number;
  /**
   * Test image data.
   */
  data?: Uint8Array;
  /**
   * Test image color model.
   */
  colorModel: ColorModel;
  /**
   * Test image compression type.
   */
  compression?: 0 | 3;
  /**
   * Test image color masks.
   */
  colorMasks?: number[];
}

type ColorModel = 'BINARY' | 'GREYSCALE' | 'RGB' | 'RGBA';
/**
 * Creates a sample bmp image data for testing purposes.
 * @param options - CreateTestDataOptions.
 * @returns ImageCodec object.
 */
export function createTestData(options: CreateTestDataOptions): ImageCodec {
  const { channels, components, bitsPerPixel } = getChannelsData(
    options.colorModel
  );
  const compression = options.compression ?? 0;
  const colorMasks = options.colorMasks ?? [0x00ff0000, 0x0000ff00, 0x000000ff];

  return {
    width: options.width,
    height: options.height,
    data:
      options.data ?? new Uint8Array(options.width * channels * options.height),
    compression,
    channels,
    components,
    bitsPerPixel,
    colorMasks,
    xPixelsPerMeter: BITMAPV5HEADER.DEFAULT_PIXELS_PER_METER,
    yPixelsPerMeter: BITMAPV5HEADER.DEFAULT_PIXELS_PER_METER,
  };
}

function getChannelsData(colorModel: ColorModel) {
  let bitsPerPixel;
  let channels;
  let components;
  switch (colorModel) {
    case 'BINARY':
      bitsPerPixel = 1;
      channels = Math.ceil(bitsPerPixel / 8);
      components = channels;
      break;
    case 'GREYSCALE':
      bitsPerPixel = 8;
      channels = Math.ceil(bitsPerPixel / 8);
      components = channels;
      break;
    case 'RGB':
      bitsPerPixel = 24;
      channels = Math.ceil(bitsPerPixel / 8);
      components = channels;
      break;
    case 'RGBA':
      bitsPerPixel = 32;
      channels = Math.ceil(bitsPerPixel / 8);
      components = channels - 1;
      break;
    default:
      throw new Error('Invalid color model.');
  }
  return {
    channels,
    components,
    bitsPerPixel,
  };
}
