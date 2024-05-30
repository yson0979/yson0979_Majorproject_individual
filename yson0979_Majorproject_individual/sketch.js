let staticLayer;
let dynamicLayer;
// The global variable is used to store the dropped apple
let fallingApple1, fallingApple2, fallingApple3, fallingApple4; 
// Flag variable that controls whether the apple starts to fall
let isFalling = false;  

function setup() {
  createCanvas(464 * 1.4, 649 * 1.4);
  staticLayer = createGraphics(width, height);
  dynamicLayer = createGraphics(width, height);
  drawStaticLayer(staticLayer);

  // Initialize four fallen apples
  let canvasWidth = width;
  let canvasHeight = height;
  let branchStartX1 = 85 / 464 * canvasWidth;// The starting X position of the first apple
  let branchStartY1 = 40 / 649 * canvasHeight;// The starting Y position of the first apple
  let branchStartX2 = 160 / 464 * canvasWidth; // The starting X position of the second apple
  let branchStartY2 = 195 / 649 * canvasHeight;// The starting Y position of the second apple
  let branchStartX3 = 275 / 464 * canvasWidth; // Starting X position of the third apple
  let branchStartY3 = 170 / 649 * canvasHeight; // Starting Y position of the third apple
  let branchStartX4 = 400 / 464 * canvasWidth; // The starting X position of the fourth apple
  let branchStartY4 = 120 / 649 * canvasHeight; // Starting Y position of the fourth apple

  fallingApple1 = new Apple(dynamicLayer, random(50,70));
  fallingApple1.setPosition(branchStartX1, branchStartY1); // Set the initial position of the first apple

  fallingApple2 = new Apple(dynamicLayer, random(50,70));
  fallingApple2.setPosition(branchStartX2, branchStartY2);// Set the initial position of the second apple

  fallingApple3 = new Apple(dynamicLayer, random(50,70));
  fallingApple3.setPosition(branchStartX3, branchStartY3); // Set the initial position of the third apple

  fallingApple4 = new Apple(dynamicLayer, random(50,70));
  fallingApple4.setPosition(branchStartX4, branchStartY4);// Set the initial position of the third apple
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Recreate the layer to fit the new canvas size
  staticLayer = createGraphics(width, height);
  dynamicLayer = createGraphics(width, height);

  // Redraw the static image to the static layer
  drawStaticLayer(staticLayer);
}

function draw() {
  dynamicLayer.clear(); // Clear the previous dynamic content

  if (isFalling) {
    // Update Apple Location
    if (fallingApple1.y < height - 50) { // Make sure the apple doesn't fall off the canvas
      fallingApple1.y += 2; // Move down 2 pixels per frame
    }
    if (fallingApple2.y < height - 50) { // Make sure the apple doesn't fall off the canvas
      fallingApple2.y += 2; // Move down 2 pixels per frame
    }
    if (fallingApple3.y < height - 50) { // Make sure the apple doesn't fall off the canvas
      fallingApple3.y += 2; // Move down 2 pixels per frame
    }
    if (fallingApple4.y < height - 50) { // Make sure the apple doesn't fall off the canvas
      fallingApple4.y += 2; // Move down 2 pixels per frame
    }
  }

  // Draw the fallen apple
  fallingApple1.draw();
  fallingApple2.draw();
  fallingApple3.draw();
  fallingApple4.draw();


  // Draw a dynamic object on a dynamic layer
  dynamicLayer.fill(255, 255, 255, 0); // Set the fill color to white
  dynamicLayer.noStroke(); // No border is drawn

  // Set the line color, width, and endpoint style
  dynamicLayer.stroke(currentColor); // Set the line color to the current color
  dynamicLayer.strokeWeight(20); // Set the line width to 20 pixels
  dynamicLayer.strokeCap(SQUARE); // Set the end of the line to a right Angle
  dynamicLayer.line(lineX, 860, lineX, 890); // Draw vertical lines

  // The center and radius of the circle
  let centerX = 325; // Center x coordinates
  let centerY = 100; // Center y coordinates
  let radius = 50; // Radius

  // Map lineX to [π, 0]
  let angle = map(lineX, 100, 550, PI, 0);
  let sunX = lineX; // The x-coordinate of the sun is directly equal to lineX
  let sunY = centerY - radius * sin(angle); // Calculate y coordinates

  // Draw the sun
  dynamicLayer.fill(240, 146, 0);
  dynamicLayer.noStroke();
  dynamicLayer.ellipse(sunX, sunY, 80, 80); // Draw the sun

  // Paint the static layer onto the main canvas
  image(staticLayer, 0, 0);
  // Paint the dynamic layer onto the main canvas
  image(dynamicLayer, 0, 0);
}

function drawStaticLayer(pg) {
  let canvasWidth = pg.width;
  let canvasHeight = pg.height;

  // Set the background color
  pg.background(146, 157, 155);
  pg.noStroke();

  // Draw the inner layer
  drawOilPainting(pg, canvasWidth, canvasHeight);
  // Draw the root
  drawRoots(pg, canvasWidth, canvasHeight);
  // Draw the bottom rectangle
  drawBottomRectangle(pg, canvasWidth, canvasHeight);
  // Draw branches and apples
  drawBranchesAndApples(pg, canvasWidth, canvasHeight);
}

function drawDynamicLayer(pg) {
  // Draw a dynamic object on a dynamic layer
  // Here you can add any dynamic content you wish to draw on the dynamic layer
  // For example, a shifted circle
  let x = frameCount % width;
  pg.fill(255, 0, 0);
  pg.noStroke();
  pg.ellipse(x, height / 2, 50, 50);
}

function drawRoots(pg, canvasWidth, canvasHeight) {
  let rootX = 16 / 464 * canvasWidth;
  let rootY = 490 / 649 * canvasHeight;
  let rootWidth = 430 / 464 * canvasWidth;
  let rootHeight = 40 / 649 * canvasHeight;
  pg.fill(95, 142, 105);
  pg.rect(rootX, rootY, rootWidth, rootHeight);
}

function drawOilPainting(pg, w, h) {
  pg.fill(83, 96, 110);
  pg.rect(18, 18, w - 36, h - 36);

  pg.noFill();
  for (let i = 0; i < 15000; i++) {
    let strokeWeightValue = random(0.36, 0.08);
    pg.stroke(i % 3 === 0 ? 255 : 220, 230, 219);
    pg.strokeWeight(strokeWeightValue);

    let x1 = random(36, w - 18);
    let y1 = random(36, h - 18);
    let x2 = x1 + random(-50, 50);
    let y2 = y1 + random(-50, 50);
    let cp1x = random(x1 + 10, x1 - 10);
    let cp1y = random(y1 + 10, y1 - 10);
    let cp2x = random(x2 - 10, x2 + 10);
    let cp2y = random(y2 - 10, y2 + 5);

    pg.bezier(x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2);
  }

  pg.fill(46, 58, 73);
  pg.noStroke();
  let xDots = (w - 40) / 5.5;
  let yDots = (h - 40) / 5.5;
  for (let i = 0; i < xDots; i++) {
    for (let j = 0; j < yDots; j++) {
      pg.ellipse(20 + i * 5.5, 20 + j * 5.5, 2, 2);
    }
  }
}

function drawBottomRectangle(pg, canvasWidth, canvasHeight) {
  let rectX = canvasWidth * 120 / 464;
  let rectY = canvasHeight * 485 / 649;
  let rectW = canvasWidth * 220 / 464;
  let rectH = canvasHeight * 50 / 649;

  pg.fill(46, 58, 73);
  pg.stroke(0);
  pg.strokeWeight(1);
  pg.fill(230, 197, 116);
  pg.rect(rectX, rectY, rectW, rectH);
  pg.fill(251, 88, 87);
  pg.rect(rectX, rectY, canvasWidth * 44 / 464, rectH);
  pg.rect(rectX + canvasWidth * 160 / 464, rectY, canvasWidth * 44 / 464, rectH);
  pg.fill(135, 173, 128);
  pg.rect(rectX + canvasWidth * 70 / 464, rectY, canvasWidth * 44 / 464, rectH);

  drawApplesOnRectangle(pg, rectX, rectY, rectW, rectH);
}

function drawApplesOnRectangle(pg, rectX, rectY, rectW, rectH) {
  let apples = [];
  for (let i = 0; i < 6; i++) {
    let appleDiameter = 50;
    let apple = new Apple(pg, appleDiameter);
    let attempts = 0, maxAttempts = 100;
    do {
      let randomX = random(rectX + appleDiameter / 2, rectX + rectW - appleDiameter / 2);
      apple.setPosition(randomX, rectY + rectH / 2);
      if (attempts++ > maxAttempts) {
        break;
      }
    } while (apples.some(a => applesOverlap(a, apple)));
    if (attempts <= maxAttempts) {
      apple.draw();
      apples.push(apple);
    }
  }
}

function drawBranchesAndApples(pg, canvasWidth, canvasHeight) {
  let branches = [
    new Branch(pg, 85 / 464 * canvasWidth, 40 / 649 * canvasHeight, 90 / 464 * canvasWidth, 135 / 649 * canvasHeight),
    new Branch(pg, 90 / 464 * canvasWidth, 135 / 649 * canvasHeight, 125 / 464 * canvasWidth, 132 / 649 * canvasHeight),
    new Branch(pg, 125 / 464 * canvasWidth, 132 / 649 * canvasHeight, 123 / 464 * canvasWidth, 265 / 649 * canvasHeight),
    new Branch(pg, 123 / 464 * canvasWidth, 265 / 649 * canvasHeight, 330 / 464 * canvasWidth, 265 / 649 * canvasHeight),
    new Branch(pg, 330 / 464 * canvasWidth, 265 / 649 * canvasHeight, 328 / 464 * canvasWidth, 110 / 649 * canvasHeight),
    new Branch(pg, 328 / 464 * canvasWidth, 110 / 649 * canvasHeight, 400 / 464 * canvasWidth, 125 / 649 * canvasHeight),
    new Branch(pg, 400 / 464 * canvasWidth, 125 / 649 * canvasHeight, 400 / 464 * canvasWidth, 100 / 649 * canvasHeight),
    new Branch(pg, 232 / 464 * canvasWidth, 255 / 649 * canvasHeight, 232 / 464 * canvasWidth, 195 / 649 * canvasHeight),
    new Branch(pg, 160 / 464 * canvasWidth, 195 / 649 * canvasHeight, 275 / 464 * canvasWidth, 195 / 649 * canvasHeight),
    new Branch(pg, 180 / 464 * canvasWidth, 195 / 649 * canvasHeight, 180 / 464 * canvasWidth, 170 / 649 * canvasHeight),
    new Branch(pg, 275 / 464 * canvasWidth, 195 / 649 * canvasHeight, 275 / 464 * canvasWidth, 170 / 649 * canvasHeight),
    new Branch(pg, 232 / 464 * canvasWidth, 255 / 649 * canvasHeight, 232 / 464 * canvasWidth, 485 / 649 * canvasHeight)
  ];
  branches.forEach(branch => {
    branch.addApples(12);
    branch.drawBranch();
    branch.apples.forEach(apple => {
      apple.draw();
    });
  });

  // Draw the branches and apples reduced by 0.5 times, rotated 180 degrees, and shifted down by 100 units
  pg.push(); // Save the current drawing state
  pg.translate(canvasWidth / 2, canvasHeight / 2); // Move the coordinate origin to the center of the canvas
  pg.rotate(pg.radians(180)); // Rotate 180 degrees
  pg.scale(0.3); // Reduced to 0.5 times the original size
  pg.scale(-1, 1); // Reduced to 0.5 times the original size
  pg.translate(-canvasWidth / 2, -canvasHeight / 2 - 1200); // Move the origin of the coordinates back to the upper left corner and shift down by 100 units
  pg.fill(255, 100, 100); // Set fill color to gray (shadow color)
  pg.stroke(50); // Set the stroke color to gray

  // Guarantee to draw immediately after setting the color
  branches.forEach(branch => {
    branch.drawBranch();
    branch.apples.forEach(apple => {
      apple.draw();
    });
  });

  pg.pop(); // Restore the previous drawing state
}

class Branch {
  constructor(pg, x1, y1, x2, y2) {
    this.pg = pg;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.apples = [];
  }

  drawBranch() {
    this.pg.stroke(0, 0, 0);
    this.pg.strokeWeight(1.2);
    this.pg.line(this.x1, this.y1, this.x2, this.y2);
  }

  drawApples() {
    this.apples.forEach(apple => apple.draw());
  }

  addApples(numApples) {
    let spacing = this.calculateSpacing(numApples);
    let attempts, maxAttempts = 100;

    for (let i = 0; i < numApples; i++) {
      let appleDiameter = random(40, 85);
      let apple = new Apple(this.pg, appleDiameter);
      attempts = 0;

      do {
        let t = (spacing * (i + 3)) / dist(this.x1, this.y1, this.x2, this.y2);
        apple.setPosition(lerp(this.x1, this.x2, t), lerp(this.y1, this.y2, t));

        if (attempts++ > maxAttempts) {
          break;
        }
      } while (this.apples.some(a => applesOverlap(a, apple)));

      if (attempts <= maxAttempts) {
        this.apples.push(apple);
      }
    }
  }

  calculateSpacing(numApples) {
    return dist(this.x1, this.y1, this.x2, this.y2) / (numApples + 1);
  }
}

function applesOverlap(apple1, apple2) {
  let distance = dist(apple1.x, apple1.y, apple2.x, apple2.y);
  return distance < (apple1.diameter / 2 + apple2.diameter / 2);
}

class Apple {
  constructor(pg, diameter) {
    this.pg = pg;
    this.x = 0;
    this.y = 0;
    this.diameter = diameter;
    this.color1 = color(251, 88, 87); 
    this.color2 = color(135, 173, 128); 
    this.orientation = random() < 0.5 ? 'horizontal' : 'vertical'; // Randomly choose horizontal or vertical
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    this.pg.stroke(0); // Set the border color to black
    this.pg.strokeWeight(1); // Set the border width to 2 pixels
    if (this.orientation === 'horizontal') {
      this.pg.fill(this.color1);
      this.pg.arc(this.x, this.y, this.diameter, this.diameter, -HALF_PI, HALF_PI);
      this.pg.fill(this.color2);
      this.pg.arc(this.x, this.y, this.diameter, this.diameter, HALF_PI, -HALF_PI);
    } else {
      this.pg.fill(this.color1);
      this.pg.arc(this.x, this.y, this.diameter, this.diameter, PI, TWO_PI);
      this.pg.fill(this.color2);
      this.pg.arc(this.x, this.y, this.diameter, this.diameter, 0, PI);
    }
  }
}

let isDragging = false; // Flag variable, used to check whether the line is pressed and dragged
let lineX = 325; // The X-coordinate of the line
let normalColor = 'black'; // Normal state color
let hoverColor = 'gray';  
let dragColor = 'red';  
let currentColor = normalColor; // Current color
let angle = 0; // The sun's Angle

function mousePressed() {
  if (mouseX > lineX - 10 && mouseX < lineX + 10 && mouseY > 860 && mouseY < 890) {
    isDragging = true;
    currentColor = dragColor;
  }
}

function mouseDragged() {
  if (isDragging) {
    lineX = constrain(mouseX, 28, 622);
    currentColor = dragColor;
  }
}

function mouseMoved() {
  if (!isDragging) {
    if (mouseX > lineX - 10 && mouseX < lineX + 10 && mouseY > 860 && mouseY < 890) {
      currentColor = hoverColor;
    } else {
      currentColor = normalColor;
    }
  }
}

function mouseReleased() {
  isDragging = false;
  if (mouseX > lineX - 10 && mouseX < lineX + 10 && mouseY > 860 && mouseY < 890) {
    currentColor = hoverColor;
  } else {
    currentColor = normalColor;
  }
}

function keyPressed() {
  if (key === '1') {
    isFalling = true; // When the '1' key is pressed, the drop begins
  }
}
