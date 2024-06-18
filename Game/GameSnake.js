const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;

let snake = [];

const upButton = document.getElementById('upButton');
const leftButton = document.getElementById('leftButton');
const downButton = document.getElementById('downButton');
const rightButton = document.getElementById('rightButton');

const screenWidth = window.innerWidth/1.5;
const screenHeight = window.innerHeight/1.5;

canvas.width = screenWidth;
canvas.height = screenHeight;

const rows = Math.floor(screenHeight / box);
const columns = Math.floor(screenWidth / box);


snake[0] = {
    x: 10 * box,
    y: 10 * box
};

let food = {
    x: Math.floor(Math.random() * columns) * box,
    y: Math.floor(Math.random() * rows) * box
};

let d;
let score = 0;
let highscore = 0; // переменная для хранения рекорда

document.addEventListener('keydown', direction);

function direction(event) {
    if (event.keyCode == 37 && d != 'RIGHT') {
        d = 'LEFT';
    } else if (event.keyCode == 38 && d != 'DOWN') {
        d = 'UP';
    } else if (event.keyCode == 39 && d != 'LEFT') {
        d = 'RIGHT';
    } else if (event.keyCode == 40 && d != 'UP') {
        d = 'DOWN';
    }

    if (event.keyCode == 65 && d != 'RIGHT') {
        d = 'LEFT';
    } else if (event.keyCode == 87 && d != 'DOWN') {
        d = 'UP';
    } else if (event.keyCode == 68 && d != 'LEFT') {
        d = 'RIGHT';
    } else if (event.keyCode == 83 && d != 'UP') {
        d = 'DOWN';
    }
}

upButton.addEventListener('click', () => {
    if (d != 'DOWN') {
        d = 'UP';
    }
});

leftButton.addEventListener('click', () => {
    if (d != 'RIGHT') {
        d = 'LEFT';
    }
});

downButton.addEventListener('click', () => {
    if (d != 'UP') {
        d = 'DOWN';
    }
});

rightButton.addEventListener('click', () => {
    if (d != 'LEFT') {
        d = 'RIGHT';
    }
});

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'green';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = 'white';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == 'LEFT') snakeX -= box;
    if (d == 'UP') snakeY -= box;
    if (d == 'RIGHT') snakeX += box;
    if (d == 'DOWN') snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        food = {
            x: Math.floor(Math.random() * columns) * box,
            y: Math.floor(Math.random() * rows) * box
        };
        score++; // увеличиваем счёт
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (
        snakeX < 0 ||
        snakeX >= canvas.width ||
        snakeY < 0 ||
        snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
    }

    snake.unshift(newHead);

    // рисуем счетчик и рекорд
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

const Plus = document.getElementById('Plus');
const Minus = document.getElementById('Minus');

let speed = 100;

const textSpeed = document.getElementById('Speed');

textSpeed.textContent = speed;

let intervalId;

function increaseSpeed() {
    if (speed < 120) {
        speed++;
        textSpeed.textContent = speed;
        clearInterval(game);
        game = setInterval(draw, speed);
    }
}

function decreaseSpeed() {
    if (speed > 0) {
        speed--;
        textSpeed.textContent = speed;
        clearInterval(game);
        game = setInterval(draw, speed);
    }
}

Plus.addEventListener('mousedown', () => {
    intervalId = setInterval(increaseSpeed, 100);
});

Plus.addEventListener('mouseup', () => {
    clearInterval(intervalId);
});

Plus.addEventListener('touchstart', () => {
    intervalId = setInterval(increaseSpeed, 100);
});

Plus.addEventListener('touchend', () => {
    clearInterval(intervalId);
});

Minus.addEventListener('mousedown', () => {
    intervalId = setInterval(decreaseSpeed, 100);
});

Minus.addEventListener('mouseup', () => {
    clearInterval(intervalId);
});

Minus.addEventListener('touchstart', () => {
    intervalId = setInterval(decreaseSpeed, 100);
});

Minus.addEventListener('touchend', () => {
    clearInterval(intervalId);
});

let game = setInterval(draw, speed); // Скорость отрисовки



