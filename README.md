# yson0979_major-project


## Instructions

The work utilizes **User Input** to drive animation of ''Apple Tree''. 

The overall design concept follows the inspiration of the group project and is further extended. The interesting changes of the apple tree and other elements are displayed through mouse clicks or keyboard input. The whole has three interactive parts, namely: 
- Click and slide the button to control the movement of the sun and the shadow of the apple tree.
- When the keyboard inputs "1", snow will fall in the sky and apples will fall.
- When the keyboard inputs "2", flowers bloom on the apple tree.

## Animation and difference

In my personal work, there are three animation scenes.
- I added the sun and shadow. When the user clicks the button and slides to control the position of the sun, the angle of the shadow of the apple tree changes accordingly.
- When the user enters "1" on the keyboard, heavy snow will drift by with the wind, and some apples on the tree will fall and rebound.
- When the user enters "2" on the keyboard, an animation of flowers blooming on the apple tree will appear.
The difference between my work and the group's work is that my work is animated by the user's step-by-step operation, while my group's animation is continuous. Since I want to highlight each step of my animation, I set the original group work to a static setting.

## Inspiration for animation

- In the group work, I tried to add the sun and shadow, but because it affected the overall proportion of the picture, I didn't use it in the end, as shown in the figure below. In my personal assignment, I tried to adjust the proportion of the overall canvas to make it harmonious, added the sun and shadow, and let them move with the sliding button to form an interactive process.
<p float="left">
  <img src="[image1.jpg](https://github.com/yson0979/yson0979_Majorproject_individual/assets/168100240/0ac63de3-cf21-48d3-ad63-03847e531814)" width="100" />
  <img src="[image2.jpg](https://github.com/yson0979/yson0979_Majorproject_individual/assets/168100240/69077839-0b7c-451b-86cd-44fa38d740db)" width="100" /> 
</p>


- The inspiration for the flower blooming animation came from an accidental attempt. When I wanted to change the color of the apples in the group work, an image that looked like a flower appeared, as shown below. I added this interesting element to my work. Flowers blooming on the apple tree are like the arrival of spring.



- The inspiration for the falling apples in the snow comes from the picture below. When it snows heavily, the apples will fall. To simulate reality, I added an animation of the apples bouncing back.




## Technical interpretation

### Static layer drawing
- Based on the group creation content, draw static layers, fix all elements, and ensure that the group content does not change in every frame.
- Use "createGraphics" to draw "staticLayer" and "dynamicLayer". The "staticLayer" draws the unchanging background and static elements (group content in this file), and the dynamicLayer draws the changing animation effects (personal content in this file). This technology comes from: https://p5js.org/reference/#/p5/createGraphics

### Sun and shadow motion animation
- Create a slide button to control the movement of the sun and shadow. It is controlled by four mouse monitor events, namely "mousePressed", "mouseDragged", "mouseMoved", and "mouseReleased". Different operations on the slide button will display different colors.

- The position of the slide button is mapped to the angle of the sun through the mapping function "map" (the x position of the slide button from 0 to width is mapped to the angle of the sun from pi to 0). The coordinates of the sun are dynamically calculated according to the position of the button and drawn at the corresponding position. The x position of the sun is consistent with that of the slide button.

- The position of the slide button is mapped to the angle of the shadow through the mapping function "map" (the x position of the slide button from 0 to width is mapped to the angle of the shadow from -PI/8 to PI/8).

### Snow falling and apple falling animation

- Use the Boolean variable "isAnimating" to control snowfall. Create a large number of snowflake objects during initialization and store them in the array "floatingCircles". Update the position of the snowflakes in the draw function (simulate falling with random speed), gradually reduce the transparency (simulate melting effect), and redraw the snowflakes.

- Use the Boolean variable "isFalling" to control whether the apple starts to fall. Update the vertical position and speed of the apple in the draw function to simulate gravity acceleration. After the apple falls to the ground, the rebound effect is achieved by reducing the speed in the opposite direction.

- Use the "keyPressed" function to monitor keyboard key events. When the key "1" is pressed, the function is triggered, and the animation of snowflakes falling and apples falling appears.

### Flower blooming animation

- Use the Boolean variable "showCircle" to control whether the flower is displayed. In the "drawFlower" function, increase the radius of the flower frame by frame to simulate the effect of the flower blooming.

- Use the "keyPressed" function to listen to keyboard key events. When the key "2" is pressed, the function is triggered and the flower blooming animation appears.
