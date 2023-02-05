const fs = require('fs');
const Jimp = require('jimp');
const config = require('./config.json')

// const asciiShades = [
//   " ", ".", "*", "+", "#", "%", "@", ""
// ];

const asciiShades = [
  " ", ".", "•", "`", "^", ":", "*", "+", "#", "@", "%", "8", "B", "M", "W"
  ];

// Make asscii from images
async function frameToAscii(frame) {
  let grayScaleFrame;
  try {
    grayScaleFrame = await Jimp.read(frame);
    grayScaleFrame.resize(config.wSize, config.hSize);
    grayScaleFrame = grayScaleFrame.quality(60).greyscale();
  } catch (err) {
    console.error(err);
    return;
  }

  let ascii = "";
  for (let y = 0; y < grayScaleFrame.bitmap.height; y += 4) {
    for (let x = 0; x < grayScaleFrame.bitmap.width; x++) {
      let shade = grayScaleFrame.getPixelColor(x, y);
      let value = Jimp.intToRGBA(shade).r;
      let char = asciiShades[Math.round((value / 255) * (asciiShades.length - 1))];
      ascii += char;
    }
    ascii += "\n";
  }

  return ascii;
}

// frameToAscii('frames/frame3.jpg').then(
//     ascii => console.log(ascii)
// );

module.exports = {
    frameToAscii: frameToAscii
}