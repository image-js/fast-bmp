# fast-bmp

A library for encoding bmp image file format

# Supported features
For now there is only support for 1-bit image encoding.

# Usage
```js
const bmp = require('fast-bmp');
 // 0 0 0 0 0
 // 0 1 1 1 0
 // 0 1 0 1 0
 // 0 1 1 1 0
 // 0 0 0 0 0
const imageData = {
    width: 5,
    height: 5,
    data: new Uint8Array([0b000000011, 0b10010100, 0b11100000, 0b00000000]),
    bitDepth: 1,
    components: 1,
    channels: 1
};
// Encode returns a Uint8Array
const encoded = bmp.encode(imageData);

// In node.js
fs.writeFileSync('image.bmp', Buffer.from(encoded));
```
