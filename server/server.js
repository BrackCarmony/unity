var express = require("express");
var axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
var app = express();

const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAPI});



var port = 8083;

// console.log(`spy: process.env`, process.env); // BURN

app.use(express.static(__dirname+"/../public"));

app.get('/api/pokemon/:id', function(req, res) { 
  var id = req.params.id;
  var url = "http://pokeapi.co/api/v1/pokemon/"+id+"/";
  let resp = axios.get(url).then(function(response){
    res.send(response.data);
  })
});

app.get('/api/chat/:seed', function(req, res) {
  let seed = req.params.seed;
  console.log(`spy: seed`, seed); // BURN
  const prompt = seed;
  const gptResponse = openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {role: 'system', content: seed}
    ]
  })
  .then((response) => {
    console.log(`spy: response`, response); // BURN
    console.log(`spy: JSON(response.choices[0].message)`, JSON.stringify(response.choices[0].message, null, 2)); // BURN
    res.send(response.choices[0].message.content);
  })

})

app.listen(port, function(){
  console.log("listening on port:", port);
})
