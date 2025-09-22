const canvas = document.getElementById("fishCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fishArray = [];
let speedMultiplier = 1;

// Fish class
class Fish {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 40 + Math.random() * 20;
    this.speed = (1 + Math.random() * 2) * speedMultiplier;
    this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
  }

  draw() {
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.size, this.size / 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();

    // Tail
    ctx.beginPath();
    ctx.moveTo(this.x - this.size, this.y);
    ctx.lineTo(this.x - this.size - 20, this.y - 10);
    ctx.lineTo(this.x - this.size - 20, this.y + 10);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();

    // Eye
    ctx.beginPath();
    ctx.arc(this.x + this.size / 2, this.y - 5, 4, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.x + this.size / 2, this.y - 5, 2, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
  }

  update() {
    this.x += this.speed * speedMultiplier;
    if (this.x > canvas.width + this.size * 2) {
      this.x = -this.size * 2;
      this.y = Math.random() * canvas.height;
      this.speed = (1 + Math.random() * 2) * speedMultiplier;
    }
    this.draw();
  }
}

function initFish(num) {
  fishArray = [];
  for (let i = 0; i < num; i++) {
    fishArray.push(new Fish());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fishArray.forEach(fish => fish.update());
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initFish(10);
});

document.getElementById("funButton").addEventListener("click", () => {
  speedMultiplier += 0.5;
});

// Initialize
initFish(10);
animate();
