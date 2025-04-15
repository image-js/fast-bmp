# fast-bmp

<h3 align="center">

  <a href="https://www.zakodium.com">
    <img src="https://www.zakodium.com/brand/zakodium-logo-white.svg" width="50" alt="Zakodium logo" />
  </a>

  <p>
    Maintained by <a href="https://www.zakodium.com">Zakodium</a>
  </p>

[![NPM version][npm-image]][npm-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

</h3>

A library for encoding and decoding bmp image file format.
References:

- [Wikipedia BMP format page](https://en.wikipedia.org/wiki/BMP_file_format)
- [Microsoft BMPV5 format page](https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-bitmapv5header)

# Supported features

This library only supports V5 headers.

- binary (1-bit per pixel)
- greyscale (8-bits per pixel)
- RGB (24-bits per pixel)
- RGBA (32-bits per pixel)

# Usage

## Encoding

```js
import { encode } from 'fast-bmp';

// 0 0 0 0 0
// 0 1 1 1 0
// 0 1 0 1 0
// 0 1 1 1 0
// 0 0 0 0 0
const data = new Uint8Array([
  0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
]);
const imageData = {
  width: 5,
  height: 5,
  data,
  bitsPerPixel: 1,
  components: 1,
  channels: 1,
};
// Encode returns a Uint8Array.
const encoded = encode(imageData);
fs.writeFileSync('image.bmp', encoded);
```

## Decoding

```ts
import { decode } from 'fast-bmp';

// 0 0 0 0 0
// 0 1 1 1 0
// 0 1 0 1 0
// 0 1 1 1 0
// 0 0 0 0 0
const buffer = fs.writeFileSync('image.bmp');
const imageData = decode(buffer);
/* Returns object:
{
width: 5,
height: 5,
data: new Uint8Array([
    0, 0, 0, 0, 0, 
    0, 1, 1, 1, 0, 
    0, 1, 0, 1, 0, 
    0, 1, 1, 1, 0, 
    0, 0, 0, 0, 0,
  ]),
bitsPerPixel: 1,
components: 1,
channels: 1,
colorMasks: [0x00ff0000, 0x0000ff00, 0x000000ff],
compression: 0,
xPixelsPerMeter: 2835,
yPixelsPerMeter: 2835,
}
*/
```

[npm-image]: https://img.shields.io/npm/v/fast-bmp.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/fast-bmp
[codecov-image]: https://img.shields.io/codecov/c/github/image-js/fast-bmp.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/image-js/fast-bmp
[download-image]: https://img.shields.io/npm/dm/fast-bmp.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/fast-bmp
