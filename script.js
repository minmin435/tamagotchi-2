let stats = { hunger: 50, happiness: 50, cleanliness: 50, energy: 50 };
let frame = 0;
let images = [];

// 3프레임 병아리 이미지
for (let i = 1; i <= 3; i++) {
    let img = new Image();
    img.src = `chick${i}.png`;
    images.push(img);
}

function updateStats() {
    document.getElementById('hunger').innerText = stats.hunger.toFixed(0);
    document.getElementById('happiness').innerText = stats.happiness.toFixed(0);
    document.getElementById('cleanliness').innerText = stats.cleanliness.toFixed(0);
    document.getElementById('energy').innerText = stats.energy.toFixed(0);
}

function gameLoop() {
    const ctx = document.getElementById('chickCanvas').getContext('2d');
    ctx.clearRect(0, 0, 200, 200);
    ctx.drawImage(images[frame], 50, 50, 100, 100);
    frame = (frame + 1) % 3;

    // 상태 감소
    stats.hunger = Math.max(0, stats.hunger - 0.01);
    stats.happiness = Math.max(0, stats.happiness - 0.005);
    stats.cleanliness = Math.max(0, stats.cleanliness - 0.003);
    stats.energy = Math.max(0, stats.energy - 0.004);

    updateStats();
    saveGame();
}

function feed() { stats.hunger = Math.min(100, stats.hunger + 10); }
function play() { stats.happiness = Math.min(100, stats.happiness + 10); }
function clean() { stats.cleanliness = Math.min(100, stats.cleanliness + 10); }
function sleep() { stats.energy = Math.min(100, stats.energy + 10); }

function saveGame() {
    localStorage.setItem('tamagotchi', JSON.stringify(stats));
}
function loadGame() {
    let saved = localStorage.getItem('tamagotchi');
    if (saved) stats = JSON.parse(saved);
}

window.onload = () => {
    loadGame();
    updateStats();
    setInterval(gameLoop, 500);
}
