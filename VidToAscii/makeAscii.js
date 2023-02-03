const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const Jimp = require("jimp");

const asciiShades = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";

async function frameToAscii(image) {
  let asciiImage = "";
  for (let i = 0; i < image.bitmap.height; i++) {
    for (let j = 0; j < image.bitmap.width; j++) {
      let { r, g, b } = Jimp.intToRGBA(image.getPixelColor(j, i));
      let value = 0.299 * r + 0.587 * g + 0.114 * b;
      let char = asciiShades[Math.round((value / 255) * (asciiShades.length - 1))];
      asciiImage += char;
    }
    asciiImage += "\n";
  }
  return asciiImage;
}

async function imageToAscii(imagePath) {
  try {
    let image = await Jimp.read(imagePath);
    let asciiImage = await frameToAscii(image);
    return asciiImage;
  } catch (error) {
    console.error(error);
  }
}

async function getFrames() {
  try {
    let frames = fs.readdirSync("frames");
    let asciiFrames = [];
    for (let frame of frames) {
      let asciiFrame = await imageToAscii(`frames/${frame}`);
      asciiFrames.push(asciiFrame);
    }
    return asciiFrames.join("\n");
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  try {
    let asciiFrames = await getFrames();
    await writeFile("asciiFrames.txt", asciiFrames, "utf8");
    console.log("Ascii frames written to asciiFrames.txt");
  } catch (error) {
    console.error(error);
  }
}

main();
