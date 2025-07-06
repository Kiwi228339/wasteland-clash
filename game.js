let goo = 0;

function build(type) {
  if (type === 'house') {
    alert("Построен дом! (+1 жильё)");
  } else if (type === 'barracks') {
    alert("Построена казарма! Можно нанимать бойцов.");
  }
}

function tick() {
  goo += 1;
  document.getElementById("goo").innerText = goo;
}

setInterval(tick, 1000);
