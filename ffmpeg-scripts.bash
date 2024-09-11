#!/usr/bin/env bash
rm -rf output frames output_10x10.mp4 badapple.mp4

ffmpeg -i badapple-orig.mp4 -t 45 -c copy badapple.mp4

mkdir frames
mkdir output

ffmpeg -i badapple.mp4 -vf "scale=10:10" -an output_10x10.mp4
ffmpeg -i output_10x10.mp4 -vf fps=20 -an frames/out%d.png
bun index.ts frames

# TOP LEFT
#ffmpeg -i output_10x10.mp4 -vf "crop=iw/2:ih/2:0:0" top_left.mp4
#ffmpeg -i top_left.mp4 -vf fps=20 frames_tl/out%d.png

# TOP RIGHT
#ffmpeg -i output_10x10.mp4 -vf "crop=iw/2:ih/2:iw/2:0" top_right.mp4
#ffmpeg -i top_right.mp4 -vf fps=20 frames_tr/out%d.png

# BOTTOM LEFT
#ffmpeg -i output_10x10.mp4 -vf "crop=iw/2:ih/2:0:ih/2" bottom_left.mp4
#ffmpeg -i bottom_left.mp4 -vf fps=20 frames_bl/out%d.png

# BOTTOM RIGHT
#ffmpeg -i output_10x10.mp4 -vf "crop=iw/2:ih/2:iw/2:ih/2" bottom_right.mp4
#ffmpeg -i bottom_right.mp4 -vf fps=20 frames_br/out%d.png

#ffmpeg -i output_10x10.mp4 -vf fps=15 frames/out%d.png
