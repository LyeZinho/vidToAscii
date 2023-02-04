// This play the animation from ascii.txt to console
/*
File format:

+++++++++++++++++
+++++++++++++++++
+++++++++++++++++
_+++++++++++++++++
+++++++++++++++++
+++++++++++++++++
_+++++++++++++++++
+++++++++++++++++
+++++++++++++++++

the _ is the separator from one frame to other
*/

const fs = require('fs');
const path = require('path');

const inputFile = "ascii.txt";

// This basically is the delay for make the images more smooth
const delaySeconds = 0.08;

// Read the file
const ascii = fs.readFileSync(inputFile, 'utf8');

// Split the file by "_"
const frames = ascii.split("_");


function sleep(seconds) {
    const stop = new Date().getTime();
    while(new Date().getTime() < stop + seconds * 1000) {
        ;
    }
}

// Play the animation
for (const frame of frames) {
    console.clear();
    console.log(frame);
    sleep(delaySeconds);
}