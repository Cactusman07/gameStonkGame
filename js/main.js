const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 2;

function animate(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  handleObstacles();
  bird.update();
  bird.draw();
  handleParticles();
  handleCollision();
  requestAnimationFrame(animate);
  angle+= 0.15;
  hue++;
  frame++;
}
animate();

window.addEventListener('keydown', function(e){
  if(e.code === 'Space') spacePressed = true;
});

window.addEventListener('keyup', function(e){
  if(e.code === 'Space') spacePressed = false;
});

//import BoomImg from '../img/boom.png';

const bang = new Image();
bang.src = 'img/boom.png';
bang.width = 50;
bang.height = 50;
bang.onload = console.log("loaded");


function handleCollision(){
  for(let i=0; i < obstacleArray.length; i++){
    if(bird.x < obstacleArray[i].x + obstacleArray[i].width && 
      bird.x + bird.width > obstacleArray[i].x && 
      (bird.y < 0 + obstacleArray[i].top && bird.y + bird.height > 0 ||
      bird.y > canvas.height - obstacleArray[i].bottom && 
      bird.y + bird.height < canvas.height)){
        // collision detection
        ctx.drawImage(bang, bird.x, bird.y);
        return true;
    }
  }
}