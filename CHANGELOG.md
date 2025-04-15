# Changelog

## [3.0.0](https://github.com/image-js/fast-bmp/compare/v2.0.1...v3.0.0) (2025-04-15)


### ⚠ BREAKING CHANGES

* renamed `bitDepth` to `bitsPerPixel`
* In decoder's output data and encoder's input data, each pixel is now stored as 1 byte per pixel instead of 1 bit per pixel.

### Features

* add 1-bit image decoder ([0607b6b](https://github.com/image-js/fast-bmp/commit/0607b6bf9eef96f5bed6a6e1b7c5e14798aadf40))
* add support for Greyscale, RGB and RGBA images ([3345bce](https://github.com/image-js/fast-bmp/commit/3345bceb2b8642c12275b9a358a6bfa9e7e037c4))
* encode and decode resolution fields xPixelsPerMeter and yPixelsPerMeter ([f239678](https://github.com/image-js/fast-bmp/commit/f2396789567c19db8236325893880bf451e9df4f))

## [2.0.1](https://github.com/image-js/fast-bmp/compare/v2.0.0...v2.0.1) (2022-09-29)


### Bug Fixes

* move eslint-config-cheminfo to dev dependencies ([5b673b5](https://github.com/image-js/fast-bmp/commit/5b673b5e13a10eb1aa63985a21cbddfcf4401e42))

## [2.0.0](https://github.com/image-js/fast-bmp/compare/v1.0.2...v2.0.0) (2022-07-31)


### ⚠ BREAKING CHANGES

* always return a Uint8Array instead of Buffer (#5)

### Miscellaneous Chores

* always return a Uint8Array instead of Buffer ([#5](https://github.com/image-js/fast-bmp/issues/5)) ([e8e7a36](https://github.com/image-js/fast-bmp/commit/e8e7a3659f5869271c916a348a35a899f40e2ac0))

## [1.0.2](https://github.com/image-js/fast-bmp/compare/v1.0.1...v1.0.2) (2022-07-31)


### Bug Fixes

* update iobuffer ([#3](https://github.com/image-js/fast-bmp/issues/3)) ([d4a79b4](https://github.com/image-js/fast-bmp/commit/d4a79b44426713dfb2f3b6450e5d5be6d7e7d2b0))

## [1.0.0](https://github.com/image-js/fast-bmp/compare/v0.0.1...v1.0.0) (2016-12-15)


### Bug Fixes

* **encode:** fix an edge case ([1eac38c](https://github.com/image-js/fast-bmp/commit/1eac38c))
* **encode:** return a Buffer if node.js, Uint8Array otherwise ([d7ea165](https://github.com/image-js/fast-bmp/commit/d7ea165))
