pbm2canvas
==========

A JavaScript library to convert
[Netpbm](https://en.wikipedia.org/wiki/Netpbm_format) images to canvas.

Currently supporting P1 (black and white) and P2 (grayscale).

# Usage

```js
import pbm2canvas from 'pbm2canvas'

let pbm = `P1
# example for pbm2canvas
5 5
1 0 0 0 1
0 1 0 1 0
0 0 1 0 0
0 1 0 1 0
1 0 0 0 1
`

let canvas = pbm2canvas(pbm)
document.body.appendChild(canvas)
```
