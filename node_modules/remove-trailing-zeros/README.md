# Remove Trailing Zeros

![NPM Version](https://img.shields.io/npm/v/remove-trailing-zeros.svg?style=flat)
![License](https://img.shields.io/github/license/rek/remove-trailing-zeros.svg)
![Downloads](https://img.shields.io/npm/dm/remove-trailing-zeros.svg?style=flat)

Remove extra zeros from the end of a string or number.

Performance benchmark: https://jsperf.com/remove-trailing-zeros

## Installation

```
yarn add remove-trailing-zeros
```

## Usage

```
import removeTrailingZeros from 'remove-trailing-zeros'

console.log('Are the same:', removeTrailingZeros('1,230.4000'')) // -> 1,230.4
```
## Examples

```
1 -> 1
10 -> 10
100. -> 100
100.0 -> 100
100.1 -> 100.1
100.10 -> 100.1
100.01 -> 100.01
100.010 -> 100.01
'1.2304000' -> 1.2304
'1,000.000' -> 1,000
```

## License

ISC

[npm-image]: https://img.shields.io/npm/v/remove-trailing-zeros.svg?style=flat
[npm-url]: https://npmjs.org/package/remove-trailing-zeros
[downloads-image]: https://img.shields.io/npm/dm/remove-trailing-zeros.svg?style=flat
[downloads-url]: https://npmjs.org/package/remove-trailing-zeros

## Changelog

 - 1.0.3 - Manually put in an AMD build - TODO: generate this
 - 1.0.2 - Removed let and used var instead, to stop build errors
 - 1.0.0 - Initial release
