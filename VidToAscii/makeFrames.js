const fs = require('fs');

// Make images from video
const exec = require('child_process').exec;

const inputVideo = 'jojo.mp4';
const frameDirectory = 'frames/';
const fps = 2;

// Create folder if not exists
if (!fs.existsSync(frameDirectory)) {
  fs.mkdirSync(frameDirectory);
}


// Record the current time
const startTime = new Date().getTime();
console.log("Making frames...")
exec(`ffmpeg -i ${inputVideo} -vf fps=${fps} ${frameDirectory}frame%d.jpg`, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Frames made!");
  console.log(`Took ${(new Date().getTime() - startTime) / 1000} seconds`);
});
