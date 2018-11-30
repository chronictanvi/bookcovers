// > make data set
// > make switch cases for data set
// > try to figure out how to take data from csv file// > try to read title/author from csv file

//> update Mac to latest os :(
//> learn github
//> put on github :o

//> metadata
//> aesthetix w ratix

var title = "title";
var author = "name";
var c64Letters = " qQwWeErRtTyYuUiIoOpPaAsSdDfFgGhHjJkKlL:zZxXcCvVbBnNmM1234567890.";
var screenWidth = 1200;
var screenHeight = 800;


var minTitle = 2;
var maxTitle = 60;

var coverWidth = 200;
var coverHeight = 400;


var margin = 4;
var titleHeight = 10;
var authorHeight = 25;
var artworkStartX = 100;
var artworkStartY = coverHeight - coverWidth;
var coverStartY = 20;

var titleFont;
var authorFont;
var titleFontSize = 18;
var authorFontSize = 14;



var baseVariation = 100;
var baseSaturation = 300;
var baseBrightness = 90;
var colorDistance = 100;
var invert = false;

var gridCount;
var shapeThickness = 10;

var callNumber;
var pg;
var table;


//var font;
  //fontsize = 40

function preload() {
  table = loadTable("dataset.csv", "csv", "header");
 titleFont = loadFont('Acme-Regular.ttf');
 authorFont =loadFont('Acme-Regular.ttf');
}





function c64Convert() {
  // returns a string with all the c64-letter available in the title or a random set if none
  var result = "";
  var len = title.length;
  var letter;
  for (var i = 0; i < len; i++) {
    letter = title.charAt(i);
    // println("letter:" + letter + " num:" + int(letter));
    if (c64Letters.indexOf(letter) == -1) {
      var randomIndex = Math.floor(Math.random() * c64Letters.length)
      //  var anIndex = int(letter)%c64Letters.length;//floor(random(c64Letters.length()));
      letter = c64Letters.charAt(randomIndex);
    }
    // println("letter:" + letter);
    result = result + letter;
  }
  // println("result:" + result);
  return result;
}




function processColors() {
  var counts = title.length + author.length;
  //var colorSeed = parseInt(map(counts, 2, 80, 10, 360)); // 80 is the max value the number of characters can be
  var colorSeed;
  var callCatergory = callNumber.substring(0, 2); //gets first two letters of the string
  if (callCatergory === "0B") {
    colorSeed = 1;
  } else if (callCatergory === "0E") {
    colorSeed = 20;
  } else if (callCatergory === "GN") {
    colorSeed = 40;
  } else if (callCatergory === "HQ") {
    colorSeed = 50;
  } else if (callCatergory === "JA") {
    colorSeed = 70;
  } else if (callCatergory === "JC") {
    colorSeed = 80;
  } else if (callCatergory === "NC") {
    colorSeed = 90;
  } else if (callCatergory === "PL") {
    colorSeed = 100;
  } else if (callCatergory === "PN") {
    colorSeed = 120;
  } else if (callCatergory === "PR") {
    colorSeed = 140;
  } else if (callCatergory === "PS") {
    colorSeed = 160;
  } else if (callCatergory === "PQ") {
    colorSeed = 180;
  } else if (callCatergory === "0Q") {
    colorSeed = 200;
  } else if (callCatergory === "0S") {
    colorSeed = 220;
  } else if (callCatergory === "0T") {
    colorSeed = 240;
  } else if (callCatergory === "0Z") {
    colorSeed = 260;
  } else {
    colorSeed = 300;
  }

  colorMode(HSB, 360, 90, 90);
  // int rndSeed = colorSeed + int(random(baseVariation));
  // int darkOnLight = (floor(random(2))==0) ? 1 : -1;
  //

  shapeColor = color(colorSeed, baseSaturation, baseBrightness - (counts % 20), 0.7); // 55+(darkOnLight*25));
  baseColor = color((colorSeed + colorDistance) % 360, baseSaturation, baseBrightness); // 55-(darkOnLight*25));
  if (invert) {
    var tempColor = shapeColor;
    shapeColor = baseColor;
    baseColor = tempColor;
  }
  // println("inverted:"+(counts%10));
  // if length of title+author is multiple of 10 make it inverted
  if (counts % 10 == 0) {
    var tmpColor = baseColor;
    baseColor = shapeColor;
    shapeColor = tmpColor;
  }
  console.log("baseColor:" + baseColor);
  console.log("shapeColor:" + shapeColor);
  colorMode(RGB, 255);
}

function drawBackground() {
  pg.background(0);
  pg.fill(60,50,300);
  pg.rect(0, 0, coverWidth, 25);
}

function drawArtwork() {

  breakGrid();
  var gridSize = coverWidth / gridCount;
  var item = 0;
  pg.fill(baseColor);
  pg.rect(0, 0, coverWidth, coverHeight * margin / 20);
  pg.rect(0, 0 + artworkStartY , coverWidth, coverWidth);
  // pg.rect(0, 0, coverHeight * margin / 100 * 0.5, coverHeight);
  // pg.rect(coverWidth - (coverHeight * margin / 100 * 0.5), 0, coverHeight * margin / 100 * 0.5, coverHeight);
  var c64Title = c64Convert();
  // console.log();("c64Title.length(): "+c64Title.length());
  //console.log(c64Title);
  for (var i = 0; i < gridCount; i++) {
    for (var j = 0; j < gridCount; j++) {
      var character = c64Title.charAt(item % c64Title.length);
      drawShape(character, 0 + (j * gridSize), 0 + artworkStartY + (i * gridSize), gridSize);
      item++;
    }
  }
}


function breakGrid() {
  var len = title.length;
  // println("title length:"+len);
  if (len < minTitle) len = minTitle;
  if (len > maxTitle) len = maxTitle;
  gridCount = parseInt(map(len, minTitle, maxTitle, 10, 20)); // play around with 2/11
}

function drawText() {
  //…
  pg.fill(50);
  pg.textFont(titleFont, titleFontSize);
  pg.textLeading(titleFontSize);
  pg.text(title, 0 + (coverHeight * margin / 100), 0 + (coverHeight * margin / 100 * 2), coverWidth - (2 * coverHeight * margin / 100), titleHeight);
  // fill(255);
  pg.textFont(authorFont, authorFontSize);
  pg.text(author, 0 + (coverHeight * margin / 100), 0 + titleHeight, coverWidth - (2 * coverHeight * margin / 100), authorHeight);
}

function drawShape(k, x, y, s) {
  pg.ellipseMode(CORNER);
  pg.fill(shapeColor);
  var thick = parseInt(s * shapeThickness / 100);
  switch (k) {
    case 'q':
    case 'Q':
      pg.ellipse(x, y, s, s);
      break;
    case 'w':
    case 'W':
      pg.ellipse(x, y, s, s);
      s = s - (thick * 2);
      pg.fill(baseColor);
      pg.ellipse(x + thick, y + thick, s, s);
      break;
    case 'e':
    case 'E':
      pg.rect(x, y + thick, s, thick);
      break;
    case 'r':
    case 'R':
      // pg.arc(x, y*2, s*2, s*6, PI, PI + HALF_PI);
      pg.rect(x, y + s - (thick * 2), s, thick);
      pg.arc(x, y, s * 2, s * 2, PI, PI + HALF_PI);
      break;
    case 't':
    case 'T':
      pg.rect(x + thick, y, thick, s);
      break;
    case 'y':
    case 'Y':
      pg.rect(x + s - (thick * 2), y, thick, s);
      break;
    case 'u':
    case 'U':
      pg.arc(x, y, s * 2, s * 2, PI, PI + HALF_PI);
      pg.fill(baseColor);
      pg.arc(x + thick, y + thick, (s - thick) * 2, (s - thick) * 2, PI, PI + HALF_PI);
      break;
    case 'i':
    case 'I':
      pg.arc(x - s, y, s * 2, s * 2, PI + HALF_PI, TWO_PI);
      pg.fill(baseColor);
      pg.arc(x - s + thick, y + thick, (s - thick) * 2, (s - thick) * 2, PI + HALF_PI, TWO_PI);
      break;
    case 'o':
    case 'O':
      pg.rect(x, y, s, thick);
      pg.rect(x, y, thick, s);
      break;
    case 'p':
    case 'P':
      pg.rect(x, y, s, thick);
      pg.rect(x + s - thick, y, thick, s);
      break;
    case 'a':
    case 'A':
      pg.triangle(x, y + s, x + (s / 2), y, x + s, y + s);
      break;
    case 's':
    case 'S':
      pg.triangle(x, y, x + (s / 2), y + s, x + s, y);
      break;
    case 'd':
    case 'D':
      pg.rect(x, y + (thick * 2), s, thick);
      break;
    case 'f':
    case 'F':
      pg.rect(x, y + s - (thick * 3), s, thick);
      break;
    case 'g':
    case 'G':
      pg.rect(x + (thick * 2), y, thick, s);
      break;
    case 'h':
    case 'H':
      pg.rect(x + s - (thick * 3), y, thick, s);
      break;
    case 'j':
    case 'J':
      pg.arc(x, y - s, s * 2, s * 2, HALF_PI, PI);
      pg.fill(baseColor);
      pg.arc(x + thick, y - s + thick, (s - thick) * 2, (s - thick) * 2, HALF_PI, PI);
      break;
    case 'k':
    case 'K':
      pg.arc(x - s, y - s, s * 2, s * 2, 0, HALF_PI);
      pg.fill(baseColor);
      pg.arc(x - s + thick, y - s + thick, (s - thick) * 2, (s - thick) * 2, 0, HALF_PI);
      break;
    case 'l':
    case 'L':
      pg.rect(x, y, thick, s);
      pg.rect(x, y + s - thick, s, thick);
      break;
    case ':':
      pg.rect(x + s - thick, y, thick, s);
      pg.rect(x, y + s - thick, s, thick);
      break;
    case 'z':
    case 'Z':
      pg.triangle(x, y + (s / 2), x + (s / 2), y, x + s, y + (s / 2));
      pg.triangle(x, y + (s / 2), x + (s / 2), y + s, x + s, y + (s / 2));
      break;
    case 'x':
    case 'X':
      pg.ellipseMode(CENTER);
      pg.ellipse(x + (s / 2), y + (s / 3), thick * 2, thick * 2);
      pg.ellipse(x + (s / 3), y + s - (s / 3), thick * 2, thick * 2);
      pg.ellipse(x + s - (s / 3), y + s - (s / 3), thick * 2, thick * 2);
      pg.ellipseMode(CORNER);
      break;
    case 'c':
    case 'C':
      pg.rect(x, y + (thick * 3), s, thick);
      break;
    case 'v':
    case 'V':
      pg.rect(x, y, s, s);
      pg.fill(baseColor);
      pg.triangle(x + thick, y, x + (s / 2), y + (s / 2) - thick, x + s - thick, y);
      pg.triangle(x, y + thick, x + (s / 2) - thick, y + (s / 2), x, y + s - thick);
      pg.triangle(x + thick, y + s, x + (s / 2), y + (s / 2) + thick, x + s - thick, y + s);
      pg.triangle(x + s, y + thick, x + s, y + s - thick, x + (s / 2) + thick, y + (s / 2));
      break;
    case 'b':
    case 'B':
      pg.rect(x + (thick * 3), y, thick, s);
      break;
    case 'n':
    case 'N':
      pg.rect(x, y, s, s);
      pg.fill(baseColor);
      pg.triangle(x, y, x + s - thick, y, x, y + s - thick);
      pg.triangle(x + thick, y + s, x + s, y + s, x + s, y + thick);
      break;
    case 'm':
    case 'M':
      pg.rect(x, y, s, s);
      pg.fill(baseColor);
      pg.triangle(x + thick, y, x + s, y, x + s, y + s - thick);
      pg.triangle(x, y + thick, x, y + s, x + s - thick, y + s);
      break;
    case '7':
      pg.rect(x, y, s, thick * 2);
      break;
    case '8':
      pg.rect(x, y, s, thick * 3);
      break;
    case '9':
      pg.rect(x, y, thick, s);
      pg.rect(x, y + s - (thick * 3), s, thick * 3);
      break;
    case '4':
      pg.rect(x, y, thick * 2, s);
      break;
    case '5':
      pg.rect(x, y, thick * 3, s);
      break;
    case '6':
      pg.rect(x + s - (thick * 8), y, thick * 3, s);
      break;
    case '1':
      pg.rect(x, y + (s / 2) - (thick / 2), s, thick);
      pg.rect(x + (s / 2) - (thick / 2), y, thick, s / 2 + thick / 2);
      break;
    case '2':
      pg.rect(x, y + (s / 2) - (thick / 2), s, thick);
      pg.rect(x + (s / 2) - (thick / 2), y + (s / 2) - (thick / 2), thick, s / 2 + thick / 2);
      break;
    case '3':
      pg.rect(x, y + (s / 2) - (thick / 2), s / 2 + thick / 2, thick);
      pg.rect(x + (s / 2) - (thick / 2), y, thick, s);
      break;
    case '0':
      pg.rect(x + (s / 2) - (thick / 2), y + (s / 2) - (thick / 2), thick, s / 2 + thick / 2);
      pg.rect(x + (s / 2) - (thick / 2), y + (s / 2) - (thick / 2), s / 2 + thick / 2, thick);
      break;
    case '.':
      pg.rect(x + (s / 2) - (thick / 2), y + (s / 2) - (thick / 2), thick, s / 2 + thick / 2);
      pg.rect(x, y + (s / 2) - (thick / 2), s / 2 + thick / 2, thick);
      break;
    default:
      pg.fill(baseColor);
      pg.rect(x, y, s, s);
      break;
  }
}


function setup() {
  noLoop();
  // textFont(titleFont);
  // textSize(32);

  //  console.log(table.getColumn("number"))

  var coverBaseColor = color(100,1203, 0);
  var coverShapeColor = color(0);
  var baseColor = coverBaseColor;
  var shapeColor = coverShapeColor;
  // put setup code here
  // console.log(c64Convert("लाल की आत्मकथा")) //iconic

  createCanvas(screenWidth, screenHeight);
  background(0);
  noStroke();
}



function draw() {
  // put drawing code here

  for (var r = 0; r < table.getRowCount(); r++) {
    author = table.getString(r, 0);
    title = table.getString(r, 1);
    callNumber = table.getString(r, 2);
    //console.log(r);


    background(0);
    coverHeight = parseInt(coverWidth * 1.5);
    pg = createGraphics(coverWidth, coverHeight);
    artworkStartY = coverHeight - coverWidth;
    titleFont = textFont("Apercu-Medium");
    authorFont = textFont("Roboto Mono");
    titleFontSize = parseInt(coverWidth *  0.08);
    authorFontSize = parseInt(coverWidth * 0.07);
    titleHeight = parseInt((coverHeight - coverWidth - (coverHeight * margin / 100)) * 0.45);
    authorHeight = parseInt((coverHeight - coverWidth - (coverHeight * margin / 100)) * 0.55);


    processColors();

    pg.noStroke();
    drawBackground();
    drawArtwork();
    drawText();

    image(pg, artworkStartX, coverStartY);
  //  saveCanvas(pg, title, 'jpg');


  }
}
//
// function mousePressed() {
//   rowIndex++;
//   if (rowIndex >= table.getRowCount()) {
//     rowIndex = 0;
//   }
//   redraw();
//
// }
