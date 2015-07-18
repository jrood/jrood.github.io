// get the canvas and context
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');

// upscale the canvas if high dpi display
if (window.devicePixelRatio == 2)
{
  var oldWidth = canvas.width;
  var oldHeight = canvas.height;

  canvas.width = oldWidth * 2;
  canvas.height = oldHeight * 2;

  canvas.style.width = oldWidth + 'px';
  canvas.style.height = oldHeight + 'px';

  ctx.scale(2, 2);
}

var totalWidth = 600;
var totalHeight = 600;

var totalRad = 250;

function rnd(x) { return Math.random() * x; }

function dot(x,y,radius,color)
{
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
}

function rndColor()
{
  var seed = rnd(Math.PI * 1.5);
  return {
    r: parseInt(128 + 128*Math.sin(seed)),
    g: parseInt(128 + 128*Math.sin(seed + (Math.PI * 2 / 3))),
    b: parseInt(128 + 128*Math.sin(seed + (Math.PI * 4 / 3)))
  };
}

function colorString(color, opacity)
{
  return "rgba(" + color.r +  "," + color.g + "," + color.b + "," + opacity + ")";
}

function dottedArc(x,y,direction,color)
{
  var _instance = instance;
  var curve = (rnd(0.015) + 0.0025) * ((Math.random() - 0.5) > 0 ? 1 : -1);

  var visibility = 1;
  var decrease = 0.001;
  var i = 0;
  
  var f = function()
  {
    if (instance != _instance) return;
    direction += curve;
    x += Math.sin(direction);
    y += Math.cos(direction);
    visibility -= decrease;
    dot(x,y,Math.pow(visibility,2)*0.5,colorString(color,visibility));
    i++;
    if (!onTheEdge(x,y)) setTimeout(f);
  };
  f();
}

function batch(res, range, color)
{
  target = rnd(Math.PI * 2);
  for (var i = 0; i < res ; i ++)
  {
    var seed = target + rnd(range);
    plant(Math.sin(seed) * totalRad + totalWidth/2 ,Math.cos(seed) * totalRad + totalHeight/2, seed, color);
  }
}

function onTheEdge(x,y)
{
  return Math.pow(Math.abs(x - totalWidth/2),2) + Math.pow(Math.abs(y - totalHeight/2),2) >= Math.pow(totalRad,2);
}

function plant(x,y,seed,color){
  dot(x,y, 2, colorString(color,1));
  dottedArc(x,y,seed + Math.PI,color);
}

var instance;
function render()
{
  instance = rnd(1);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < 5; i++)
  {
    batch(64, 1, rndColor());
  }
}
document.getElementById("render").onclick = render;