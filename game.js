let juice = 0;
let offsetY = 300;

// Обновление ресурса
function updateJuice() {
    document.getElementById("juice").innerText = juice;
}

// Строительство
function build(type) {
    if (juice <= 0) return;

    const map = document.getElementById("map");
    const building = document.createElement("div");
    building.className = type;
    building.style.top = `${offsetY}px`;
    building.style.left = "150px";

    if (type === "home") building.innerText = "🏠";
    if (type === "barracks") building.innerText = "⚔️";

    map.appendChild(building);
    offsetY += 80;
    juice--;
    updateJuice();
}

// Анимация юнита-добытчика
function animateUnitToBase() {
    const unit = document.getElementById("unit");
    const base = document.getElementById("base");

    if (!unit || !base) return;

    const unitX = parseInt(unit.style.left) || 100;
    const unitY = parseInt(unit.style.top) || 100;
    const baseX = parseInt(base.style.left) || 200;
    const baseY = parseInt(base.style.top) || 200;

    const dx = baseX - unitX;
    const dy = baseY - unitY;

    let progress = 0;
    const duration = 2000;
    const startX = unitX;
    const startY = unitY;

    function move() {
        progress += 0.02;
        const newX = startX + dx * progress;
        const newY = startY + dy * progress;

        unit.style.left = `${newX}px`;
        unit.style.top = `${newY}px`;

        if (progress < 1) {
            requestAnimationFrame(move);
        } else {
            juice++;
            updateJuice();
            setTimeout(() => {
                unit.style.left = `${startX}px`;
                unit.style.top = `${startY}px`;
                animateUnitToBase();
            }, 1000);
        }
    }

    requestAnimationFrame(move);
}

// Создание бойца
function spawnSoldier() {
    const map = document.getElementById("map");
    const soldier = document.createElement("div");
    soldier.className = "soldier";
    soldier.innerText = "⚔️";
    soldier.style.left = "100px";
    soldier.style.top = "300px";
    map.appendChild(soldier);

    moveSoldierToEnemy(soldier);
}

// Движение к врагу
function moveSoldierToEnemy(soldier) {
    const enemy = document.getElementById("enemyBase");
    const soldierX = parseInt(soldier.style.left);
    const soldierY = parseInt(soldier.style.top);
    const enemyX = parseInt(enemy.style.left);
    const enemyY = parseInt(enemy.style.top);

    let progress = 0;
    const dx = enemyX - soldierX;
    const dy = enemyY - soldierY;

    function animate() {
        progress += 0.01;
        const newX = soldierX + dx * progress;
        const newY = soldierY + dy * progress;
        soldier.style.left = `${newX}px`;
        soldier.style.top = `${newY}px`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            enemy.innerText = "💥";
            alert("🎉 Победа! База врага уничтожена.");
        }
    }

    animate();
}

// Привязка кнопок
window.onload = () => {
    updateJuice();
    animateUnitToBase();

    document.getElementById("buildHome").addEventListener("click", () => build("home"));
    document.getElementById("buildBarracks").addEventListener("click", () => build("barracks"));
    document.getElementById("spawnSoldier").addEventListener("click", spawnSoldier);
};