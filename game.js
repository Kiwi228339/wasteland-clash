let juice = 0;
let offsetY = 300;
let buildings = 0;
let soldiers = 0;

// 🎲 Фракции
const factions = {
  mutants: {
    unit: "🧟",
    base: "🏚",
    soldier: "🧌",
    building: "🧪",
    barracks: "⚗️"
  },
  robots: {
    unit: "🤖",
    base: "🏢",
    soldier: "🛡️",
    building: "🔩",
    barracks: "⚙️"
  },
  bandits: {
    unit: "👨‍✈️",
    base: "🏠",
    soldier: "🔫",
    building: "🚬",
    barracks: "🚔"
  }
};

// ⚙️ Рандом фракции
const factionKeys = Object.keys(factions);
const selectedFaction = factions[factionKeys[Math.floor(Math.random() * factionKeys.length)]];

// Обновление ресурсов
function updateJuice() {
  document.getElementById("juice").innerText = juice;
  document.getElementById("buildingCount").innerText = buildings;
  document.getElementById("soldierCount").innerText = soldiers;
}

// Строительство
function build(type) {
  if (juice <= 0) return;

  const map = document.getElementById("map");
  const building = document.createElement("div");
  building.className = type;
  building.style.top = `${offsetY}px`;
  building.style.left = "150px";

  if (type === "home") building.innerText = selectedFaction.building;
  if (type === "barracks") building.innerText = selectedFaction.barracks;

  map.appendChild(building);
  offsetY += 80;
  juice--;
  buildings++;
  updateJuice();
}

// Добытчик
function animateUnitToBase() {
  const unit = document.getElementById("unit");
  const base = document.getElementById("base");

  if (!unit || !base) return;

  unit.innerText = selectedFaction.unit;
  base.innerText = selectedFaction.base;

  const unitX = 100, unitY = 100;
  const baseX = 200, baseY = 200;

  const dx = baseX - unitX;
  const dy = baseY - unitY;

  let progress = 0;
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

// Боец
function spawnSoldier() {
  const map = document.getElementById("map");
  const soldier = document.createElement("div");
  soldier.className = "soldier";
  soldier.innerText = selectedFaction.soldier;
  soldier.style.left = "100px";
  soldier.style.top = "300px";
  map.appendChild(soldier);
  soldiers++;
  updateJuice();

  moveSoldierToEnemy(soldier);
}

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

// Меню
function restartGame() {
  location.reload();
}

function showDonate() {
  alert("💸 Донат недоступен в этой версии. Скоро!");
}

// Инициализация
window.onload = () => {
  updateJuice();
  animateUnitToBase();
  document.getElementById("buildHome").addEventListener("click", () => build("home"));
  document.getElementById("buildBarracks").addEventListener("click", () => build("barracks"));
  document.getElementById("spawnSoldier").addEventListener("click", spawnSoldier);
  document.getElementById("restart").addEventListener("click", restartGame);
  document.getElementById("donate").addEventListener("click", showDonate);
};