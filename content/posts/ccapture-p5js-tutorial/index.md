---
title: How to save canvas animations with CCapture
cover: ./art.jpg
date: 2019-03-22
description: Saving animations created with p5.js
tags: ['javascript', 'p5js', 'creative-coding', 'tutorial']
---

You’ve been learning p5.js and you’ve created a wonderful animation and now you want to share it with the world. How do you go about that?

We could use screen capture software, but this only works if the animation is running at the right speed. With the above animation, I was getting less than half a frame per second. The [ccapture.js](https://github.com/spite/ccapture.js) library is mentioned in the p5.js documentation and has worked well for me.

If you’d like to follow along with this tutorial you can fork the sandbox below, which has all the code you’ll need to start.

<iframe
                width="1000"
                height="500"
                src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fcodesandbox.io%2Fembed%2Fwy11r18xz8%3Ffontsize%3D14&url=https%3A%2F%2Fcodesandbox.io%2Fs%2Fwy11r18xz8%3Ffontsize%3D14&image=https%3A%2F%2Fcodesandbox.io%2Fapi%2Fv1%2Fsandboxes%2Fwy11r18xz8%2Fscreenshot.png&key=a19fcc184b9711e1b4764040d3dc5c07&type=text%2Fhtml&schema=codesandbox"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

View my codesandbox [here](https://codesandbox.io/s/wy11r18xz8?fontsize=14).

The first thing we’ll need to do is download the [minified CCapture javascript file](https://github.com/spite/ccapture.js/blob/master/build/CCapture.all.min.js). We’ll move the file into our project folder, or upload it to our sandbox folder. Then we need to add it to our index.html file:

```javascript
<script src="p5.min.js"></script>
  <script src="CCapture.all.min.js"></script>
<script src="sketch.js"></script>
```

In the sketch.js file, we need to initialize the capturer object. We also need to specify the framerate we’d like our animation to be. We can do this at the top of our file:

```javascript
let framerate = 30;
var capturer = new CCapture({
  format: 'webm',
  framerate,
  name: 'noise_visualization',
  quality: 100,
});
```

Note that we don’t need to set the framerate using the p5.js `frameRate()` function.

As well as `webm` you can select `jpeg` or `png` for the format, both of which generate a tar file with each frame as an image. According to the documentation, the `gif` format may not perform as well. Keep that in mind if you’re planning on using it.

Using the WebM format means we’ll be able to view the animation as soon as it’s ready. That seems a lot more fun than having to go through converting the images into a video first so we’ll go with that.

Next, we need to start the capturer, we’ll do this at the end of the setup function. You could also start it at any point in the animation, or in response to a key press or mouse click.

```javascript
function setup() {
  // Setup code
  // ...
  capturer.start();
}
```

Now we need to capture the frames, but to do that you need to pass the `canvas` to the `capture` function first. We can make a small change to the `setup` function so we can save the canvas to a variable:

```javascript
// Initialise canvas outside of setup function so it can be used in the draw function
let xseed, yseed, incrementxnoise,incrementynoise, canvas;

function setup() {
  let p5canvas = createCanvas(200, 200);
  canvas = p5canvas.canvas;
  // Rest of setup code
}
```

And now at the end of the draw function, we capture the canvas.

```javascript
function draw() {
  // Code for drawing the frame
  capturer.capture(canvas);
}
```

Now, all we need to do is decide when to stop capturing and then save the animation. We could do this based on elapsed time, using the `millis()` function in p5.js. But it’s likely we want our animation to be a specific length, and if the frames are rendering slowly the elapsed time won’t reflect that. Instead, we can work out how many seconds have passed using the current `frameCount`:

```javascript
let secondsElapsed = frameCount/framerate;
```

Now if we want the animation to stop at, say, 5 seconds we could do it like this:

```javascript
let secondsElapsed = frameCount/framerate;
if (secondsElapsed >= 5) {
  capturer.stop();
  capturer.save();
  noLoop(); // This is optional
}
```

And that’s it! Here’s what it all looks like in a sandbox:

<iframe
                width="1000"
                height="500"
                src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fcodesandbox.io%2Fembed%2Foqm8yp8ow6%3Fcodemirror%3D1%26fontsize%3D14%26module%3D%252Fsketch.js&url=https%3A%2F%2Fcodesandbox.io%2Fs%2Foqm8yp8ow6%3Fcodemirror%3D1%26fontsize%3D14%26module%3D%252Fsketch.js&image=https%3A%2F%2Fcodesandbox.io%2Fapi%2Fv1%2Fsandboxes%2Foqm8yp8ow6%2Fscreenshot.png&key=a19fcc184b9711e1b4764040d3dc5c07&type=text%2Fhtml&schema=codesandbox"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

View my codesandbox [here.](https://codesandbox.io/s/oqm8yp8ow6?codemirror=1&fontsize=14&module=%2Fsketch.js)

Note that I’ve commented out the code for downloading for the sake of embedding it on Medium.

#### Using ffmpeg to convert

Now you have your animation, which is awesome, but you may need it in different formats. There are a lot of programs and online converters which you could use. I’ve been using [ffmpeg](https://www.ffmpeg.org/download.html) because it’s flexible and available from the command line. In their own words:

### FFmpeg is the leading multimedia framework, able to **decode**, **encode**, **transcode**, **mux**, **demux**, **stream**, **filter** and **play** pretty much anything that humans and machines have created. It supports the most obscure ancient formats up to the cutting edge.

To convert the animation into a gif, you can use something like this.

```bash
ffmpeg -i noise_visualization.webm -filter_complex "[0:v] fps=15, split [a][b];[a] palettegen [p];[b][p] paletteuse" noise_visualization.gif
```

GIPHY have a [great article](https://engineering.giphy.com/how-to-make-gifs-with-ffmpeg/) that explains what all these options do.

And to convert into an mp4 for Instagram you can use something like this:

```bash
ffmpeg -i noise_visualization.webm -c:a copy -c:v libx264 -b:v 5M -maxrate 5M noise_visualization.mp4
```

If you reuse the same ffmpeg options often, it may be useful to save them into an alias. You’ll have to find out the specifics of how to do it for your own terminal program. In cmder it’s under Settings>Environment:

![The cmder settings window](https://cdn-images-1.medium.com/max/1538/1*pNBIDzV04RnAQKZRGb46lw.png)

In cmder, the alias is set with a command like this:

```bash
alias ffinsta=ffmpeg -i $1 -c:a copy -c:v libx264 -b:v 5M -maxrate 5M $2
```

Here `$1` is the first argument given to `ffinsta` and `$2` is the second argument. Once the alias is set you can use it like this:

```bash
ffinsta noise_visualization.webm noise_visualization.mp4
```

Note that, in cmder, you have to restart the terminal after setting the alias. This may be the case for your terminal program too.

I hope you’ve found this tutorial helpful, don’t hesitate to ask if you need any help.

![Photo by [Markus Spiske](https://unsplash.com/photos/cn0-hgcpoL8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on Unsplash](art.jpg)
