const supportedFormats = [
  'P1',
  'P2'
]

function draw (canvas, { format, height, width, data, maxValue }) {
  let ctx = canvas.getContext('2d')
  canvas.height = height
  canvas.width = width
  switch (format) {
    case 'P1':
      drawPBM(ctx, { height, width, data })
      break
    case 'P2':
      drawPGM(ctx, { height, width, data, maxValue })
      break
  }
}

function drawPBM (ctx, { height, width, data }) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[y][x] === 1) {
        ctx.fillRect(x, y, 1, 1)
      }
    }
  }
}

function drawPGM (ctx, { height, width, data, maxValue }) {
  let imageData = ctx.createImageData(width, height)

  let pixels = imageData.data
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let rawValue = data[y][x]
      let grayValue = rawValue / maxValue * 255
      let pixelAddress = (x + y * width) * 4
      pixels[pixelAddress] = grayValue
      pixels[pixelAddress + 1] = grayValue
      pixels[pixelAddress + 2] = grayValue
      pixels[pixelAddress + 3] = 255
    }
  }
  ctx.putImageData(imageData, 0, 0)
}

//
// {
//   format: 'P1',
//   comment: '# test',
//   maxValue: 1,
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

  let maxValue
  switch (format) {
    case 'P1':
      maxValue = 1
      break
    case 'P2':
      maxValue = Number(lines.shift())
      break
  }

  let data = lines.map(parseLine)

  return { format, comment, width, height, data, maxValue }
}

function parseLine (line) {
  return line
    .replace(/\s+/g, '|')
    .replace(/^\|/, '')
    .split('|')
    .map(Number)
}

export default function pbm2canvas (pbmString, canvas) {
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
