var twopi = Math.PI * 2;

var c = document.getElementById("c");
var ctx = c.getContext("2d");
var frame = 0;
var width = c.width;
var height = c.height;

var fps = 60;
var Time = {
    then : Date.now(),
    now : Date.now(),
    interval : 1000. / fps,
    delta : 0
}

function Particle(shape, v, a) {
    this.shape = shape;
    this.v = v;
    this.a = a;
}
Particle.prototype.update = function(delta) {
    if (this.shape.x < 0) {
        this.v.x = Math.abs(this.v.x);
    }
    if (this.shape.y < 0) {
        this.v.y = Math.abs(this.v.y);
    }
    if (this.shape.x > width) {
        this.v.x = -Math.abs(this.v.x);
    }
    if (this.shape.y > height) {
        this.v.y = -Math.abs(this.v.y);
    }

    this.v.x += this.a.x * delta;
    this.v.x += this.a.x * delta;
    this.shape.x += this.v.x * delta;
    this.shape.y += this.v.y * delta;
}
Particle.prototype.render = function() {
    this.shape.render();
}


function Rectangle(x, y, w, h, c) {
    this.c = c;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}
Rectangle.prototype.render = function() {
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
}

var particles = [];
function addParticle(num) {
    for (var i = 0; i < num; i++) {
        var colors = [
            "#0000FF",
            "#00FF00",
            "#00FFFF",
            "#FF0000",
            "#FF00FF",
            "#FFFF00",
            "#FFFFFF"
        ];
        var numcolors = colors.length;
        var x = Math.random() * width;
        var y = Math.random() * height;
        var c = colors[Math.floor(Math.random() * numcolors)];
        var t = Math.random() * twopi;
        var v = {
            x : Math.sin(t) * 0.1,
            y : Math.cos(t) * 0.1
        };
        var rect = new Rectangle(x, y, 10, 10, c);
        particles.push(new Particle(rect, v, {x:0, y:0}));
    }
    document.getElementById("num").innerHTML = particles.length;
}
function removeParticle(num) {
    for (var i = 0; i < num; i++) {
        if (particles.length != 0) {
            particles.splice(Math.floor(Math.random() * particles.length), 1);
        }
    }
    document.getElementById("num").innerHTML = particles.length;
}

addParticle(5);

function updateParticles(delta) {
    for (var i = 0; i < particles.length; i++) {
        particles[i].update(delta);
    }
}

function renderParticles() {
    for (var i = 0; i < particles.length; i++) {
        particles[i].render();
    }
}

function draw() {
    requestAnimationFrame(draw);
    Time.now = Date.now();
    Time.delta = Time.now - Time.then;
        updateParticles(Time.delta);
    if (Time.delta > Time.interval) {
        frame++;
        Time.then = Time.now - (Time.delta % Time.interval);   
        // ... Code for Drawing the Frame ...
        ctx.clearRect(0, 0, width, height);
        renderParticles();
    }
}

setInterval(function(){
    document.getElementById("fps").innerHTML = frame;
    frame = 0;
}, 1000);
 
draw();