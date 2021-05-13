function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function createStars(width2, height2, spacing) {
  const stars = [];

  for (let x = 0; x < width2; x += spacing) {
    for (let y = 0; y < height2; y += spacing) {
      const star = {
        x: x + randomInt(spacing),
        y: y + randomInt(spacing),
        r: Math.random() * maxStarRadius
      };
      stars.push(star);
    }
  }
  return stars;
}

function fillCircle(ctx2, x, y, r, fillStyle) {
  ctx2.beginPath();
  ctx2.fillStyle = fillStyle;
  ctx2.arc(x, y, r, 0, Math.PI * 2);
  ctx2.fill();
}

function getOpacity(factor) {
  const opacityIncrement =
    (maxStarOpacity - minStarOpacity) * Math.abs(Math.sin(factor));
  const opacity = minStarOpacity + opacityIncrement;
  return opacity;
}

function render() {
  ctx2.fillStyle = backgroundColor;
  ctx2.fillRect(0, 0, width2, height2);
  stars.forEach(function(star, i) {
    const factor = counter * i;
    const x = star.x;
    const y = star.y;
    const opacity = getOpacity(factor);
    fillCircle(ctx2, x, y, star.r, `rgba(255, 255, 255, ${opacity}`);
  });

  counter++;
  requestAnimationFrame(render);
}

const backgroundColor = "#030318";
const width2 = window.innerWidth;
const height2 = window.innerHeight;
const maxStarRadius = 1.5;
const minStarOpacity = 0.1;
const maxStarOpacity = 0.6;
const stars = createStars(width2, height2, 30);

const canvas2 = document.querySelector("#background-sky");
const ctx2 = canvas2.getContext("2d");
canvas2.width = width2;
canvas2.height = height2;

let counter = 0;

render();