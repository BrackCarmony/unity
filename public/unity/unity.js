var pointsArray = [{
  x: 50,
  y: 550
}, {
  x: 150,
  y: 450
}, {
  x: 250,
  y: 350
}, {
  x: 350,
  y: 250
}, {
  x: 450,
  y: 150
}, {
  x: 50,
  y: 550
}, {
  x: 150,
  y: 450
}, {
  x: 250,
  y: 350
}, {
  x: 350,
  y: 250
}, {
  x: 450,
  y: 150
}]

var trunkArray = [{
  x: 20,
  y: 140
}, {
  x: 100,
  y: 160
}, {
  x: 195,
  y: 180
}, {
  x: 197,
  y: 300
}, {
  x: 200,
  y: 350
}, {
  x: 100,
  y: 400
}, {
  x: 150,
  y: 400
}, {
  x: 200,
  y: 350
}, {
  x: 240,
  y: 460
}, {
  x: 250,
  y: 400
}, {
  x: 255,
  y: 375
}, {
  x: 375,
  y: 410
}, {
  x: 400,
  y: 400
}, {
  x: 400,
  y: 400
}, {
  x: 260,
  y: 350
}, {
  x: 265,
  y: 300
}, {
  x: 260,
  y: 180
}, {
  x: 300,
  y: 160
}, {
  x: 390,
  y: 140
}];

var ropeArray = []
ropeArray[0] = [{
  x: 340,
  y: 160
}, {
  x: 345,
  y: 210
}, {
  x: 355,
  y: 240
}, {
  x: 370,
  y: 270
}, {
  x: 385,
  y: 290
}, {
  x: 400,
  y: 280
}, ]


var tireArray = [[],[]];
makeTire();
function makeTire() {
  for (var i = 0; i < 20; i++) {
    tireArray[0].push({
      x: 400 + 20 * Math.sin(i * 4 * Math.PI / 20),
      y: 300 - 20 * Math.cos(i * 4 * Math.PI / 20)
    })

    tireArray[1].push({
      x: 280 + 20 * Math.sin((i+2) * 4 * Math.PI / 20),
      y: 300 - 20 * Math.cos((i+2) * 4 * Math.PI / 20)
    })
  }
}


ropeArray[1] = ropeArray[0].map(function(point) {
  return {
    x: 340 * 2 - point.x,
    y: point.y
  }
})

var ropeSide = 0;
var leaves = [];

makeLeaves();

function makeLeaves() {
  for (var i = 0; i < 500; i++) {
    leaves.push(makeLeaf())
  }
}

function makeLeaf() {

  return {
    x: Math.random() * 700-100,
    y: Math.random() * 150,
    r: Math.random() * 5 + 2,
    a: Math.random() * 360,
  }
}


function makeLine(points) {
  return
}

var trunkText = "I am a tree trunk.  Hear me Wroar!!!!   I am a tree trunk.  Hear me Wroar!!!!   I am a tree trunk.  Hear me Wroar!!!!   I am a tree trunk.  Hear me Wroar!!!!   I am a tree trunk.  Hear me Wroar!!!!   I am a tree trunk.  Hear me Wroar!!!!   I am a tree trunk.  Hear me Wroar!!!!   I am a tree trunk.  Hear me Wroar!!!!   I am a tree trunk.  Hear me Wroar!!!!   I am a tree trunk.  Hear me Wroar!!!!   I am a tree trunk.  Hear me Wroar!!!!   I am a tree trunk.  Hear me Wroar!!!!   I am a tree trunk.  Hear me Wroar!!!!   I am a tree trunk.  Hear me Wroar!!!!   I am a tree trunk.  Hear me Wroar!!!!   I am a tree trunk.  Hear me Wroar!!!!   ";

var lineFunction = d3.svg.line()
  .x(function(d) {
    return d.x;
  })
  .y(function(d) {
    return d.y;
  })
  .interpolate("basis");


var svg = d3.select("#canvas");
svg.attr("height", 500).attr("width", 500);

var defs = svg.append("defs")

defs.append("path")
  .attr("id", "trunk");

defs.append("path")
  .attr("id", "tire");

defs.append("path")
  .attr("id", "rope");

svg.append("g")
  .classed("trunk", true)
  .append("text")
  .append("textPath")
  .classed("trunkText", true)
  .attr("xlink:href", "#trunk")
  .style("font-size", "50%")
  .text(trunkText)

svg.append("g")
  .classed("rope", true)
  .append("text")
  .append("textPath")
  .classed("ropeText", true)
  .attr("xlink:href", "#rope")
  .style("font-size", "50%")
  .text("Swing! swing. swing? Swing! swing. swing? Swing! swing. swing? Swing! swing. swing? Swing! swing. swing? Swing! swing. swing?");

  svg.append("g")
    .classed("tire", true)
    .append("text")
    .append("textPath")
    .classed("tireText", true)
    .attr("xlink:href", "#tire")
    .style("font-size", "50%")
    .text("Round and Round it goes, Round and Round it goes...");

svg.append("g")
  .classed("leaves", true)
  .selectAll(".leaves")
  .data(leaves)
  .enter()
  .append("text")
  .classed("leaf", true)
  .attr("transform", function(d) {
    return "translate(" + d.x + "," + d.y + ")rotate(" + d.a + ")";
  })
  .style("font-size", function(d) {
    return d.r + "px";
  })
  .text("leaf")




svg.select("#trunk")
  .data(trunkArray)
  .attr("d", lineFunction(trunkArray));

  svg.select("#rope")
    .data(ropeArray[ropeSide])
    .attr("d", lineFunction(ropeArray[ropeSide]));

    svg.select("#tire")
      .data(tireArray[ropeSide])
      .attr("d", lineFunction(tireArray[ropeSide]));

setInterval(slowInterval, 8000)

function slowInterval() {

  pointsArray = pointsArray.map(function(item) {

      return move(item)
    })
    // trunkText = trunkText.slice(1)+trunkText[0];
    // svg.selectAll("textPath")
    // .text(trunkText);

  ropeSide = 1 - ropeSide;
  svg.select("#rope")
    .data(ropeArray[ropeSide])
    .transition()
    .duration(9000)
    .attr("d", lineFunction(ropeArray[ropeSide]));

    svg.select("#tire")
      .data(tireArray[ropeSide])
      .transition()
      .duration(9000)
      .attr("d", lineFunction(tireArray[ropeSide]));

  // svg.select("#trunk")
  //   .data(pointsArray)
  //   .transition()
  //   .duration(1000)
  //   .ease("linear")
  //   .attr("d", lineFunction(trunkArray));

  leaves = leaves.map(function(leaf) {

    if (Math.random() < .03) {
      leaf.fall = true;
    }

    if (leaf.y < 400) {
      leaf.a = leaf.a + Math.random() * 360 - 180;
    }

    if (leaf.fall && leaf.y < 400) {
      leaf.y += 150;
      leaf.x += Math.random() * 100 - 50;
      leaf.a = leaf.a + Math.random() * 3600 - 1800;
    }

    return leaf;
  })

  svg.selectAll(".leaf")
    .data(leaves)
    .transition()
    .duration(9000)
    .ease("linear")
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")rotate(" + d.a + ")";
    })
}

slowInterval();
// setInterval(function(){
//
//   trunkText = trunkText.slice(1)+trunkText[0];
//   svg.selectAll(".trunkText")
//   .text(trunkText);
// },1000/20)



function move(point) {
  var speed = 200;
  return {
    x: between(point.x + Math.random() * speed * 2 - speed, 0, 500),
    y: between(point.y + Math.random() * speed * 2 - speed, 0, 500)
  }
}

function between(a, l, u) {

  return Math.min(Math.max(a, l), u);
}
