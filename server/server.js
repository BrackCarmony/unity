var express = require("express");
var axios = require("axios");
var app = express();

var port = 8083;
app.use(express.static(__dirname+"/../public"));

app.get('/api/pokemon/:id', function(req, res) { 
  var id = req.params.id;
  var url = "http://pokeapi.co/api/v1/pokemon/"+id+"/";
  let resp = axios.get(url).then(function(response){
    res.send(response.data);
  })
});

app.listen(port, function(){
  console.log("listening on port:", port);
})
