import pbm2canvas from '../../src/pbm2canvas'

document.addEventListener("DOMContentLoaded", function () {
  let pbm = `P1
# test
5 5
1 0 0 0 0
0 1 0 0 0
0 0 1 0 0
0 1 0 1 0
1 0 0 0 1
`

  let canvas = pbm2canvas(pbm)
  document.body.appendChild(canvas)
})
