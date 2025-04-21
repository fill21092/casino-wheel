
const canvas = document.getElementById("wheelcanvas");
const ctx = canvas.getContext("2d");
const sectors = ["10", "20", "50", "0", "100", "5", "25", "0"];
const colors = ["#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f", "#fff", "#aaa"];
const radius = 250;
let angle = 0;
let spinning = false;

function drawWheel() {
  const arc = 2 * Math.PI / sectors.length;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < sectors.length; i++) {
    const startAngle = angle + i * arc;
    ctx.beginPath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius, startAngle, startAngle + arc);
    ctx.fill();
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(startAngle + arc / 2);
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText(sectors[i], 100, 10);
    ctx.restore();
  }
}

function spin() {
  if (spinning) return;
  spinning = true;
  const spinAngle = Math.random() * 360 + 1080;
  const duration = 4000;
  const start = performance.now();

  function animate(now) {
    const elapsed = now - start;
    if (elapsed < duration) {
      angle += (spinAngle / duration) * 16;
      drawWheel();
      requestAnimationFrame(animate);
    } else {
      angle += spinAngle;
      drawWheel();
      const selected = Math.floor(sectors.length - ((angle / (2 * Math.PI)) % sectors.length)) % sectors.length;
      document.getElementById("result").textContent = "Ты выиграл: " + sectors[selected];
      spinning = false;
    }
  }
  requestAnimationFrame(animate);
}

drawWheel();
