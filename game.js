let juice = 0;
let buildings = 0;
let soldiers = 0;
let offsetY = 300;
let upgraded = false;

// Фракция (просто текстовая)
const faction = {
  unit: "🤖",
  base: "🏢",
  soldier: "🛡️",
  building: "🔩",
  barracks: "⚙️",
  baseUpgraded: "🏭"
};

function updateUI() {
  document.getElementById("juice").innerText = juice;
  document.getElementById("buildingCount").innerText = buildings;
  document.getElementById("soldierCount").innerText = soldiers;

  if (buildings >= 2 && soldiers >= 1) {
    document.getElementById("missionText").innerText = "✅ Миссия выполнена!";
  }
}

function createEffect(text, x, y) {
  const fx = document.createElement("div");
  fx.className = "effect";
  fx.style.left = x + "px";
  fx.style.top = y + "px";
  fx.innerText = text;
  document.getElementById("map").appendChild(fx);
  setTimeout(() => fx.remove(), 1000);
}

function build(type) {
  if (juice < 1) return;

  const map = document.getElementById("map");
  const b = document.createElement("div");
  b.className = type;
  b.style.left = "150px";
  b.style.top = offsetY + "px";

  b.innerText = type === "home" ? faction.building : faction.barracks;
  map.appendChild(b);

  createEffect("💥", 150, offsetY);

  offsetY += 60;
  buildings++;
  juice--;
  updateUI();
}

function spawnSoldier() {
  if (juice < 2) return;

  const map = document.getElementById("map");
  const s = document.createElement("div");
  s.className = "soldier";
  s.style.left = "100px";
  s.style.top = "300px";
  s.innerText = faction.soldier;
  map.appendChild(s);
  soldiers++;
  juice -= 2;
  updateUI();

  moveToEnemy(s);
}

function moveToEnemy(soldier) {
  const enemy = document.getElementById("enemyBase");
  const sx = parseInt(soldier.style.left);
  const sy = parseInt(soldier.style.top);
  const ex = parseInt(enemy.style.left);
  const ey = parseInt(enemy.style.top);
  let progress = 0;

  function step() {
    progress += 0.01;
    const nx = sx + (ex - sx) * progress;
    const ny = sy + (ey - sy) * progress;
    soldier.style.left = nx + "px";
    soldier.style.top = ny + "px";

    if (progress < 1) requestAnimationFrame(step);
    else {
      enemy.classList.add("hit");
      setTimeout(() => {
        enemy.innerText = "💥";
        alert("🎯 Победа!");
      }, 500);
    }
  }

  requestAnimationFrame(step);
}

function upgradeBase() {
  if (juice < 5 || upgraded) return;
  const base = document.getElementById("base");
  base.innerText = faction.baseUpgraded;
  juice -= 5;
  upgraded = true;
  updateUI();
}

function animateGatherer() {
  const unit = document.getElementById("unit");
  const base = document.getElementById("base");

  unit.innerText = faction.unit;
  base.innerText = faction.base;

  const ux = 100, uy = 100;
  const bx = 200, by = 200;
  const dx = bx - ux, dy = by - uy;

  let p = 0;

  function move() {
    p += 0.02;
    const nx = ux + dx * p;
    const ny = uy + dy * p;
    unit.style.left = nx + "px";
    unit.style.top = ny + "px";

    if (p < 1) requestAnimationFrame(move);
    else {
      juice++;
      updateUI();
      setTimeout(() => {
        unit.style.left = ux + "px";
        unit.style.top = uy + "px";
        animateGatherer();
      }, upgraded ? 500 : 1000);
    }
  }

  requestAnimationFrame(move);
}

function spawnMiniBot() {
  const bot = document.createElement("div");
  bot.className = "unit";
  bot.innerText = "🛰️";
  bot.style.left = Math.random() * 300 + "px";
  bot.style.top = Math.random() * 300 + "px";
  document.getElementById("map").appendChild(bot);
  setTimeout(() => bot.remove(), 3000);
}

window.onload = () => {
  updateUI();
  animateGatherer();
  setInterval(spawnMiniBot, 5000);

  document.getElementById("buildHome").onclick = () => build("home");
  document.getElementById("buildBarracks").onclick = () => build("barracks");
  document.getElementById("spawnSoldier").onclick = spawnSoldier;
  document.getElementById("upgradeBase").onclick = upgradeBase;
  document.getElementById("restart").onclick = () => location.reload();
  document.getElementById("donate").onclick = () => alert("💸 Донат скоро будет!");
};