const React = require("react");
const ReactDOM = require("react-dom");
const AddItem = require('./AddItem');
const List = require('./List');
const ListContainer = require('./ListContainer');
const DCube = require('./components/DCube');
const About = require('./components/About');
const Projects = require('./components/Projects');

var side = 0;

const App = React.createClass({
  getInitialState(){
    return {
      selectedFace:0
    }
  },
  render (){
    return (<div>
      <ul style = {this.styles.linkCollection}>
        <a style = {this.styles.link} onClick={this.gotoFace.bind(null, 0)}>Rotate</a>
        <a style = {this.styles.link} onClick={this.gotoFace.bind(null, 1)}>Rotate</a>
        <a style = {this.styles.link} onClick={this.gotoFace.bind(null, 2)}>Rotate</a>
        <a style = {this.styles.link} onClick={this.gotoFace.bind(null, 3)}>Rotate</a>
        <a style = {this.styles.link} onClick={this.gotoFace.bind(null, 4)}>Rotate</a>
        <a style = {this.styles.link} onClick={this.gotoFace.bind(null, 5)}>Rotate</a>
      </ul>
      <div>
        <DCube selected = {this.state.selectedFace}>

          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <img selected = {this.state.selectedFace == 1}style = {{'maxWidth':'60px','maxHeight':'60px'}} src = "images/angular-icon.svg"/>
          <img style = {{'maxWidth':'60px','maxHeight':'60px'}} src = "images/ember-tomster.svg"/>
          <img style = {{'maxWidth':'60px','maxHeight':'60px'}} src = "images/firebase.svg"/>
          <img style = {{'maxWidth':'60px','maxHeight':'60px'}} src = "images/nodejs-icon.svg"/>
          <img style = {{'maxWidth':'60px','maxHeight':'60px'}} src = "images/Logo_D3.svg.png"/>
          <img style = {{'maxWidth':'60px','maxHeight':'60px'}} src = "images/square.jpg"/>
          <img style = {{'maxWidth':'60px','maxHeight':'60px'}} src = "images/react.svg"/>
          <img style = {{'maxWidth':'60px','maxHeight':'60px'}} src = "images/javascript.svg"/>
          <img style = {{'maxWidth':'60px','maxHeight':'60px'}} src = "images/visual-basic.svg"/>
          <img style = {{'maxWidth':'60px','maxHeight':'60px'}} src = "../elo.png"/>
          <img style = {{'maxWidth':'60px','maxHeight':'60px'}} src = "../globe.png"/>
          <img style = {{'maxWidth':'60px','maxHeight':'60px'}} src = "../poke.png"/>
          <img style = {{'maxWidth':'60px','maxHeight':'60px'}} src = "../q.png"/>
          <img style = {{'maxWidth':'60px','maxHeight':'60px'}} src = "../unity.png"/>
          <div>AngularJS</div>
          <div>Brack</div>
          <div>Carmony</div>
          <div>D3</div>
          <div>Firebase</div>
          <div>React</div>
          <div>EmberJS</div>
          <div>NodeJS</div>
          <div>C++</div>
          <div>VBA</div>
          <div>Java</div>
          <div>Javascript</div>
        </DCube>
      </div>
       </div>)
  },
  gotoFace(face){
    this.setState({selectedFace:face});
  },
  styles:{
    linkCollection:{
      display:'flex'
    },
    link:{
      flex:1,
      display:"inline",
      cursor:"pointer"
    },

  },
  randomSide(){
    this.setState({selectedFace: Math.floor(Math.random()*6)})
  }
});

ReactDOM.render(
  <App />,document.getElementById('app')
);
/*<About />
<ListContainer />
<Projects />*/
