import pbm2canvas from '../../src/pbm2canvas'

document.addEventListener("DOMContentLoaded", function () {
  testPBM()
  testPGM()
})

function testPBM () {
  let pbm = `P1
# PBM test
5 5
1 0 0 0 0
0 1 0 0 0
0 0 1 0 0
0 1 0 1 0
1 0 0 0 1
`

  let canvas = pbm2canvas(pbm)
  document.body.appendChild(canvas)
}

function testPGM () {
  let pbm = `P2
# Shows the word "FEEP" (example from Netpbm man page on PGM)
24 7
15
0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0
0  3  3  3  3  0  0  7  7  7  7  0  0 11 11 11 11  0  0 15 15 15 15  0
0  3  0  0  0  0  0  7  0  0  0  0  0 11  0  0  0  0  0 15  0  0 15  0
0  3  3  3  0  0  0  7  7  7  0  0  0 11 11 11  0  0  0 15 15 15 15  0
0  3  0  0  0  0  0  7  0  0  0  0  0 11  0  0  0  0  0 15  0  0  0  0
0  3  0  0  0  0  0  7  7  7  7  0  0 11 11 11 11  0  0 15  0  0  0  0
0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0
`

  let canvas = pbm2canvas(pbm)
  document.body.appendChild(canvas)
}
