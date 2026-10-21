// Pokémon on a force layout, pulled toward their spot on a stat-vs-stat chart.
// Data and sprites are local (built by scripts/build-pokemon.mjs), so every generation loads at once.
var STATS = {
  attack: "Attack", defense: "Defense", sp_atk: "Special Attack", sp_def: "Special Defense",
  speed: "Speed", hp: "Hit Points", total: "Base Stat Total", exp: "Base Exp", id: "Pokedex Index"
};
var ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

var xStat = "attack";
var yStat = "sp_atk";
var allPokemon = [];
var shown = [];            // nodes currently in the force layout
var selectedGens = { 1: true };
var xRange = [0, 1], yRange = [0, 1];

var svg = d3.select("#chartSvg");
var width = function () { return svg.node().clientWidth; };
var height = function () { return svg.node().clientHeight; };

var force = d3.layout.force()
  .size([width(), height()])
  .nodes(shown)
  .gravity(0)
  .chargeDistance(150)
  .on("tick", tick);

// Smaller sprites and weaker repulsion as more Pokémon are on screen.
function imgSize() { return shown.length > 600 ? 26 : shown.length > 250 ? 32 : 40; }
function charge() { return shown.length > 600 ? -18 : shown.length > 250 ? -30 : -50; }

function setRanges() {
  var pad = function (extent) { return [extent[0] * 0.9 - 10, extent[1] * 1.1 + 10]; };
  xRange = pad(d3.extent(shown, function (d) { return d[xStat]; }));
  yRange = pad(d3.extent(shown, function (d) { return d[yStat]; }));
}

function target(d) {
  return {
    x: (d[xStat] - xRange[0]) / (xRange[1] - xRange[0]) * width(),
    y: (d[yStat] - yRange[0]) / (yRange[1] - yRange[0]) * height()
  };
}

function update() {
  var keep = {};
  shown.forEach(function (d) { keep[d.id] = d; });
  var next = allPokemon.filter(function (d) { return selectedGens[d.gen]; });

  // Reuse node objects that stay on screen so they don't jump; new ones start near their target.
  shown.length = 0;
  next.forEach(function (d) { shown.push(keep[d.id] || d); });
  if (shown.length) setRanges();
  shown.forEach(function (d) {
    if (keep[d.id]) return;
    var t = target(d);
    d.x = t.x + (Math.random() - 0.5) * 40;
    d.y = t.y + (Math.random() - 0.5) * 40;
  });

  var size = imgSize();
  var images = svg.selectAll(".pokemon").data(shown, function (d) { return d.id; });
  images.exit().remove();
  images.enter().append("image")
    .attr("class", "pokemon")
    .attr("href", function (d) { return d.sprite; })
    .call(force.drag())
    .append("title").text(function (d) { return "#" + d.id + " " + d.name; });
  images.attr("width", size).attr("height", size);

  d3.select("#count").text(shown.length + " Pokémon");
  force.charge(charge()).start();
}

function tick(e) {
  var w = width(), h = height(), k = 0.5, half = imgSize() / 2;
  shown.forEach(function (d) {
    var t = target(d);
    d.x += (t.x - d.x) * e.alpha * k;
    d.y += (t.y - d.y) * e.alpha * k;
    d.x = Math.max(half, Math.min(w - half, d.x));
    d.y = Math.max(half, Math.min(h - half, d.y));
  });
  svg.selectAll(".pokemon")
    .attr("x", function (d) { return d.x - half; })
    .attr("y", function (d) { return h - d.y - half; });
}

function buildControls(generations) {
  ["xStat", "yStat"].forEach(function (id) {
    var select = d3.select("#" + id);
    Object.keys(STATS).forEach(function (key) {
      select.append("option").attr("value", key).text(STATS[key]);
    });
    select.property("value", id === "xStat" ? xStat : yStat).on("change", function () {
      if (id === "xStat") xStat = this.value; else yStat = this.value;
      labelAxes();
      setRanges();
      force.resume();
      force.alpha(0.1);
    });
  });

  var bar = d3.select("#generations");
  generations.forEach(function (g) {
    var count = allPokemon.filter(function (d) { return d.gen === g.number; }).length;
    bar.append("button")
      .attr("type", "button")
      .attr("class", "gen")
      .attr("aria-pressed", !!selectedGens[g.number])
      .attr("title", (g.region ? g.region[0].toUpperCase() + g.region.slice(1) : "") + " · " + count + " Pokémon")
      .text("Gen " + (ROMAN[g.number] || g.number))
      .on("click", function () {
        selectedGens[g.number] = !selectedGens[g.number];
        d3.select(this).attr("aria-pressed", !!selectedGens[g.number]);
        update();
      });
  });
  [["All", true], ["None", false]].forEach(function (pair) {
    bar.append("button").attr("type", "button").attr("class", "gen bulk").text(pair[0]).on("click", function () {
      generations.forEach(function (g) { selectedGens[g.number] = pair[1]; });
      bar.selectAll(".gen:not(.bulk)").attr("aria-pressed", pair[1]);
      update();
    });
  });
}

function labelAxes() {
  d3.select("#xStatLabel").text(STATS[xStat]);
  d3.select("#yStatLabel").text(STATS[yStat]);
}

window.addEventListener("resize", function () {
  force.size([width(), height()]).resume();
});

d3.json("./pokemon.json", function (error, data) {
  if (error) {
    d3.select("#count").text("Couldn't load the Pokémon data. Reload to try again.");
    return;
  }
  allPokemon = data.pokemon.filter(function (d) { return d.sprite; });
  buildControls(data.generations);
  labelAxes();
  update();
});
