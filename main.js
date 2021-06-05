let custom_font = ["fontStyle1"];
let pageImage;
let fontSize = 0.35;
let textWidth = 800;
let lineSpace = 95;
let textXAxis = 40;
let textYAxis = 47;
let textData = "PEP HACK 2.0";
let fontText = [];
const downloadBtn = document.getElementById("download");
const textArea = document.querySelector(".text_input");
const xAxisSlider = document.querySelector(".xAxis");
const yAxisSlider = document.querySelector(".yAxis");
const fontSizeSlider = document.querySelector(".fontSize");
const paperEl = document.getElementById("files");

//Upload Custom paper
paperEl.addEventListener("change", (e) => {
  let reader = new FileReader();
  reader.readAsDataURL(paperEl.files[0]);
  reader.onload = function (e) {
    pageImage = loadImage(e.target.result, () => {
      loop();
    });
  };
});

//Set Font size
fontSizeSlider.addEventListener("input", (e) => {
  fontSize = float(e.target.value);
  loop();
});

//Set and get xAxis
xAxisSlider.addEventListener("input", (e) => {
  textXAxis = float(e.target.value);
  loop();
});

//Set and get yAxis
yAxisSlider.addEventListener("input", (e) => {
  textYAxis = float(e.target.value);
  loop();
});

//Get Text From Text Area
textArea.addEventListener("keyup", () => {
  textData = textArea.value;
  loop();
});

//P5 Preload function runs before setup to do stuff before canvas is created
function preload() {
  setCustomFont();
  pageOnCanvas();
  loop();
}

//Sets page Image on Canvas
function pageOnCanvas() {
  pageImage = loadImage("pages/page4.jpg");
  loop();
}

//Use to preload the fonts images fom fontStyle1
let fontDataAvailable = Array.from(new Array(94), (x, i) => i + 32);
fontDataAvailable.splice(64, 1);
function setCustomFont() {
  fontDataAvailable.forEach((i) => {
    try {
      fontText["textImage" + String.fromCharCode(i)] = loadImage(
        str(custom_font) + "/" + str(i) + "_t.png"
      );
    } catch (error) {}
  });
  loop();
}

//Used to create canvas and define its props
function setup() {
  canvas = createCanvas(782, 1000);
  canvas.parent("handWriting_container");
  rectMode(CORNER);
  noLoop();
}

//draw() function continuously executes the lines of code
//contained inside its block until the program is stopped or noLoop() is called.
function draw() {
  image(pageImage, 0, 0, width, height);
  textSize(fontSize);
  fill("#264180");
  if (lineSpace) textLeading(lineSpace);
  position = createVector(textXAxis, textYAxis);
  for (var i = 0; i <= textData.length; i++) {
    if (position.x >= textXAxis + textWidth || textData[i] == "\n") {
      position.x = textXAxis;
      position.y += lineSpace * fontSize;
    }
    if ("textImage" + textData[i] in fontText) {
      if (textData[i])
        image(
          fontText["textImage" + textData[i]],
          position.x,
          position.y,
          fontText["textImage" + textData[i]].width * fontSize,
          fontText["textImage" + textData[i]].height * fontSize
        );
      position.x += fontText["textImage" + textData[i]].width * fontSize;
    }
  }
}

//Download Button func
downloadBtn.addEventListener("click", () => {
  //P5 saveCanvas function
  saveCanvas(canvas, `niikhill.com_${getFormattedTime()}`, "jpg");
});

//Formatting Time for File Name
function getFormattedTime() {
  let today = new Date();
  let y = today.getFullYear();
  // JavaScript months are 0-based.
  let m = today.getMonth() + 1;
  let d = today.getDate();
  let h = today.getHours();
  let mi = today.getMinutes();
  let s = today.getSeconds();
  return y + "-" + m + "-" + d + "-" + h + "-" + mi + "-" + s;
}
