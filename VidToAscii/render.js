/*
Execute commands in order:

node makeFrames.js
node makeAnimation.js

// Delete folder frames/ with all files inside

for windows: 
rmdir /s /q frames

for linux:
rm -rf frames
*/


const config = require('./config.json')
const exec = require('child_process').exec;

// Verify the config.sys
if (config.sys === "windows"){
    // Make frames
    exec(`node makeFrames.js`, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);

        // Make animation
        exec(`node makeAnimation.js`, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }

            console.log("Animation done!");
            // Delete folder frames/ with all files inside
            exec(`rmdir /s /q frames`, (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    return;
                }

                console.log(stdout);
            })
        })
    })
}
else if (config.sys === "linux"){
    // Make frames
    exec(`node makeFrames.js`, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(stdout);
        // Make animation
        exec(`node makeAnimation.js`, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }

            console.log("Animation done!");
            // Delete folder frames/ with all files inside
            exec(`rm -rf frames`, (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    return;
                }

                console.log(stdout);
            })
        })
    })
}
else{
    console.log("Error: config.sys is not set to windows or linux")
}