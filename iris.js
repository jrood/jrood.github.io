let ctx = document.getElementById("canvas").getContext('2d'); ctx.scale(2, 2);
let width = 600, height = 600, radius = 295, fade = 0.001;
let rnd = x => Math.random() * x;
let sin = Math.sin, cos = Math.cos, pi = Math.PI, abs = Math.abs;
let onTheEdge = (x,y) => abs(x-width/2)**2 + abs(y-height/2)**2 >= radius**2;

function dot(x,y,_radius,color,opacity){
  ctx.beginPath();
  ctx.arc(x, y, _radius, 0, 2 * pi, false);
  ctx.fillStyle = "rgba("+color.r+","+color.g+","+color.b+","+opacity+")";
  ctx.fill();
}

function rndColor(){
  let seed = rnd(pi * 1.5);
  let f = offset => parseInt(128 + 128*sin(seed + offset));
  return { r: f(0), g: f(pi * 2 / 3), b: f(pi * 4 / 3) };
}

function dottedArc(x,y,direction,color){
  let curve = (rnd(0.015) + 0.0025) * ((rnd(1) - 0.5) > 0 ? 1 : -1);
  let visibility = 1;
  let f = () => {
    direction += curve;
    x += sin(direction); y += cos(direction);
    visibility -= fade;
    dot(x, y, visibility**2 * 0.5, color, visibility);
    if (!onTheEdge(x,y)) setTimeout(f);
  };f();
}

function batch(resolution, range, color){
  target = rnd(pi * 2);
  for (let i = 0; i < resolution; i ++){
    let seed = target + rnd(range);
    plant(sin(seed)*radius+width/2, cos(seed)*radius+height/2, seed, color);
  }
}

function plant(x,y,seed,color){
  dot(x,y, 2, color,1);
  dottedArc(x,y,seed + pi,color);
}

function render(){
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < 5; i++) { batch(64, 1, rndColor()); }
}
document.getElementById("render").onclick = render;