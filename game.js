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
let resourceAmount = 0;
const resourceDisplay = document.getElementById("resource");

// координаты базы
const base = document.querySelector(".base");
const baseRect = base.getBoundingClientRect();
const baseX = base.offsetLeft;
const baseY = base.offsetTop;

// функция движения добытчика
function moveToBase(unit) {
  let posX = unit.offsetLeft;
  let posY = unit.offsetTop;

  const step = 1;

  const interval = setInterval(() => {
    if (posX < baseX) posX += step;
    if (posX > baseX) posX -= step;
    if (posY < baseY) posY += step;
    if (posY > baseY) posY -= step;

    unit.style.left = posX + "px";
    unit.style.top = posY + "px";

    if (Math.abs(posX - baseX) < 5 && Math.abs(posY - baseY) < 5) {
      clearInterval(interval);
      collectResource();
      setTimeout(() => moveToBase(unit), 1000); // снова идёт
    }
  }, 20);
}

// запуск сбора
function collectResource() {
  resourceAmount += 1;
  resourceDisplay.textContent = `💧 Жижа: ${resourceAmount}`;
}

// найти добытчиков и запустить
const allUnits = document.querySelectorAll(".unit");
allUnits.forEach(unit => moveToBase(unit));