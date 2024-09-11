import natsort from "natsort";
import { Jimp } from "jimp";
import { readdirSync, writeFileSync } from "fs";

const dir = process.argv[2] || "frames";
const dirFiles = readdirSync(dir).filter(x => x.includes("out") && x.includes(".png")).sort(natsort());

let codes = ["", "", "", ""];

for (let i = 0; i < dirFiles.length; i++) {
  const image = await Jimp.read(dir + "/" + dirFiles[i]);
  const { width, height } = image.bitmap;

  const spacingQuadrants = [
    { x: 0, y: 0, w: width / 2, h: height / 2 }, // Top-left
    { x: width / 2, y: 0, w: width / 2, h: height / 2 }, // Top-right
    { x: 0, y: height / 2, w: width / 2, h: height / 2 }, // Bottom-left
    { x: width / 2, y: height / 2, w: width / 2, h: height / 2 } // Bottom-right
  ];

  const quadrants = (spacingQuadrants.map((quad) => {
    return image.clone().crop({ x: quad.x, y: quad.y, w: quad.w, h: quad.h })
  }));

  quadrants.forEach((quad, quadIdx) => {
    let binaryString = "";
    quad.scan(0, 0, quad.bitmap.width, quad.bitmap.height, function (x, y, idx) {
      const red = quad.bitmap.data[idx];
      const green = quad.bitmap.data[idx + 1];
      const blue = quad.bitmap.data[idx + 2];

      const val = Math.floor((red + green + blue) / 3) > 128;
      binaryString += val ? "1" : "0"
    });
    codes[quadIdx] += parseInt(binaryString, 2).toString(36) + ";"
  })
}
const fix = (cc: string) => {
  return `
function decimalToBinary(decimalNumber: number) {
  let binary = "";
  for (; decimalNumber > 0; decimalNumber >>= 1) {
      binary = (decimalNumber & 1) + binary;
  }
  return binary || "0";
}
function padStart(str: string, targetLength: number, padString: string) {
  if (str.length >= targetLength) {
    return str;
  }
  const paddingLength = targetLength - str.length;
  let padding = '';
  while (padding.length < paddingLength) {
    padding += padString;
  }
  return padding.slice(0, paddingLength) + str;
}
let vidString = "${cc}";
input.onButtonPressed(Button.A, function() {
let currentS = "";
let now = input.runningTime();
for (let char = 0; char < vidString.length; char++) {
  if(vidString[char] === ";") {
    let xx = padStart(decimalToBinary(parseInt(currentS, 36)), 25, '0')
    for(let i = 0; i < xx.length; i++) {
      let xC = i % 5;
      let yC = Math.floor(i / 5);
      if(led.point(xC, yC) !== (xx[i]=="1")) led.toggle(xC, yC);
    }
    currentS = "";
    basic.pause(((1000 / 20)) - (input.runningTime() - now));
    now = input.runningTime();
  } else {
    currentS += vidString[char];
  }
}
})
`.trim()
}
writeFileSync("output/top-left.ts", fix(codes[0]))
writeFileSync("output/top-right.ts", fix(codes[1]))
writeFileSync("output/bottom-left.ts", fix(codes[2]))
writeFileSync("output/bottom-right.ts", fix(codes[3]))
