let staticLayer; // Static layer, used to store fixed images
let dynamicLayer; // Dynamic canvas, can draw dynamic effects
let fallingApple1, fallingApple2, fallingApple3, fallingApple4; // Four variables to store falling apple objects
let isFalling = false; // A boolean variable to control whether the apples start falling, initially set to not falling
let isAnimating = false; // A boolean variable to control whether to perform animation effects, initially set to not animate
let isDragging = false; // Flag variable, used to check whether the button is pressed and dragged
let showCircle = false; // A boolean variable to control whether to display circular flowers.
let circleRadius = 10 + Math.random() * 5; // A variable to store the radius of circular flowers, initial radius is 10 plus a random number within 5, resulting in 15 to 20.
let circleMaxRadius = 30 + Math.random() * 20; // A variable to store the maximum radius of circular flowers, initial maximum radius is 30 plus a random number within 20, resulting in 35 to 40.
let floatingCircles = []; // An array to store information about floating dot snow.

let gravity = 0.3; // Gravity acceleration
let velocity1 = 5, velocity2 = 5, velocity3 = 5, velocity4 = 5; // Initial falling speed of apples

// Global definition of slider button states colors and initial angle of the sun
let normalColor = 'white'; // Normal state color of the button, white
let hoverColor = 'gray'; // Button color when mouse hovers, gray
let dragColor = 'black'; // Button color when dragging, black
let currentColor = normalColor; // Current button color
let angle = 0; // Angle of the sun

// Branch class
// This part modifies the branch class from the group project, enabling it to draw branches on a static canvas
class Branch {
  constructor(pg, x1, y1, x2, y2) {
    this.pg = pg;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.apples = [];
  }

  // Draw the branch
  drawBranch() {
    this.pg.stroke(0, 0, 0);
    this.pg.strokeWeight(1.2);
    this.pg.line(this.x1, this.y1, this.x2, this.y2);
    this.apples.forEach(apple => apple.draw());
  }

  // Add apples
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

  // Calculate the spacing between apples
  calculateSpacing(numApples) {
    return dist(this.x1, this.y1, this.x2, this.y2) / (numApples + 1);
  }
}

// Check if apples overlap
function applesOverlap(apple1, apple2) {
  let distance = dist(apple1.x, apple1.y, apple2.x, apple2.y);
  return distance < (apple1.diameter / 2 + apple2.diameter / 2);
}

// Apple class
// This part modifies the apple class from the group assignment, enabling it to draw apples on a static canvas
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

  // Set position
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  // Set apple style. Draw the apple
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

// The setup function is used to set up the initial environment and properties
function setup() {

  // Enlarge the canvas to 1.1 times its original size to fit the screen ratio
  createCanvas(464 * 1.1, 649 * 1.1);

  // Set up static and dynamic canvases to ensure that the animations on the dynamic canvas are not affected by the static content
  // This technique is sourced from: https://p5js.org/reference/#/p5/createGraphics
  staticLayer = createGraphics(width, height);
  dynamicLayer = createGraphics(width, height);
  drawStaticLayer(staticLayer);

  // Initialize the button property lineX, based on the canvas width, ensuring it adjusts with window resizing
  lineX = width / 2; 

  // Initialize apple colors
  color1 = color(255); 
  color2 = color(255, 192, 203);

  // Initialize 500 floating dots, representing snow
  for (let i = 0; i < 500; i++) {
    floatingCircles.push({
      x: random(width, 5 * width), // Initial x position of the dot on the right side of the canvas
      y: random(-height, height), // Initial y position of the dot at the top area of the canvas
      alpha: 255 // Initial opacity set to 255 (opaque)
    });
  }

  // Initialize four falling apples, with positions based on the canvas coordinates to ensure they adjust with window resizing
  let canvasWidth = width;
  let canvasHeight = height;
  let branchStartX1 = 85 / 464 * canvasWidth; // Starting X position of the first apple
  let branchStartY1 = 40 / 649 * canvasHeight; // Starting Y position of the first apple
  let branchStartX2 = 160 / 464 * canvasWidth; // Starting X position of the second apple
  let branchStartY2 = 195 / 649 * canvasHeight; // Starting Y position of the second apple
  let branchStartX3 = 275 / 464 * canvasWidth; // Starting X position of the third apple
  let branchStartY3 = 170 / 649 * canvasHeight; // Starting Y position of the third apple
  let branchStartX4 = 400 / 464 * canvasWidth; // Starting X position of the fourth apple
  let branchStartY4 = 120 / 649 * canvasHeight; // Starting Y position of the fourth apple

  fallingApple1 = new Apple(dynamicLayer, random(50,70));
  fallingApple1.setPosition(branchStartX1, branchStartY1); // Set the initial position of the first apple

  fallingApple2 = new Apple(dynamicLayer, random(50,70));
  fallingApple2.setPosition(branchStartX2, branchStartY2); // Set the initial position of the second apple

  fallingApple3 = new Apple(dynamicLayer, random(50,70));
  fallingApple3.setPosition(branchStartX3, branchStartY3); // Set the initial position of the third apple

  fallingApple4 = new Apple(dynamicLayer, random(50,70));
  fallingApple4.setPosition(branchStartX4, branchStartY4); // Set the initial position of the fourth apple
}

// Create a canvas that adapts to the browser window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  staticLayer = createGraphics(width, height);
  dynamicLayer = createGraphics(width, height);
  // Update lineX to half the new canvas width
  lineX = width / 2; 
  // Redraw the static image onto the static layer
  drawStaticLayer(staticLayer);
}

// The draw function is used to draw the canvas
function draw() {
  // Store the current canvas width and height to ensure content adapts to window size changes
  let canvasWidth = width;
  let canvasHeight = height;
  dynamicLayer.clear(); // Clear previous dynamic content

  // When isAnimating is true, draw snow
  if (isAnimating) {
    // Update and draw floating dots
    floatingCircles.forEach(circle => {
      circle.x -= random(5, 7); // Random speed on the x-axis
      circle.y += random(5, 7); // Random speed on the y-axis
      circle.alpha -= 0.5; // Gradually reduce opacity to simulate melting snow
      dynamicLayer.fill(255, 255, 255, circle.alpha); // Set the snowflakes to white and apply opacity
      dynamicLayer.noStroke();
      dynamicLayer.ellipse(circle.x, circle.y, 10, 10); // Draw the snowflake
    });
  
    // Update to remove completely transparent dots
    floatingCircles = floatingCircles.filter(circle => circle.alpha > 0);
  }

  // Draw the dynamic layer onto the main canvas
  image(dynamicLayer, 0, 0);

  // Draw flowers at 5 positions
  drawFlower(100 / 464 * canvasWidth, 120);
  drawFlower(180 / 464 * canvasWidth, 230);
  drawFlower(240 / 464 * canvasWidth, 350);
  drawFlower(360 / 464 * canvasWidth, 180);
  drawFlower(325 / 464 * canvasWidth, 300);

  // When isFalling is true, draw falling apples
  if (isFalling) {
    // Update the position of the apples
    if (fallingApple1.y < height - 20) { // Ensure apples do not fall off the canvas
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

    // Set the rebound conditions for the four apples
    if (fallingApple1.y > height-50) {
      fallingApple1.y = height-50;
      velocity1 *= -0.35; // Reduce speed on rebound
    }
    if (fallingApple2.y > height-50) {
      fallingApple2.y = height-50;
      velocity2 *= -0.25; 
    }
    if (fallingApple3.y > height-50) {
      fallingApple3.y = height-50;
      velocity3 *= -0.3; 
    }
    if (fallingApple4.y > height-50) {
      fallingApple4.y = height-50;
      velocity4 *= -0.35; 
    }
  }

  // Draw the falling apples
  fallingApple1.draw();
  fallingApple2.draw();
  fallingApple3.draw();
  fallingApple4.draw();

  // Set basic properties for the sun
  let centerY = 100; // Center y-coordinate
  let radius = 50; // Radius

  // Map the angle of the sun
  let sunAngle = map(lineX, 0, canvasWidth, 0, PI);
  let sunX = lineX; // The x-coordinate of the sun equals lineX
  let sunY = centerY - radius * sin(sunAngle); // Calculate the y-coordinate

  // Draw the sun
  dynamicLayer.fill(240, 146, 0);
  dynamicLayer.noStroke();
  dynamicLayer.ellipse(sunX, sunY, 80, 80); // Draw the sun

  // Set basic properties for the shadow
  let shadowAngle = map(lineX, 0, width, -PI/8, PI/8);
  dynamicLayer.fill(32, 32, 32, 180); // Set the color and opacity of the shadow

  // Rotate the shadow
  dynamicLayer.push(); // Save the current drawing state
  dynamicLayer.translate(width/2, 7*height/8); // Move the origin to the center of rotation
  dynamicLayer.rotate(shadowAngle); // Rotate the canvas

  // Draw the shadow
  dynamicLayer.rect(-5, -48, 10, 88, 5); // Draw the main shadow rectangle
  dynamicLayer.rect(-35, 20, 5, 60, 5); // Draw the small rectangle on the left
  dynamicLayer.rect(25, 20, 5, 60, 5); // Draw the small rectangle on the right
  dynamicLayer.rect(-30, 20, 55, 5, 5); // Draw the connecting bar
  dynamicLayer.rect(-15, 40, 30, 5, 5); // Draw the small rectangle at the bottom
  dynamicLayer.rect(-52, 76, 19, 5, 5); // Draw the left branch
  dynamicLayer.rect(-55, 76, 5, 19, 5); // Draw the left branch
  dynamicLayer.rect(30, 75, 18, 5, 5); // Draw the right branch

  dynamicLayer.fill(32, 32, 32, 200); // Set the color and opacity of the shadow
  dynamicLayer.ellipse(33, 85, 20, 20); 
  dynamicLayer.ellipse(33, 65, 20, 20); 
  dynamicLayer.ellipse(33, 45, 20, 20); 
  dynamicLayer.ellipse(33, 25, 20, 20); 
  dynamicLayer.ellipse(53, 85, 20, 20); 

  dynamicLayer.ellipse(-33, 85, 20, 20); 
  dynamicLayer.ellipse(-33, 65, 20, 20); 
  dynamicLayer.ellipse(-33, 45, 20, 20); 
  dynamicLayer.ellipse(-33, 25, 20, 20); 
  dynamicLayer.ellipse(-53, 83, 20, 20); 
  dynamicLayer.ellipse(-53, 100, 20, 20); 

  dynamicLayer.ellipse(-15, 50, 20, 20); 
  dynamicLayer.ellipse(15, 43, 20, 20); 

  dynamicLayer.ellipse(0, -25, 20, 20); 
  dynamicLayer.ellipse(0, 0, 20, 20); 
  dynamicLayer.ellipse(0, 20, 20, 20); 

  dynamicLayer.pop(); // Restore the previous drawing state

  // Draw the slider button, set the line color, width, and end style
  dynamicLayer.stroke(currentColor); // Set the button color to the current color
  dynamicLayer.strokeWeight(30); // Set the button width to 30 pixels
  dynamicLayer.strokeCap(ROUND); // Set the button end to round
  dynamicLayer.line(lineX, 686*height/905, lineX, 742*height/905); // Draw the button

  // Draw the static layer onto the main canvas
  image(staticLayer, 0, 0);
  // Draw the dynamic layer onto the main canvas
  image(dynamicLayer, 0, 0);
}

// The drawFlower function is used to draw flowers
function drawFlower(x, y) {
  // When showCircle is true, start drawing flowers
  if (showCircle) {
    dynamicLayer.stroke(0); // Set the border color to black
    dynamicLayer.strokeWeight(1); // Set the border width to 1 pixel

    // Draw the main circle
    dynamicLayer.push();
    dynamicLayer.translate(x, y);
    dynamicLayer.fill(color1);
    dynamicLayer.arc(0, 0, circleRadius * 2, circleRadius * 2, -PI / 2, PI / 2);
    dynamicLayer.fill(color2);
    dynamicLayer.arc(0, 0, circleRadius * 2, circleRadius * 2, PI / 2, -PI / 2);
    dynamicLayer.pop();

    // Draw the rotated middle circle
    dynamicLayer.push();
    dynamicLayer.translate(x, y);
    dynamicLayer.rotate(PI / 4);
    dynamicLayer.scale(0.6);
    dynamicLayer.fill(color1);
    dynamicLayer.arc(0, 0, circleRadius * 2, circleRadius * 2, -PI / 2, PI / 2);
    dynamicLayer.fill(color2);
    dynamicLayer.arc(0, 0, circleRadius * 2, circleRadius * 2, PI / 2, -PI / 2);
    dynamicLayer.pop();

    // Draw the smaller circle
    dynamicLayer.push();
    dynamicLayer.translate(x, y);
    dynamicLayer.rotate(PI / 4);
    dynamicLayer.scale(0.5);
    dynamicLayer.fill(color1);
    dynamicLayer.arc(0, 0, circleRadius, circleRadius * 2, -PI / 2, PI / 2);
    dynamicLayer.fill(color2);
    dynamicLayer.arc(0, 0, circleRadius, circleRadius * 2, PI / 2, -PI / 2);
    dynamicLayer.pop();

    // Update the size of the flower
    if (circleRadius < circleMaxRadius) {
      circleRadius += 0.1; // Increase the radius by 0.1 each frame
    }
  }
}

// The drawStaticLayer function is used to store fixed elements
function drawStaticLayer(pg) {
  let canvasWidth = pg.width;
  let canvasHeight = pg.height;

  // Set the background color
  pg.background(146, 157, 155);
  pg.noStroke();

  // Draw the oil painting background
  drawOilPainting(pg, canvasWidth, canvasHeight);
  // Draw the roots
  drawRoots(pg, canvasWidth, canvasHeight);
  // Draw the bottom rectangle
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
  // Colors and positions
  pg.fill(83, 96, 110);
  pg.rect(18, 18, w - 36, h - 36);
  pg.noFill();

  // Draw mottled effects
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

// Draw the bottom rectangle
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

// Draw apples on the bottom rectangle
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

// Draw branches and apples
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
  if (mouseX > lineX - 10 && mouseX < lineX + 10 && mouseY > 686*height/905 && mouseY < 742*height/905) {
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
    if (mouseX > lineX - 10 && mouseX < lineX + 10 && mouseY > 686*height/905 && mouseY < 742*height/905) {
      currentColor = hoverColor;
    } else {
      currentColor = normalColor;
    }
  }
}

// Add mouse release event
function mouseReleased() {
  isDragging = false;
  if (mouseX > lineX - 10 && mouseX < lineX + 10 && mouseY > 686*height/905 && mouseY < 742*height/905) {
    currentColor = hoverColor;
  } else {
    currentColor = normalColor;
  }
}

// Add two keyboard events
function keyPressed() {
  if (key === '1') {
    isFalling = true; // Start falling when '1' is pressed
    isAnimating = true; // Start animation when '1' is pressed
  } else if (key === '2') {
    // Start blooming when '2' is pressed
    showCircle = true; // Activate the display of the circle
    circleRadius = 10; // Reset the initial size of the circle
  }
}