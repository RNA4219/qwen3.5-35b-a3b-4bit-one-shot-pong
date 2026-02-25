// index.js

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

// Game Constants
const PADDLE_WIDTH = 15;
const PADDLE_HEIGHT = 90;
const BALL_SIZE = 15;

// Game State
let leftScore = 0;
let rightScore = 0;

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  speedX: 5,
  speedY: 5
};

const leftPaddle = { x: 10, y: canvas.height / 2 - PADDLE_HEIGHT / 2 };
const rightPaddle = { x: canvas.width - 10 - PADDLE_WIDTH, y: canvas.height / 2 - PADDLE_HEIGHT / 2 };

// Input State
const keys = {
  w: false,
  s: false,
  ArrowUp: false,
  ArrowDown: false
};

window.addEventListener('keydown', (e) => {
  if (Object.prototype.hasOwnProperty.call(keys, e.key)) {
    keys[e.key] = true;
  }
});

window.addEventListener('keyup', (e) => {
  if (Object.prototype.hasOwnProperty.call(keys, e.key)) {
    keys[e.key] = false;
  }
});

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;

  const dirX = Math.random() > 0.5 ? 1 : -1;
  const dirY = (Math.random() * 2 - 1); // -1 to 1

  ball.speedX = dirX * 6;
  ball.speedY = dirY * 6;
}

function checkPaddleCollision(paddleX, isLeft) {
  const paddleY = isLeft ? leftPaddle.y : rightPaddle.y;

  if (
    ball.x < paddleX + PADDLE_WIDTH &&
    ball.x + BALL_SIZE > paddleX &&
    ball.y < paddleY + PADDLE_HEIGHT &&
    ball.y + BALL_SIZE > paddleY
  ) {
    // パドル中央からの相対位置 (-1〜1)
    let collidePoint =
      (ball.y + BALL_SIZE / 2) - (paddleY + PADDLE_HEIGHT / 2);
    collidePoint = collidePoint / (PADDLE_HEIGHT / 2);

    // 最大45度
    const angleRad = collidePoint * (Math.PI / 4);

    // いまの速度の大きさを少しだけ増やす（上限15）
    const currentSpeed = Math.sqrt(
      ball.speedX * ball.speedX + ball.speedY * ball.speedY
    );
    const newSpeed = Math.min(15, currentSpeed + 0.5);

    const direction = isLeft ? 1 : -1;

    // 角度と速度からベクトルを再構成
    ball.speedX = direction * Math.cos(angleRad) * newSpeed;
    ball.speedY = Math.sin(angleRad) * newSpeed;

    // めり込み防止
    if (isLeft) {
      ball.x = paddleX + PADDLE_WIDTH;
    } else {
      ball.x = paddleX - BALL_SIZE;
    }
  }
}

function update() {
  // Left Paddle Movement (W / S)
  if (keys.w && leftPaddle.y > 0) leftPaddle.y -= 7;
  if (keys.s && leftPaddle.y < canvas.height - PADDLE_HEIGHT) leftPaddle.y += 7;

  // Right Paddle Movement (ArrowUp / ArrowDown)
  if (keys.ArrowUp && rightPaddle.y > 0) rightPaddle.y -= 7;
  if (keys.ArrowDown && rightPaddle.y < canvas.height - PADDLE_HEIGHT) rightPaddle.y += 7;

  // Ball Movement
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  // Wall Collision (Top/Bottom)
  if (ball.y <= 0 || ball.y + BALL_SIZE >= canvas.height) {
    ball.speedY = -ball.speedY;
  }

  // Paddle Collision
  checkPaddleCollision(leftPaddle.x, true);
  checkPaddleCollision(rightPaddle.x, false);

  // Scoring
  if (ball.x < 0) {
    rightScore++;
    resetBall();
  } else if (ball.x > canvas.width) {
    leftScore++;
    resetBall();
  }
}

function draw() {
  // Clear background
  ctx.fillStyle = '#222';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Net
  ctx.strokeStyle = '#555';
  ctx.lineWidth = 4;
  ctx.setLineDash([10, 15]);
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.setLineDash([]);

  // Paddles
  ctx.fillStyle = '#fff';
  ctx.fillRect(leftPaddle.x, leftPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
  ctx.fillRect(rightPaddle.x, rightPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);

  // Ball
  ctx.beginPath();
  ctx.arc(ball.x + BALL_SIZE / 2, ball.y + BALL_SIZE / 2, BALL_SIZE / 2, 0, Math.PI * 2);
  ctx.fill();

  // Score
  ctx.fillStyle = '#fff';
  ctx.font = '30px Arial';
  ctx.fillText(`Left: ${leftScore}`, 50, 60);
  ctx.fillText(`Right: ${rightScore}`, canvas.width - 200, 60);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Start
resetBall();
gameLoop();
