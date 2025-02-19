let squareCanvas = document.getElementById("SquareCanvas");
let circleCanvas = document.getElementById("CircleCanvas");
let imageCanvas = document.getElementById("ImageCanvas");
let fpsCanvas = document.getElementById("FPSCanvas");

let fpsMeterVisible = false;
let lastFrameTime = 0;
let frameCount = 0;
let fps = 0;

let squareObjects = [];
let circleObjects = [];
let imageObjects = [];

let image = new Image();
image.src = 'pic.jpg';  // 图像路径

function initialize() {
    squareCanvas.width = 800;
    squareCanvas.height = 500;
    circleCanvas.width = 800;
    circleCanvas.height = 500;
    imageCanvas.width = 800;
    imageCanvas.height = 500;
    fpsCanvas.width = 200;
    fpsCanvas.height = 50;

    squareCanvas.style.display = 'none';
    circleCanvas.style.display = 'none';
    imageCanvas.style.display = 'none';
    requestAnimationFrame(updateFPS);
}

function toggleSquareVisibility() {
    squareCanvas.style.display = (squareCanvas.style.display === 'none') ? 'block' : 'none';
}

function toggleCircleVisibility() {
    circleCanvas.style.display = (circleCanvas.style.display === 'none') ? 'block' : 'none';
}

function toggleImageVisibility() {
    imageCanvas.style.display = (imageCanvas.style.display === 'none') ? 'block' : 'none';
}

function toggleFPSMeter() {
    fpsMeterVisible = !fpsMeterVisible;
    fpsCanvas.style.display = fpsMeterVisible ? 'block' : 'none';
}

function updateFPS(timestamp) {
    if (lastFrameTime) {
        let deltaTime = (timestamp - lastFrameTime) / 1000;  // 秒
        frameCount++;
        if (deltaTime >= 1) {
            fps = frameCount;
            frameCount = 0;
            lastFrameTime = timestamp;
            if (fpsMeterVisible) {
                fpsCanvas.getContext('2d').clearRect(0, 0, fpsCanvas.width, fpsCanvas.height);
                fpsCanvas.getContext('2d').fillText(`FPS: ${fps}`, 10, 30);
            }
        }
    } else {
        lastFrameTime = timestamp;
    }

    // 动态绘制
    drawMovingSquares();
    drawMovingCircles();
    drawMovingImages();

    requestAnimationFrame(updateFPS);
}

function drawMovingSquares() {
    let ctx = squareCanvas.getContext('2d');
    ctx.clearRect(0, 0, squareCanvas.width, squareCanvas.height);  // 清空画布

    squareObjects.forEach((square) => {
        square.x += square.vx;
        square.y += square.vy;
        if (square.x < 0 || square.x > squareCanvas.width - square.size) square.vx = -square.vx;
        if (square.y < 0 || square.y > squareCanvas.height - square.size) square.vy = -square.vy;

        ctx.fillStyle = '#ff0000';
        ctx.fillRect(square.x, square.y, square.size, square.size);
    });
}

function drawMovingCircles() {
    let ctx = circleCanvas.getContext('2d');
    ctx.clearRect(0, 0, circleCanvas.width, circleCanvas.height);  // 清空画布

    circleObjects.forEach((circle) => {
        circle.x += circle.vx;
        circle.y += circle.vy;
        if (circle.x < 0 || circle.x > circleCanvas.width - circle.radius) circle.vx = -circle.vx;
        if (circle.y < 0 || circle.y > circleCanvas.height - circle.radius) circle.vy = -circle.vy;

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);  // 绘制一个圆形
        ctx.fillStyle = '#00ff00';
        ctx.fill();
    });
}

function drawMovingImages() {
    let ctx = imageCanvas.getContext('2d');
    ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);  // 清空画布

    imageObjects.forEach((imgObj) => {
        imgObj.x += imgObj.vx;
        imgObj.y += imgObj.vy;
        if (imgObj.x < 0 || imgObj.x > imageCanvas.width - imgObj.size) imgObj.vx = -imgObj.vx;
        if (imgObj.y < 0 || imgObj.y > imageCanvas.height - imgObj.size) imgObj.vy = -imgObj.vy;

        ctx.drawImage(image, imgObj.x, imgObj.y, imgObj.size, imgObj.size);  // 绘制图像
    });
}

// 添加方块
function addSquare() {
    squareObjects.push({
        x: Math.random() * squareCanvas.width,
        y: Math.random() * squareCanvas.height,
        size: 30 + Math.random() * 40,
        vx: 2 + Math.random() * 3,
        vy: 2 + Math.random() * 3
    });
}

// 添加圆形
function addCircle() {
    circleObjects.push({
        x: Math.random() * circleCanvas.width,
        y: Math.random() * circleCanvas.height,
        radius: 20 + Math.random() * 30,
        vx: 2 + Math.random() * 3,
        vy: 2 + Math.random() * 3
    });
}

// 添加图像
function addImage() {
    imageObjects.push({
        x: Math.random() * imageCanvas.width,
        y: Math.random() * imageCanvas.height,
        size: 30 + Math.random() * 50,
        vx: 2 + Math.random() * 3,
        vy: 2 + Math.random() * 3
    });
}