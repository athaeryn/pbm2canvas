const supportedFormats = [
  'P1'
]

function pbm2canvas (pbmString, canvas) {
  let parsed = parse(pbmString)
  if (!parsed.format) {
    throw new Error('Could not determine format')
  }
  if (!canvas) {
    canvas = document.createElement('canvas')
  }
  draw(canvas, parsed)
  return canvas
}

function draw (canvas, {height, width, data}) {
  let ctx = canvas.getContext('2d')
  canvas.height = height
  canvas.width = width
  let black = ctx.createImageData(1, 1)
  let d = black.data
  d[0] = 0
  d[1] = 0
  d[2] = 0
  d[3] = 255
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[y][x] === 1) {
        ctx.putImageData(black, x, y)
      }
    }
  }
}

//
// {
//   format: 'P1',
//   comment: '# test',
//   width: 5,
//   height: 5,
//   data: [
//     [1, 0, 0, 0, 1],
//     [0, 1, 0, 1, 0],
//     [0, 0, 1, 0, 0],
//     [0, 1, 0, 1, 0],
//     [1, 0, 0, 0, 1]
//   ]
// }
//
function parse (string) {
  let lines = string.split('\n')
  let format = lines.shift().match(/^(P\d)$/)[0]
  if (!format || supportedFormats.indexOf(format) === -1) {
    throw new Error('Could not determine image format')
  }
  let comment = lines.shift()
  let [width, height] = lines.shift()
                          .match(/^(\d+) (\d+)$/)
                          .slice(1)
                          .map(Number)

  let data = lines
               .slice(0, height)
               .map(l => l.split(' ').slice(0, width).map(Number))

  return { format, comment, width, height, data }
}

export default pbm2canvas
