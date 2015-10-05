pbm2canvas
==========

A JavaScript library to convert
[PBM](https://en.wikipedia.org/wiki/Netpbm_format) images to canvas.

First iteration will only support P1. Next maybe P4.

# Usage

```js
import pbm2canvas from 'pbm2canvas'

let pbm = `
P1
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
