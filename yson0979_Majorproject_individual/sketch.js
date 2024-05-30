function setup() {
  // Set the canvas size
  createCanvas(464, 649);
  drawCanvas();
}

function windowResized() {
  // Resize the canvas to the window's width and height
  resizeCanvas(windowWidth, windowHeight);
  drawCanvas();
}

function draw() {
  background(146, 157, 155);  // 清除画布并设置背景色
  drawCanvas();  // 绘制基本的画布和静态元素
  drawLines();   // 根据当前鼠标位置绘制动态线条
}

function drawCanvas() {
  // 这里绘制所有不依赖鼠标位置的元素
  // 确保不再调用 background()
  drawOilPainting(width, height);
  drawRoots(width, height);
  drawBottomRectangle(width, height);
  drawBranchesAndApples(width, height);
}

function drawLines() {
  let centerX = constrain(mouseX, 0, width); // 确保中心点在画布内
  let numLines = 150; // 线条数量

  for (let i = 0; i < numLines; i++) {
    let xPosition = map(i, 0, numLines, 0, centerX); // 从画布西侧到鼠标位置均匀放置线条
    stroke(0); // 设置线条颜色为黑色
    line(xPosition, 0, xPosition, height); // 从顶部到底部绘制线条
  }
}

function drawRoots(canvasWidth, canvasHeight) {
  // Calculate and draw the roots rectangle
  let rootX = 16 / 464 * canvasWidth;
  let rootY = 490 / 649 * canvasHeight;
  let rootWidth = 430 / 464 * canvasWidth;
  let rootHeight = 40 / 649 * canvasHeight;
  fill(95, 142, 105);
  rect(rootX, rootY, rootWidth, rootHeight);
}

function drawOilPainting(w, h) {
    // Draw the rectangle for the oil painting
  fill(83, 96, 110);
  rect(18, 18, w - 36, h - 36);

  // Draw multiple bezier curves to create the oil painting effect
  noFill();
  for (let i = 0; i < 2600; i++) {
    let strokeWeightValue = random(0.36, 0.08);
    stroke(i % 3 === 0 ? 255 : 220, 230, 219);
    strokeWeight(strokeWeightValue);

    let x1 = random(36, w - 18);
    let y1 = random(36, h - 18);
    let x2 = x1 + random(-50, 50);
    let y2 = y1 + random(-50, 50);
    let cp1x = random(x1 + 10, x1 - 10);
    let cp1y = random(y1 + 10, y1 - 10);
    let cp2x = random(x2 - 10, x2 + 10);
    let cp2y = random(y2 - 10, y2 + 5);

    bezier(x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2);
  }

  // Draw multiple small ellipses to create the texture
  fill(46, 58, 73);
  noStroke();
  let xDots = (w-40)/5.5
  let yDots =  (h-40)/5.5
 for (let i = 0; i < xDots; i++) {
   for (let j = 0; j < yDots; j++) {
      ellipse(20 + i * 5.5, 20 + j * 5.5, 2, 2);
    }
  }
}

  // Draw the bottom rectangle
function drawBottomRectangle(canvasWidth, canvasHeight) {
  let rectX = canvasWidth * 120 / 464;
  let rectY = canvasHeight * 485 / 649;
  let rectW = canvasWidth * 220 / 464;
  let rectH = canvasHeight * 50 / 649;
  
  // Draw the bottom rectangle
  fill(46, 58, 73);
  stroke(0);
  strokeWeight(1);
  fill(230, 197, 116);
  rect(rectX, rectY, rectW, rectH);
  fill(251, 88, 87);
  rect(rectX, rectY, canvasWidth * 44 / 464, rectH);
  rect(rectX + canvasWidth * 160 / 464, rectY, canvasWidth * 44 / 464, rectH);
  fill(135, 173, 128);
  rect(rectX + canvasWidth * 70 / 464, rectY, canvasWidth * 44 / 464, rectH);
  // Draw apples on the bottom rectangle
  drawApplesOnRectangle(rectX, rectY, rectW, rectH);
}

function drawApplesOnRectangle(rectX, rectY, rectW, rectH) {
  // Add apples to the rectangle
  let apples = [];
  for (let i = 0; i < 6; i++) {
    let appleDiameter = 50;
    let apple = new Apple(appleDiameter);
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

function drawBranchesAndApples(canvasWidth, canvasHeight) {
  // Draw branches and apples
  let branches = [
    new Branch(85 / 464 * canvasWidth, 40 / 649 * canvasHeight, 90 / 464 * canvasWidth, 135 / 649 * canvasHeight),
    new Branch(90 / 464 * canvasWidth, 135 / 649 * canvasHeight, 125 / 464 * canvasWidth, 132 / 649 * canvasHeight),
    new Branch(125 / 464 * canvasWidth, 132 / 649 * canvasHeight, 123 / 464 * canvasWidth, 265 / 649 * canvasHeight),
    new Branch(123 / 464 * canvasWidth, 265 / 649 * canvasHeight, 330 / 464 * canvasWidth, 265 / 649 * canvasHeight),
    new Branch(330 / 464 * canvasWidth, 265 / 649 * canvasHeight, 328 / 464 * canvasWidth, 110 / 649 * canvasHeight),
    new Branch(328 / 464 * canvasWidth, 110 / 649 * canvasHeight, 400 / 464 * canvasWidth, 125 / 649 * canvasHeight),
    new Branch(400 / 464 * canvasWidth, 125 / 649 * canvasHeight, 400 / 464 * canvasWidth, 100 / 649 * canvasHeight),
    new Branch(232 / 464 * canvasWidth, 255 / 649 * canvasHeight, 232 / 464 * canvasWidth, 195 / 649 * canvasHeight),
    new Branch(160 / 464 * canvasWidth, 195 / 649 * canvasHeight, 275 / 464 * canvasWidth, 195 / 649 * canvasHeight),
    new Branch(180 / 464 * canvasWidth, 195 / 649 * canvasHeight, 180 / 464 * canvasWidth, 170 / 649 * canvasHeight),
    new Branch(275 / 464 * canvasWidth, 195 / 649 * canvasHeight, 275 / 464 * canvasWidth, 170 / 649 * canvasHeight),
    new Branch(232 / 464 * canvasWidth, 255 / 649 * canvasHeight, 232 / 464 * canvasWidth, 485 / 649 * canvasHeight)
  ];
  branches.forEach(branch => {
    branch.addApples(12); // Add apples to each branch
    branch.drawApples(); // Draw the apples
    branch.drawBranch(); // Draw the branch
  });
}

function draw() {
  drawCanvas();  // Draw the basic canvas and static elements
  drawLines();   // Draw dynamic lines and interactive elements
}

// Branch class for managing the drawing of branches and apples
class Branch {
  // Constructor initializes a branch with its start and end coordinates
  constructor(x1, y1, x2, y2) {
    this.x1 = x1; // Starting x-coordinate
    this.y1 = y1; // Starting y-coordinate
    this.x2 = x2; // Ending x-coordinate
    this.y2 = y2; // Ending y-coordinate
    this.apples = []; // Array to hold Apple objects on this branch
  }

  // Draws the branch as a line from its start to end points
  drawBranch() {
    stroke(0, 0, 0);  
    strokeWeight(1.2); 
    // Draw the line representing the branch
    line(this.x1, this.y1, this.x2, this.y2); 
  }

  // Draws the apples on the branch
  drawApples() {
    this.apples.forEach(apple => apple.draw());
  }

  // Adds a specified number of apples along the branch
  addApples(numApples) {
    // Calculate spacing between apples along the branch based on the number of apples
    let spacing = this.calculateSpacing(numApples);
    // Temporary variable for attempt count in positioning apples
    let attempts, maxAttempts = 100;

    for (let i = 0; i < numApples; i++) {
      // Randomly determine the diameter for each apple
      let appleDiameter = random(20, 85);
      let apple = new Apple(appleDiameter);
      attempts = 0; // Reset attempts for each apple

      // Position apples ensuring they do not overlap
      do {
        // Calculates the linear interpolation parameter t along the branch and sets the apple position        
        let t = (spacing * (i + 3)) / dist(this.x1, this.y1, this.x2, this.y2);
        apple.setPosition(lerp(this.x1, this.x2, t), lerp(this.y1, this.y2, t));

        // Limit the number of attempts to position each apple to prevent infinite loops
        if (attempts++ > maxAttempts) {
          break;
        }
      } while (this.apples.some(a => applesOverlap(a, apple))); // Check for overlapping apples

        // If the maximum limit is not exceeded, draw and store apples      
        if (attempts <= maxAttempts) {
        this.apples.push(apple);
      }
    }
  }

  // Calculates the distance-based spacing between apples on the branch
  calculateSpacing(numApples) {
    return dist(this.x1, this.y1, this.x2, this.y2) / (numApples + 1);
  }

  // Added method to get the average position and a representative diameter for shadow casting
  getShadowCastingProperties() {
    return {
      x: (this.x1 + this.x2) / 2,
      y: (this.y1 + this.y2) / 2,
      diameter: 10 // Assumed diameter value
    };
  }
}

// Defines a function to check if two apples overlap
function applesOverlap(apple1, apple2) {
  // Calculate the distance between the centers of two apples
  let distance = dist(apple1.x, apple1.y, apple2.x, apple2.y);
  // Return true if the distance is less than the sum of their radii
  return distance < (apple1.diameter / 2 + apple2.diameter / 2);
}

// Apple class for creating and drawing apples
class Apple {
  constructor(diameter) {
    this.x = 0;  // x-coordinate of the apple's center
    this.y = 0;  // y-coordinate of the apple's center
    this.diameter = diameter;  // Diameter of the apple
    this.color1 = color(251, 88, 87);  // One side color - red
    this.color2 = color(135, 173, 128);  // Another side color - green
  }

  // Set the position of the apple
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  // Draw the apple with split colors
  draw() {
    // Set color arrangement by different split, color1 is red, color2 is green
    // Decide the split direction by different random number interval
    if (random() < 0.5) {
      // Split horizontally
      fill(this.color1);
      arc(this.x, this.y, this.diameter, this.diameter, PI, TWO_PI);
      fill(this.color2);
      arc(this.x, this.y, this.diameter, this.diameter, 0, PI);
    } else {
      // Split vertically
      fill(this.color1);
      arc(this.x, this.y, this.diameter, this.diameter, -HALF_PI, HALF_PI);
      fill(this.color2);
      arc(this.x, this.y, this.diameter, this.diameter, HALF_PI, -HALF_PI);
    }
  }
}
