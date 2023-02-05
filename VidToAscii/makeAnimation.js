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
    let startTime = new Date().getTime();
    for (const frame of frames) {
        console.clear();
        console.log(`Processing ${frame}`);
        // Get the time from one frame to other
        let currentAscii = await frameToAscii(inputDir + frame);
        console.log(currentAscii);
        
        ascii += currentAscii;
        ascii += "_";
    }
    console.log(`Took ${(new Date().getTime() - startTime) / 1000} seconds`);
    // Get the count of frames animated
    const frameCount = ascii.split("_").length - 1;

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