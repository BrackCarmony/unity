const React = require('react');
const _ = require('underscore');
const Card = require('./Card');
module.exports = React.createClass({

  getDefaultProps(){
    return{
      selected:3,
      size:'200px'
    }
  },
  componentWillMount(){
    for(let i=1;i<=6;i++){
      this.styles['face'+i] = _.extend(this.styles['face'+i], this.styles.face);
    }
    //console.log(this.styles);
  },
  componentWillReceiveProps(newProps){
    //console.log('New Props', newProps , 'oldProps', this.props)
  },
  render(){
    return (
      <div style = {this.styles.scene}>
        <div style = {_.extend(this.styles.cube, this.styles.selectFace[this.props.selected])}>
          {this.faces()}
        </div>
      </div>

    )
  },
  faces(){

      let temp = []
      for(let i=0;i<this.props.children.length;i++){
        if(i<6){
          temp.push(<div key = {'face'+i} style = {this.styles['face'+(i+1)]}> {this.props.children[i]}</div>)
        }else{
          temp.push(<div key = {'card'+i}><Card> {this.props.children[i]}</Card></div>)
        }
      }
      return temp;

  },
  styles:{
    scene:{
    perspective:"600px",
    height:'600px',
    width:'800px',
    position:'relative',
    margin:'50px auto',
  },
   cube:{
    height:'600px',
    width:'600px',
    position:'relative',
    transformStyle:'preserve-3d',
    transition:'transform 2s',
    display:'inline-block',
  },
  face:{
    margin: '0px',
    width: '100%',
    height: '100%',
    boxSizing:'border-box',
    display: 'block',
    position: 'absolute',
    border: '0px solid blue',
    borderRadius:'15px',
    backfaceVisibility:'visible',
    backgroundColor:'rgba(124,138,238,0)'
  },
  flat: {height:'50px', width:'50px'},
  face1: { transform: 'rotateY(   0deg ) translateZ(300px) ' },
  face2: { transform: 'rotateX( 180deg ) translateZ(300px) ' },
  face3: { transform: 'rotateY(  90deg ) translateZ(300px) ' },
  face4: { transform: 'rotateY( -90deg ) translateZ(300px) ' },
  face5: { transform: 'rotateX(  90deg ) translateZ(300px) ' },
  face6: { transform: 'rotateX( -90deg ) translateZ(300px) ' },
  selectFace:[{transform:'translateZ(-300px) rotateY(   0deg)  '},
              {transform:'translateZ(-300px) rotateX(-180deg) '},
              {transform:'translateZ(-300px) rotateY( -90deg) '},
              {transform:'translateZ(-300px) rotateY(  90deg) '},
              {transform:'translateZ(-300px) rotateX( -90deg) '},
              {transform:'translateZ(-300px) rotateX(  90deg) ' }]

  // .cube:hover{
  //   transform: translateZ( 0px ) rotateX( -7280deg ) scale3d(.5,.5,.5) rotateY(50deg);
  // }
  }

})
