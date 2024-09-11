# Bad Apple on 4 micro:bits

Requires [Bun](https://bun.sh) and [FFmpeg](https://ffmpeg.org/).

To install dependencies:

```bash
bun install
```

To get the video file `badapple-orig.mp4` (requires `yt-dlp`, or you can download the file from another source):

```bash
yt-dlp -f mp4 -o "badapple-orig.mp4" https://www.youtube.com/watch?v=FtutLA63Cp8
```

To run:

```bash
bash ./ffmpeg-scripts.bash
```

In [MakeCode](https://makecode.microbit.org/), create a JavaScript project for each quadrant and paste the corresponding code from the `output/` directory into the editor. You have to press the A button on all 4 micro:bits at the same time for the video to be synchronised.

You may wish to edit the `ffmpeg-scripts.bash` file. On line 4, you can change the time in seconds from 45 to another number.

I was inspired by other people playing Bad Apple on different devices. [People have played Bad Apple on the micro:bit before](https://cirnoslab.me/blog/2023/07/28/bad-apple-on-the-microbit/), and I learned many things from the article linked such as using Base 36 encoding, but this uses 4 micro:bits together to achieve a better picture quality.
