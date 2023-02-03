// Make images from video
const exec = require('child_process').exec;

const inputVideo = 'badapple.mp4';
const frameDirectory = 'frames/';
const fps = 10;

exec(`ffmpeg -i ${inputVideo} -vf fps=${fps} ${frameDirectory}frame%d.jpg`, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
});

