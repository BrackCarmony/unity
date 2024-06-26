
var pokemons = [];
var baseUri = "http://pokeapi.co";
var presentation = false;
var startRange =1;
var endRagne =150; // (presentation?150:721);
var imgSize = (presentation?70:40);
var charge = (presentation?-200:-50)

var xStat = "attack";
var yStat = "sp_atk";

var maxYStat = 0;
var minYStat = 999*999*999;
var maxXStat = 0;
var minXStat = 999*999*999;
var pokemonImgs;

var statSelectors = {
  hp: d=>d.stats[0].base_stat,
  attack: d=>d.stats[1].base_stat,
  defense: d=>d.stats[2].base_stat,
  sp_atk: d=>d.stats[3].base_stat,
  sp_def: d=>d.stats[4].base_stat,
  speed: d=>d.stats[5].base_stat,
  exp: d=>d.base_experience,
  pkdx_id: d=>d.index
}


var d3Div = d3.select("#chartSvg");
force = d3.layout.force()
          .size([d3Div[0][0].clientWidth, d3Div[0][0].clientHeight])
          .nodes(pokemons)
          .charge(charge)
          .gravity(0)
          .chargeDistance(150)
          .on("tick", tick);

function getPokemon(id){
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function(){

    if (httpRequest.readyState === XMLHttpRequest.DONE) {
    // everything is good, the response is received
    var resp = JSON.parse(httpRequest.responseText);
    console.log(`spy: resp`, resp); // BURN
    console.log(`spy: resp.sprites`, resp.sprites); // BURN
    pokemons.push(resp);
    // var spriteRequest = new XMLHttpRequest();
    // spriteRequest.onreadystatechange = function(){
      // if (spriteRequest.readyState === XMLHttpRequest.DONE) {
        // var sprites = JSON.parse(spriteRequest.responseText);
        // resp.spriteObjects = sprites;
        // pokemons.push(resp);
        //console.log(resp);
        updateChart();
      // }
    // }

    } else {
        // still not ready
    }
  }
  httpRequest.open('GET',"/api/pokemon/"+id+"/", true);
  httpRequest.send(null);
}






function updateChart(){

  if(force){
    force.stop();
  }

    startPhysics();

  var chartSvg = d3.select('#chartSvg');

  pokemonImgs = chartSvg.selectAll(".pokemon")
  .data(pokemons)

  pokemonImgs.enter()
  .append("svg:image")
  .classed("pokemon", true)
  .attr("href",function(d){
    return  d.sprites.front_default;
  })
  .attr('width', imgSize)
  .attr('height', imgSize)
  .style("x",function(d){ return statSelectors[xStat](d) * 4 + 'px'})
  .style("y",function(d){ return statSelectors[yStat](d) * 4 + 'px'})
  .on('load', loadNext)
  .call(force.drag());


  setStatSort();


}

function setStatSort(){
  var xStats = _.map(pokemons, statSelectors[xStat]);
  console.log(`spy: xStats`, xStats); // BURN
  var yStats = _.map(pokemons, statSelectors[yStat]);
  console.log(`spy: yStats`, yStats); // BURN
  //console.log(pokemons);

   maxYStat = _.max(yStats)*1.1+10;
   minYStat = _.min(yStats)*.9-10;
   maxXStat = _.max(xStats)*1.1+10;
   minXStat = _.min(xStats)*.9-10;

  console.log(minXStat, xStats);
  console.log(minYStat, yStats);
}

function startPhysics(){
  force.start();
}


function tick(e){
  console.log("Tick runninng... I be confused");
  
  
  pokemons.forEach(function(item){
    // //console.log(e, item);
    // //console.log("_----------------------");
    // //console.log(item.x);
    var k =.5;
    item.x +=   ((statSelectors[xStat](item)-minXStat)/(maxXStat-minXStat)*(d3Div[0][0].clientWidth) - item.x)*e.alpha*k;
    item.y +=   ((statSelectors[yStat](item)-minYStat)/(maxYStat-minYStat)*(d3Div[0][0].clientHeight) - item.y)*e.alpha*k;
    // //console.log(item.x);
  })

  pokemons.forEach(function(item){
    item.x = Math.max((item.x+10)/2,item.x);
    item.y = Math.max((item.y+10)/2,item.y);
    item.x = Math.min((d3Div[0][0].clientWidth+item.x-10)/2,item.x);
    item.y = Math.min((d3Div[0][0].clientHeight-10 + item.y)/2,item.y);
  })

  pokemonImgs.style("x",function(d){return d.x +25 + "px";})
  .style("y",function(d){return d3Div[0][0].clientHeight - d.y -25 +"px";});
}

// for (var i=1;i<=150;i++){
//   var poke = 0;
//   setTimeout(function(){getPokemon(++poke)}, 100*i)
//}

document.getElementById('pokemonId').addEventListener('change', function(e){
  getPokemon(e.srcElement.value*1);
});

document.getElementById('xStat').addEventListener('change', function(e){
  xStat = e.srcElement.value;
  document.getElementById('xStatLabel').innerHTML = convertToText(xStat);
  setStatSort();
  force.resume();
});
document.getElementById('yStat').addEventListener('change', function(e){
  yStat = e.srcElement.value;
  document.getElementById('yStatLabel').innerHTML = convertToText(yStat);
  setStatSort();
  force.resume();
});

function makeLoader(){
  var cur = startRange;
  return function(){
    if (cur <=endRagne) getPokemon(cur++);
  }
}

function convertToText(str){
  var obj = {attack:"Attack",
  defense:"Defense",
  sp_atk:"Special Attack",
  sp_def:"Special Defense",
  speed:"Speed",
  exp:"Exp",
  hp:"Hit Points",
  pkdx_id:"Pokedex Index"}
  return obj[str];
}

var loadNext = makeLoader();

loadNext();
loadNext();
loadNext();
loadNext();
loadNext();
loadNext();
loadNext();
loadNext();
loadNext();
loadNext();
