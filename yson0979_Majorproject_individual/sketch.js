let staticLayer; // Static layer
let dynamicLayer; // Dynamic layer
let fallingApple1, fallingApple2, fallingApple3, fallingApple4; // Falling apples
let isFalling = false; // Apple falling state
let isAnimating = false; // Animation state
let isDragging = false; // Dragging flag
let showCircle = false; // Circle visibility
let circleRadius = 10 + Math.random() * 5; // Circle radius (15-20)
let circleMaxRadius = 30 + Math.random() * 20; // Max radius (35-50)
let floatingCircles = []; // Floating circles

// Initial speed and gravity
let gravity = 0.3; // Gravity
let velocity1 = 5, velocity2 = 5, velocity3 = 5, velocity4 = 5; // Initial speeds

// Slider line colors and sun angle
let normalColor = 'rgb(135, 173, 128)'; // Normal color
let hoverColor = 'rgb(230, 197, 116)'; // Hover color
let dragColor = 'rgb(251, 88, 87)'; // Drag color
let currentColor = normalColor; // Current color
let angle = 0; // Sun angle


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
    // Specify fixed colors
    this.color1 = color(251, 88, 87); // Red
    this.color2 = color(135, 173, 128); // Green
    this.orientation = random() < 0.5 ? 'horizontal' : 'vertical'; // Randomly choose horizontal or vertical
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    this.pg.push();
    this.pg.translate(this.x, this.y);
    this.pg.stroke(0); // Set border color to black
    this.pg.strokeWeight(1); // Set border width to 1 pixel
    if (this.orientation === 'horizontal') {
      this.pg.fill(this.color1);
      this.pg.arc(0, 0, this.diameter, this.diameter, -HALF_PI, HALF_PI);
      this.pg.fill(this.color2);
      this.pg.arc(0, 0, this.diameter, this.diameter, HALF_PI, -HALF_PI);
    } else {
      this.pg.fill(this.color1);
      this.pg.arc(0, 0, this.diameter, this.diameter, PI, TWO_PI);
      this.pg.fill(this.color2);
      this.pg.arc(0, 0, this.diameter, this.diameter, 0, PI);
    }
    this.pg.pop();
  }
}


function setup() {
  createCanvas(464 * 1.4, 649 * 1.4);
  staticLayer = createGraphics(width, height);
  dynamicLayer = createGraphics(width, height);
  drawStaticLayer(staticLayer);
  lineX = width / 2; // Initialize lineX

  color1 = color(255); // Initialize colors
  color2 = color(255, 192, 203);

  // Initialize 500 floating circles
  for (let i = 0; i < 500; i++) {
    floatingCircles.push({
      x: random(width, 5 * width), // Initial x position outside canvas
      y: random(-height, height), // Initial y position above canvas
      alpha: 255 // Initial opacity
    });
  }

  // Initialize falling apples
  let canvasWidth = width;
  let canvasHeight = height;
  let branchStartX1 = 85 / 464 * canvasWidth;
  let branchStartY1 = 40 / 649 * canvasHeight;
  let branchStartX2 = 160 / 464 * canvasWidth;
  let branchStartY2 = 195 / 649 * canvasHeight;
  let branchStartX3 = 275 / 464 * canvasWidth;
  let branchStartY3 = 170 / 649 * canvasHeight;
  let branchStartX4 = 400 / 464 * canvasWidth;
  let branchStartY4 = 120 / 649 * canvasHeight;

  fallingApple1 = new Apple(dynamicLayer, random(50, 70));
  fallingApple1.setPosition(branchStartX1, branchStartY1);

  fallingApple2 = new Apple(dynamicLayer, random(50, 70));
  fallingApple2.setPosition(branchStartX2, branchStartY2);

  fallingApple3 = new Apple(dynamicLayer, random(50, 70));
  fallingApple3.setPosition(branchStartX3, branchStartY3);

  fallingApple4 = new Apple(dynamicLayer, random(50, 70));
  fallingApple4.setPosition(branchStartX4, branchStartY4);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  staticLayer = createGraphics(width, height);
  dynamicLayer = createGraphics(width, height);
  lineX = width / 2;
  drawStaticLayer(staticLayer);
}

function draw() {
  let canvasWidth = width;
  let canvasHeight = height;
  dynamicLayer.clear(); // Clear previous content

  // Draw wind
  if (isAnimating) {
    floatingCircles.forEach(circle => {
      circle.x -= random(5, 7);
      circle.y += random(5, 7);
      circle.alpha -= 0.5;
      dynamicLayer.fill(255, 255, 255, circle.alpha);
      dynamicLayer.noStroke();
      dynamicLayer.ellipse(circle.x, circle.y, 10, 10);
    });

    floatingCircles = floatingCircles.filter(circle => circle.alpha > 0);
  }

  // Draw dynamic layer
  image(dynamicLayer, 0, 0);

  // Draw flowers
  drawFlower(100 / 464 * canvasWidth, 120);
  drawFlower(180 / 464 * canvasWidth, 230);
  drawFlower(240 / 464 * canvasWidth, 350);
  drawFlower(360 / 464 * canvasWidth, 180);
  drawFlower(325 / 464 * canvasWidth, 330);

  // Update falling apples
  if (isFalling) {
    if (fallingApple1.y < height - 20) {
      velocity1 += gravity;
      fallingApple1.y += velocity1;
    }
    if (fallingApple2.y < height - 20) {
      velocity2 += gravity;
      fallingApple2.y += velocity2;
    }
    if (fallingApple3.y < height - 20) {
      velocity3 += gravity;
      fallingApple3.y += velocity3;
    }
    if (fallingApple4.y < height - 20) {
      velocity4 += gravity;
      fallingApple4.y += velocity4;
    }

    // Bounce apples
    if (fallingApple1.y > height - 50) {
      fallingApple1.y = height - 50;
      velocity1 *= -0.35;
    }
    if (fallingApple2.y > height - 50) {
      fallingApple2.y = height - 50;
      velocity2 *= -0.25;
    }
    if (fallingApple3.y > height - 50) {
      fallingApple3.y = height - 50;
      velocity3 *= -0.3;
    }
    if (fallingApple4.y > height - 50) {
      fallingApple4.y = height - 50;
      velocity4 *= -0.35;
    }
  }

  // Draw falling apples
  fallingApple1.draw();
  fallingApple2.draw();
  fallingApple3.draw();
  fallingApple4.draw();

  // Draw slider
  dynamicLayer.stroke(currentColor);
  dynamicLayer.strokeWeight(30);
  dynamicLayer.strokeCap(ROUND);
  dynamicLayer.line(lineX, 686 * height / 905, lineX, 742 * height / 905);

  // Draw sun
  let centerY = 100;
  let radius = 50;
  let sunAngle = map(lineX, 0, canvasWidth, 0, PI);
  let sunX = lineX;
  let sunY = centerY - radius * sin(sunAngle);

  dynamicLayer.fill(240, 146, 0);
  dynamicLayer.noStroke();
  dynamicLayer.ellipse(sunX, sunY, 80, 80);

  // Draw shadow
  let shadowAngle = map(lineX, 0, width, -PI / 8, PI / 8);
  dynamicLayer.fill(0, 0, 0, 150);

  dynamicLayer.push();
  dynamicLayer.translate(width / 2, 7 * height / 8);
  dynamicLayer.rotate(shadowAngle);

  dynamicLayer.rect(-5, -40, 10, 80);
  dynamicLayer.rect(-35, 20, 5, 60);
  dynamicLayer.rect(25, 20, 5, 60);
  dynamicLayer.rect(-35, 20, 60, 5);
  dynamicLayer.rect(-15, 40, 30, 5);

  dynamicLayer.pop();

  // Draw static and dynamic layers
  image(staticLayer, 0, 0);
  image(dynamicLayer, 0, 0);
}

// Start drawing flowers
function drawFlower(x, y) {
  if (showCircle) {
    dynamicLayer.stroke(0); // Set border color to black
    dynamicLayer.strokeWeight(1); // Set border width to 1 pixel

    // Draw main circle
    dynamicLayer.push();
    dynamicLayer.translate(x, y);
    dynamicLayer.fill(color1);
    dynamicLayer.arc(0, 0, circleRadius * 2, circleRadius * 2, -PI / 2, PI / 2);
    dynamicLayer.fill(color2);
    dynamicLayer.arc(0, 0, circleRadius * 2, circleRadius * 2, PI / 2, -PI / 2);
    dynamicLayer.pop();

    // Draw rotating middle circle
    dynamicLayer.push();
    dynamicLayer.translate(x, y);
    dynamicLayer.rotate(PI / 4);
    dynamicLayer.scale(0.6);
    dynamicLayer.fill(color1);
    dynamicLayer.arc(0, 0, circleRadius * 2, circleRadius * 2, -PI / 2, PI / 2);
    dynamicLayer.fill(color2);
    dynamicLayer.arc(0, 0, circleRadius * 2, circleRadius * 2, PI / 2, -PI / 2);
    dynamicLayer.pop();

    // Draw smaller circle
    dynamicLayer.push();
    dynamicLayer.translate(x, y);
    dynamicLayer.rotate(PI / 4);
    dynamicLayer.scale(0.5);
    dynamicLayer.fill(color1);
    dynamicLayer.arc(0, 0, circleRadius, circleRadius * 2, -PI / 2, PI / 2);
    dynamicLayer.fill(color2);
    dynamicLayer.arc(0, 0, circleRadius, circleRadius * 2, PI / 2, -PI / 2);
    dynamicLayer.pop();

    // Update flower size
    if (circleRadius < circleMaxRadius) {
      circleRadius += 0.1; // Increase radius by 0.1 per frame
    }
  }
}

// Static canvas
function drawStaticLayer(pg) {
  let canvasWidth = pg.width;
  let canvasHeight = pg.height;

  // Set background color
  pg.background(146, 157, 155);
  pg.noStroke();

  // Draw internal layer
  drawOilPainting(pg, canvasWidth, canvasHeight);
  // Draw roots
  drawRoots(pg, canvasWidth, canvasHeight);
  // Draw bottom rectangle
  drawBottomRectangle(pg, canvasWidth, canvasHeight);
  // Draw branches and apples
  drawBranchesAndApples(pg, canvasWidth, canvasHeight);
}

// Draw roots
function drawRoots(pg, canvasWidth, canvasHeight) {
  let rootX = 16 / 464 * canvasWidth;
  let rootY = 490 / 649 * canvasHeight;
  let rootWidth = 430 / 464 * canvasWidth;
  let rootHeight = 40 / 649 * canvasHeight;
  pg.fill(95, 142, 105);
  pg.rect(rootX, rootY, rootWidth, rootHeight);
}

// Draw oil painting background
function drawOilPainting(pg, w, h) {
  // Color and position
  pg.fill(83, 96, 110);
  pg.rect(18, 18, w - 36, h - 36);
  pg.noFill();

  // Draw small white curves as mottling effect
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

  // Draw small grid dots
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

// Draw bottom rectangle
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

// Draw apples on bottom rectangle
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

// Draw branches and apples 1
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
  });
}

// Add mouse click event
function mousePressed() {
  if (mouseX > lineX - 10 && mouseX < lineX + 10 && mouseY > 686 * height / 905 && mouseY < 742 * height / 905) {
    isDragging = true;
    currentColor = dragColor;
  }
}

// Add mouse drag event
function mouseDragged() {
  if (isDragging) {
    lineX = constrain(mouseX, 0, width);
    currentColor = dragColor;
  }
}

// Add mouse move event
function mouseMoved() {
  if (!isDragging) {
    if (mouseX > lineX - 10 && mouseX < lineX + 10 && mouseY > 686 * height / 905 && mouseY < 742 * height / 905) {
      currentColor = hoverColor;
    } else {
      currentColor = normalColor;
    }
  }
}

// Add mouse release event
function mouseReleased() {
  isDragging = false;
  if (mouseX > lineX - 10 && mouseX < lineX + 10 && mouseY > 686 * height / 905 && mouseY < 742 * height / 905) {
    currentColor = hoverColor;
  } else {
    currentColor = normalColor;
  }
}

// Add two keyboard events
function keyPressed() {
  if (key === '1') {
    isFalling = true; // When '1' key is pressed, start falling
    isAnimating = true; // When '1' key is pressed, start animation
  } else if (key === '2') {
    showCircle = true; // Enable circle display
    circleRadius = 10; // Reset initial circle size
  }
}
