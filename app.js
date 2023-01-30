"use strict";
//This ! tells tsc that there will always be a canvas in the HTML 
const canvas = document.querySelector('canvas');
//another way saying that there is a null
const ctx = canvas.getContext('2d');
let circleArray = [];
let panelHeaders = document.querySelectorAll('.panel h1');
//look into prototype, slice, and call 
let panelHeadersArray = Array.prototype.slice.call(panelHeaders);
const heroHeaders = document.querySelectorAll('.hero__header');
let heroHeadersArray = Array.prototype.slice.call(heroHeaders);
heroHeadersArray.forEach((header, inx) => {
    setTimeout(() => {
        header.style.transform = 'translateY(0)';
    }, 2500 + (inx * 1000));
});
setTimeout(() => {
    panelHeadersArray.forEach((header, idx) => {
        var _a;
        for (let i = 0; i < 10; i++) {
            let clone = header.cloneNode(true);
            (_a = header.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(clone);
        }
        setTimeout(() => {
            var _a;
            (_a = header.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('active');
        }, 1000 + (idx * 200));
    });
});
//restart the animations when the size of the website is changed
function setDimentions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    circleArray = [];
    for (let i = 0; i < 100; i++) {
        let x = 0;
        let y = 0;
        while (x < canvas.width * .2 || x > canvas.width * .8) {
            x = Math.random() * canvas.width;
        }
        while (y < canvas.width * .2 || y > canvas.width * .8) {
            y = Math.random() * canvas.width;
        }
        circleArray.push({ x, y });
    }
}
window.addEventListener('resize', setDimentions);
//watch the lerp function  video more indepth
//in short this is a method to smooth out any sort of animation
function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}
let MouseCoords = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
};
window.addEventListener('mousemove', (e) => {
    MouseCoords.targetX = e.clientX - (canvas.width / 2);
    MouseCoords.targetY = e.clientY - (canvas.width / 2);
});
let frame = 0;
let iteration = 0;
function animate() {
    ctx.fillStyle = '#dcfe4a';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    MouseCoords.x = lerp(MouseCoords.x, MouseCoords.targetX, .075);
    MouseCoords.y = lerp(MouseCoords.y, MouseCoords.targetY, .075);
    ctx.beginPath();
    for (let i = 0; i < iteration; i++) {
        let { x, y } = circleArray[i];
        ctx.beginPath();
        ctx.arc(x + MouseCoords.x, y + MouseCoords.y, 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(x + MouseCoords.x, y + MouseCoords.y);
        ctx.strokeStyle = 'rgba(171, 171, 171, 0.118)';
        ctx.stroke();
    }
    ctx.closePath();
    frame++;
    if (frame % 10 == 1 && iteration < circleArray.length) {
        iteration++;
    }
    requestAnimationFrame(animate);
}
setDimentions();
animate();
