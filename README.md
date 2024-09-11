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

In [MakeCode](https://makecode.microbit.org/)
