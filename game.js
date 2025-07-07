let juice = 0;
let buildings = 0;
let soldiers = 0;
let unitSpeed = 1000;
let factionData = {};
let faction = null;

// Настройки фракций
const factions = {
    mutants: {
        name: "Мутанты",
        base: "🏚️",
        unit: "🧟",
        soldier: "🧌",
        building: "🧪"
    },
    robots: {
        name: "Роботы",
        base: "🏢",
        unit: "🤖",
        soldier: "🤖",
        building: "⚙️"
    },
    bandits: {
        name: "Бандиты",
        base: "🏠",
        unit: "🧔",
        soldier: "🔫",
        building: "🔥"
    }
};

function startGame(selectedFaction) {
    faction = factions[selectedFaction];
    factionData = faction;
    document.getElementById("overlay").style.display = "none";
    spawnBase();
    spawnUnit();
    gameLoop();
}

function spawnBase() {
    const base = document.createElement("div");
    base.id = "playerBase";
    base.className = "building";
    base.innerText = factionData.base;
    base.style.top = "300px";
    base.style.left = "100px";
    document.getElementById("map").appendChild(base);

    const enemy = document.createElement("div");
    enemy.id = "enemyBase";
    enemy.className = "enemy-base";
    enemy.innerText = "🏴‍☠️";
    enemy.style.top = "100px";
    enemy.style.left = "300px";
    document.getElementById("map").appendChild(enemy);
}

function spawnUnit() {
    const unit = document.createElement("div");
    unit.id = "worker";
    unit.className = "unit";
    unit.innerText = factionData.unit;
    unit.style.top = "100px";
    unit.style.left = "100px";
    document.getElementById("map").appendChild(unit);
}

function gameLoop() {
    moveUnit();
    setInterval(() => {
        spawnMiniBot();
    }, 5000);
}

function moveUnit() {
    const unit = document.getElementById("worker");
    const base = document.getElementById("playerBase");

    let ux = parseInt(unit.style.left);
    let uy = parseInt(unit.style.top);
    let bx = parseInt(base.style.left);
    let by = parseInt(base.style.top);
    let dx = bx - ux;
    let dy = by - uy;
    let progress = 0;

    function animate() {
        progress += 0.02;
        unit.style.left = ux + dx * progress + "px";
        unit.style.top = uy + dy * progress + "px";
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            juice++;
            document.getElementById("resource").innerText = "💧 Жижа: " + juice;
            setTimeout(() => {
                unit.style.left = ux + "px";
                unit.style.top = uy + "px";
                moveUnit();
            }, unitSpeed);
        }
    }

    requestAnimationFrame(animate);
}

function buildStructure(type) {
    if (juice < 1) return;

    const structure = document.createElement("div");
    structure.className = "building";
    structure.innerText = type === "house" ? factionData.building : factionData.soldier;
    structure.style.left = Math.random() * 300 + "px";
    structure.style.top = Math.random() * 300 + "px";
    document.getElementById("map").appendChild(structure);

    buildings++;
    juice--;
    document.getElementById("resource").innerText = "💧 Жижа: " + juice;
}

function restartGame() {
    location.reload();
}

function showStats() {
    alert("Построек: " + buildings + " | Юнитов: " + soldiers + " | Жижа: " + juice);
}

function spawnMiniBot() {
    const bot = document.createElement("div");
    bot.className = "unit";
    bot.innerText = "🛰️";
    bot.style.left = Math.random() * 300 + "px";
    bot.style.top = Math.random() * 300 + "px";
    document.getElementById("map").appendChild(bot);
    setTimeout(() => bot.remove(), 4000);
}
