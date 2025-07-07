let map = document.getElementById("map");
let juice = 10;
let buildings = 1;
let offsetY = 100;

// Обновление количества жижи
function updateJuice() {
    document.getElementById("juice").innerText = juice;
}

// Строим здание
function build(type) {
    if (juice <= 0) return;

    let building = document.createElement("div");
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

// Кнопки
document.getElementById("buildHome").addEventListener("click", () => build("home"));
document.getElementById("buildBarracks").addEventListener("click", () => build("barracks"));

// Инициализация
updateJuice();