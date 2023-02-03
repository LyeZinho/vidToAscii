// Make images from video
const exec = require('child_process').exec;

const inputVideo = 'badapple.mp4';
const frameDirectory = 'frames/';
const fps = 10;


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
  // Get the last file from frames/ 
  exec(`ls -t ${frameDirectory} | head -1`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Last frame: ${stdout}`);
  })
});
