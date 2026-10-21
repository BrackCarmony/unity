var pet, events;
var description = 'Asking ChatPGT'

pet = getRandomAnimal()
events = getRandomEvents()
description = getEventDescription(pet, events);

var messageArray  = [
  {display:"", file:"console", message:"This is a test of the emergency website broadcast system"},
  {display:"", file:"console", message:"Seems like there`s not much here."},
  {display:"", file:"console", message:"Well let`s change that."},
  {display:"", file:"style", message:"* {transition:1s}"},
  {display:"", file:"style", message:"body, html{padding:0;margin:0}"},
  {display:"", file:"style", message:"#console {background-color:Ωrgba(25,25,25,.6)Ω;"},
  {display:"", file:"style", message:"color:white;"},
  {display:"", file:"style", message:"font-size:.75em;"},
  {display:"", file:"style", message:"font-family:ΩMonaco, monospacedΩ;"},
  {display:"", file:"style", message:"position:absolute;"},
  {display:"wide", file:"style", message:"top:0;"},
  {display:"tall", file:"style", message:"bottom:0;"},
  {display:"wide", file:"style", message:"right:0;"},
  {display:"tall", file:"style", message:"left:0;"},
  {display:"", file:"style", message:"overflow:scroll;"},
  {display:"wide", file:"style", message:"height:95%;"},
  {display:"tall", file:"style", message:"height:30%;"},
  {display:"wide", file:"style", message:"width:50%;"},
  {display:"tall", file:"style", message:"width:100%;"},
  {display:"", file:"style", message:"perspective:Ω500px;Ω"},
  {display:"", file:"style", message:"transform:rotate3dΩ(0, 38, 0, 30deg)Ω}"},
  {display:"", file:"console", message:"There, Now we have some room to work."},

  {display:"", file:"index", message:"<h1>Brack Carmony</h1>"},
  {display:"", file:"index", message:"<h2>Web Developer</h2>"},
  {display:"", file:"index", message:"<p>I`m a math nerd turned programmer.  I`m really not all that fond of talking about myself.  But I saw <a href='http://strml.net/'>this webpage</a> and thought it looked pretty fun to try and emulate.  Sure I probably shouldn`t link to a site that does this same sort of thing better than me...  There`s a reason I don`t work in marketing. </p>"},
  {display:"", file:"index", message:"<p>Part of me just really wants to throw lorem ibpem text in here instead of comming up with something unique to say... </p>"},
  {display:"", file:"index", message:"<p>I know, what if I had ChatGPT come up with the next bit... is this random idea I had from years ago able to handle some dynamic content do you think? </p>"},
  {display:"", file:"index", message:"<p>Let`s see if I can get it to work... </p>"},
  {display:"", file:"console", message:"Well I don't want to expose my API key here.  Which means I could call my server to make the request, it's a bit cheaty, but I make the rules around here anyway."},
  {display:"", file:"console", message:"First things first though.  I need to make this work with non static data."},
  {display:"", file:"javascript", message:"function getRandomAnimal(){ let options = ['cat', 'bird', 'dog', 'fish', 'lizard', 'snake', 'hamster', 'gerbil', 'parrot'] let index = Math.floor(Math.random()*options.length); return options[index]; }"},
  {display:"", file:"javascript", message:"function getRandomEvents(){ let options = ['dream', 'breakfast', 'lunch', 'dinner', 'wedding', 'christmas', 'birthday'] let index = Math.floor(Math.random()*options.length); return options[index]; }"},
  {display:"", file:"javascript", message:`function getEventDescription(animal, events){ 
    fetch('/api/chat/'+\`You are a \${animal} describe your \${events}\`)
      .then(response=>response.text())
      .then(data=>{
        messageArray.forEach(message=>{
          if (message.findMe){
            message.message = "<p> "+ data + "</p>";
          }
        })
        description = data 
      });
      return 'asking chatgpt';
  }`},

  

  {display:"", file:"index", message:`<p>What random pet are you? ... pet = ${pet} </p>`},
  {display:"", file:"index", message:`<p>What are you describing?... events = ${events} </p>`},

  {display:"", file:"index", message:`<p>${getDescription()} </p>`, findMe:true},
  {display:"", file:"index", message:`<p> Thanks for that ChatGPT, I'll be sure to credit you in the comments. </p>`},
  {display:"", file:"style", message:"*{box-sizing:borderbox}"},
  {display:"wide", file:"style", message:"p{padding-left:30px;"},
  {display:"tall", file:"style", message:"p{"},
  {display:"", file:"style", message:" font-size:10px;"},
  {display:"", file:"style", message:" text-align:Ωjustify;"},
  {display:"", file:"style", message:" text-indent:Ω15pxΩ;"},
  {display:"", file:"style", message:" text-indent:Ω15pxΩ;"},

  {display:"tall", file:"style", message:" width:95%;"},
  {display:"tall", file:"style", message:" margin:Ω0 auto 10px autoΩ;}"},
  {display:"wide", file:"style", message:" width:Ω45%Ω;}"},

  {display:"", file:"style", message:"#index{overflow:auto;"},
  // {display:"", file:"style", message:"background-color:#A9FFD4;"},
  {display:"", file:"style", message:"color:#101915;"},
  {display:"", file:"style", message:'font-family: Ω"Palatino", Times, serifΩ;}'},
  {display:"", file:"style", message:'h1,h2{display:"", font-family:Ω"Impact","Arial Black",sans-serifΩ;}'},
  {display:"", file:"style", message:'h1{margin:0px;'},
  {display:"", file:"style", message:'padding:10px;'},
  {display:"", file:"style", message:'background-color:darkslategrey;'},
  {display:"", file:"style", message:'color:mintcream}'},
  {display:"", file:"style", message:'h2{padding:Ω5px 5px 5px 30pxΩ;'},
  {display:"", file:"style", message:'margin:0px;}'},

  {display:"", file:"console", message:"Okay, so maybe colors aren't my strong suit..."},
  {display:"", file:"console", message:"I know, let's go with some high rez images..."},
  {display:"", file:"console", message:"Those are in right?"},

  {display:"wide", file:"index", message:"<div click='globalJavaFunction' class='background-image leaf'><div class = 'picture-button'>Leafy Green</div></div>"},
  {display:"wide", file:"index", message:"<div class='background-image marble'><div class = 'picture-button'>Marble Grey</div></div>"},
  {display:"wide", file:"index", message:"<div class='background-image twilight'><div class = 'picture-button'>Twilight Ghost</div></div>"},
  {display:"tall", file:"index", message:"<div click='globalJavaFunction' class='background-image leaf'><div class = 'picture-button'>Leaf</div></div>"},
  {display:"tall", file:"index", message:"<div class='background-image marble'><div class = 'picture-button'>Marble</div></div>"},
  {display:"tall", file:"index", message:"<div class='background-image twilight'><div class = 'picture-button'>Twilight</div></div>"},
  {display:"", file:"style", message:'.leaf{background-image:url("leaf.jpg");}'},
  {display:"", file:"style", message:'.marble{background-image:url("marble.jpg");}'},
  {display:"", file:"style", message:'.twilight{background-image:url("twilight.jpg");}'},
  {display:"", file:"style", message:'#index{height:100vh;'},
  {display:"", file:"style", message:'overflow:scroll;}'},
  {display:"", file:"style", message:'.background-image{'},
  {display:"", file:"style", message:'background-size:cover;'},
  {display:"", file:"style", message:'background-position:center;'},

  {display:"", file:"style", message:'position:relative;'},
  {display:"", file:"style", message:'height:1em;'},
  {display:"wide", file:"style", message:'height:45%;}'},
  {display:"tall", file:"style", message:'height:Ω33.33333vwΩ;}'},

  {display:"", file:"style", message:'.picture-button{color:white;'},
  {display:"", file:"style", message:'display:Ωinline-blockΩ;'},
  {display:"", file:"style", message:'position:absolute;'},
  {display:"", file:"style", message:'border:Ω1px solid whiteΩ;'},
  {display:"", file:"style", message:'padding:15px;'},


  {display:"", file:"style", message:'margin:0;'},
  {display:"", file:"style", message:'top:0;'},
  {display:"", file:"style", message:'top:Ω50%Ω;'},
  {display:"", file:"style", message:'left:0;'},
  {display:"", file:"style", message:'left:Ω50%Ω;'},
  {display:"", file:"style", message:'margin-right:Ω-50%Ω;'},
  {display:"", file:"style", message:'transform:Ωtranslate(-50%, -50%)Ω;'},
  {display:"", file:"style", message:'border-radius:6px;}'},

  {display:"", file:"style", message:'.background-image{'},

  {display:"", file:"style", message:'width:Ω100%Ω;'},
  {display:"", file:"style", message:'width:Ωcalc(99% / 3)Ω;'},
  {display:"", file:"style", message:'display:Ωinline-blockΩ;}'},

  {display:"", file:"console", message:"I suppose I should include those social links..."},

  {display:"", file:"index", message:"<div class = 'icons'>"},
  {display:"", file:"index", message:'<a href = "http://brackcarmony.com"><i class="fa fa-globe" aria-hidden="true"></i></a>'},
  {display:"", file:"index", message:'<a href = "https://github.com/kedirech/"><i class="fa fa-github" aria-hidden="true"></i></a>'},
  {display:"", file:"index", message:'<a href = "https://www.facebook.com/brackcarmony"><i class="fa fa-facebook-square" aria-hidden="true"></i></a>'},
  {display:"", file:"index", message:'<a href = "https://github.com/Kedirech/self-build"><i class="fa fa-code" aria-hidden="true"></i></a>'},
  {display:"", file:"index", message:'<a href = "mailto:brackcarmony@gmail.com"><i class="fa fa-envelope" aria-hidden="true"></i></a>'},
  {display:"", file:"index", message:"</div> "},
  {display:"", file:"style", message:'.icons a{color:ΩblackΩ}'},
  {display:"", file:"style", message:'.icons a:hover{color:ΩblueΩ;'},
  {display:"", file:"style", message:'transition:.1s;'},
  {display:"", file:"style", message:'cursor:ΩpointerΩ;}'},

  {display:"", file:"style", message:'.icons{'},
  {display:"", file:"style", message:'display:Ωflex;Ω'},
  {display:"", file:"style", message:'justify-content:Ωspace-around;Ω'},
  {display:"", file:"style", message:'font-size:Ω10vw;Ω'},
  {display:"wide", file:"style", message:'width:Ω50%;Ω'},
  {display:"tall", file:"style", message:'width:Ω100%;Ω'},
  {display:"", file:"style", message:'}'},




  {display:"", file:"console", message:"Feel free to poke around the source code..."},

  {display:"", file:"console", message:"or shoot me an email."},

  {display:"", file:"console", message:"comments are always appreciated."},


]

var spd = 10;
var lineIndex=0;
var letterIndex=0;
var target;


var cons = document.getElementById("console");
var display = window.innerHeight>window.innerWidth?"tall":"wide";
var fileType = messageArray[0].file;
var files = {
  index:"",
  console:"console -- ",
  style:"",
  javascript:""
}

let functions = {

}

function getRandomAnimal(){ 
  let options = ['cat', 'bird', 'dog', 'fish', 'lizard', 'snake', 'hamster', 'gerbil', 'parrot'] 
  let index = Math.floor(Math.random()*options.length); 
  return options[index]; 
}

function getRandomEvents(){ 
  let options = ['dream', 'breakfast', 'lunch', 'dinner', 'wedding', 'christmas', 'birthday'] 
  let index = Math.floor(Math.random()*options.length); 
  return options[index]; 
}

function getDescription(){
  return description;
}

function getEventDescription(animal, events){ 
  fetch('/api/chat/'+`You are a ${animal} describe your ${events}`)
    .then(response=>response.text())
    .then(data=>{
      console.log(`spy: data`, data); // BURN
      messageArray.forEach(message=>{
        if (message.findMe){
          message.message = "<p> "+ data + "</p>";
        }
      })
      description = data 
    });
    return 'asking chatgpt';
}

function nextLetter() {
  var letters = getLetter().replace(/`/g,"'").replace(/Ω/g,"");

  files.console += letters.replace("<","&lt")//messageArray[lineIndex].message[letterIndex]=="<"?"&lt;":messageArray[lineIndex].message[letterIndex];
  cons.innerHTML = files.console;
  // console.log(cons)
  cons.scrollTop = 100000;
  if (target){
    // console.log(fileType);
    // console.log(target);
    files[fileType] += letters;
    // console.log(files);
    target.innerHTML = files[fileType];
  }
  letterIndex++;

  if (letterIndex >= messageArray[lineIndex].message.length){
    letterIndex = 0;
    lineIndex++;
    console.log(messageArray[lineIndex].display);
    while (messageArray[lineIndex].display && messageArray[lineIndex].display !=display){
      console.log(display,messageArray[lineIndex].display);
      console.log("skipping", messageArray[lineIndex].message);
      lineIndex++;
    }
    if (lineIndex == messageArray.length) return;

    fileType = messageArray[lineIndex].file;
    files.console += "<br/>" + messageArray[lineIndex].file + " -- "
    target = (messageArray[lineIndex].file ==="console"? null: document.getElementById(messageArray[lineIndex].file));
    spd = spd * .95;
    setTimeout(nextLetter,spd*100)
  }else{
    setTimeout(nextLetter,spd)
  }
}

nextLetter();

function getLetter(){

  var match ="";
  switch(messageArray[lineIndex].message[letterIndex]){
    case "Ω":

    match = "Ω";
    break;
    case "'":

    match = "'";
    break
    case "<":

    match = ">";
    break
    case '"':

    match = '"';
    break

    default:
    return messageArray[lineIndex].message[letterIndex];
  }
  var retStr = messageArray[lineIndex].message[letterIndex++];
   while (messageArray[lineIndex].message[letterIndex] != match && messageArray[lineIndex].message[letterIndex]){
     retStr += messageArray[lineIndex].message[letterIndex++]
   }
  //  letterIndex++;

   return retStr + match;
}
