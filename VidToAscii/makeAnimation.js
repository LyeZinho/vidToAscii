const fs = require('fs');
const path = require('path');
const { frameToAscii } = require('./frameToAscii');

const inputDir = "frames/";
const outputFile = "ascii.txt";


/*
Frames contains the frames in image 
Name of the images is on format:
frameNUM.jpg
frame1.jpg
frame2.jpg
frame3.jpg
*/

// Get all the image names from frames/ and put on array
const frames = fs.readdirSync(inputDir).filter(file => {
    return file.endsWith(".jpg");
    }
);

// Sort the array
frames.sort((a, b) => {
    const aNum = parseInt(a.replace("frame", "").replace(".jpg", ""));
    const bNum = parseInt(b.replace("frame", "").replace(".jpg", ""));
    return aNum - bNum;
});

// Make ascii from images
async function makeAscii() {
    let ascii = "";

    /*
    The ascii need to be divided by witespace with "_"

    example:

    +++++++++++++++++
    +++++++++++++++++
    +++++++++++++++++
    _
    +++++++++++++++++
    +++++++++++++++++
    +++++++++++++++++
    _
    */

    let averengeFrames = []; 

    let startTime = new Date().getTime();
    for (const frame of frames) {
        console.clear();
        console.log(`Processing: ${frame}`);

        const frameNum = parseInt(frame.replace("frame", "").replace(".jpg", ""));
 
        const currentFrameTime = {
            startTime: 0,
            endTime: 0
        };

        currentFrameTime.startTime = (new Date().getTime() - startTime) / 1000;

        let currentAscii = await frameToAscii(inputDir + frame);

        currentFrameTime.endTime = (new Date().getTime() - startTime) / 1000;
        averengeFrames.push(currentFrameTime);

        // Get the 
        console.log(currentAscii);
        
        ascii += currentAscii;
        ascii += "_";
    }
    console.clear();

    let totalTime = 0;
    for (const frameTime of averengeFrames) {
        totalTime += frameTime.endTime - frameTime.startTime;
    }
    const averengeTime = Math.round((totalTime / averengeFrames.length) * 100) / 100;

    

    console.log(`Averenge time for render each image: ${averengeTime} seconds`);

    console.log(`Took ${(new Date().getTime() - startTime) / 1000} seconds`);

    const frameCount = ascii.split("_").length - 1;
    console.log(`Animated ${frameCount} frames`);

    return ascii;
}


/*
Create a txt file with each ascii divided by "_"

example:

+++++++++++++++++
+++++++++++++++++
+++++++++++++++++
«»
+++++++++++++++++
+++++++++++++++++
+++++++++++++++++
«»
*/

// Write all the ascii to a file
makeAscii().then(
    ascii => fs.writeFileSync(outputFile, ascii)
);