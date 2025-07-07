let juice = 0;
let offsetY = 100;

// Обновляем текст в ресурсе
function updateJuice() {
    document.getElementById("juice").innerText = juice;
}

// Создание зданий
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

// Привязка кнопок
document.getElementById("buildHome").addEventListener("click", () => build("home"));
document.getElementById("buildBarracks").addEventListener("click", () => build("barracks"));

// АНИМАЦИЯ ДОБЫТЧИКА
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

// Запуск игры
window.onload = () => {
    updateJuice();
    animateUnitToBase();
};