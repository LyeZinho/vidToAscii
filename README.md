# vidToAscii
make ascii animations from videos

Required: ffmpeg, Node.Js

Install ffmpeg:

1. Unzip `ffmpeg` and paste on c:\
2. Insert `C:\ffmpeg\bin` to the path
3. use the command `ffmpeg` for verify the instalation

Help: https://ffmpeg.org/

Install node: 

https://nodejs.org/en/

#

Run the program:

Go to the main folder `cd VidToAscii`

Paste your video on the folder.
: `VidToAscii\VidToAscii\yourvideo.mp4`

1. Set the name of the fie in the config.json
```json
{
    "srcVideo": "<video.mp4>", <- Set for name of your video file.
    "fpsFrameCutting": 10,
    "hSize": 160,
    "wSize": 160,
    "playerFrameRate": 0.03,
    "sys": "windows",
    "renderMode": false
}
```

2. Set how many frames will be cut from your video p/s (frames per second) !Alert many frames per second on longer videos may cause memory overload
use with caution.
For prevent just do the folowing calc.
`VideoSeconds * fps = aproximated amount of frames` 
Ex: `(2min * 60sec) * 10fps = Aprox 1200 Frames (Notice the frames is aproximated because the amount may change based on the ffmpeg cutting process.)`
```json
{
    "srcVideo": "<video.mp4>",
    "fpsFrameCutting": 1, <- Frames cutted per second.
    "hSize": 160,
    "wSize": 160,
    "playerFrameRate": 0.03,
    "sys": "windows",
    "renderMode": false
}
```
videos with more than 8400 frames probably dont will be render. on next step.

3. Set the size of each ascii frame. ! Danger: This is the most danger part if the video has a lot of frames try to put h & w bigger than recomended may cause 
memory overload. Node will close and the process will be stoped.
```json
{
    "srcVideo": "<video.mp4>",
    "fpsFrameCutting": 1,
    "hSize": 160, <- Heigt
    "wSize": 160, <- Widith
    "playerFrameRate": 0.03,
    "sys": "windows",
    "renderMode": false
}
```

#
- Starting the video making process:

1. On the main folder use `node makeFrames.js` for start the frame cutting process its can get a little bit longer.

2. On the main folder use `node makeAnimation.js` for start the rendering process. This process will take a large amount of time.

in the end of the renderingProcess will generate a file named ascii.txt the entire animation is inside the file.

Remenber to delete the frames/ folder.

#
- Play the animation:

The player reads the file ascii.txt just place the file on the folder of play.js and the player will automaticaly reads the animataion 

For play the animation first set the playerFrameRate this set a sleep function for make the animation more smooth and make frames 
get the correct timing for each second. You need to find the correct value for this.
`1 - 1sec`

```json
{
    "srcVideo": "<video.mp4>",
    "fpsFrameCutting": 1,
    "hSize": 160, <- Heigt
    "wSize": 160, <- Widith
    "playerFrameRate": 0.03, <- Frame rate for animation.
    "sys": "windows",
    "renderMode": false
}
```

After this just execute the comand `node play.js` and the animation will start.

#
- Automatic rendering mode

This mode is for make process is more automatic for this can be used for longer rendering for make the 
animation making process automatic. This cut the frames, make animation and delete the frames folder with single command. 

for setup just set your system "windows" default and set render to true.

```json
{
    "srcVideo": "<video.mp4>",
    "fpsFrameCutting": 1,
    "hSize": 160, <- Heigt
    "wSize": 160, <- Widith
    "playerFrameRate": 0.03,
    "sys": "windows", <- System
    "renderMode": false <- Render mode
}
```

After that run the command `node render.js` and the process will start.
