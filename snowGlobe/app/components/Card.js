const React = require('react');



var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  },
  componentWillReceiveProps: function(nextProps){
    //console.log("Firing state change?", nextProps, this.props);
  }
};

module.exports = React.createClass({
  mixins: [SetIntervalMixin],
  getInitialState(){
     let tempState = {
      xTranslate:Math.random()*400-200,
      yTranslate:Math.random()*400-200,
      zTranslate:Math.random()*400-200,
      xRotate:Math.floor(Math.random()*360),
      yRotate:Math.floor(Math.random()*360),
      zRotate:Math.floor(Math.random()*360),
      height:Math.random()*50+200+"px"
    }
    //transform:'translateX(300px) translateY(300px) rotateX( 45deg ) rotateY(32deg) rotateZ(87deg) translateZ(250px)'},
    //tempState.transform = "translate3d(" + 12 +"," + 13 + "," + 14+ ")"
    tempState.transform = 'translateX(300px) translateY(300px) rotateX('+tempState.xRotate+'deg) rotateY('+tempState.yRotate+'deg) rotateZ('+tempState.zRotate+'deg) translateZ('+tempState.height+')'
    return tempState;
  },
  componentDidMount: function() {

    this.setInterval(this.moveCard, 3000); // Call a method on the mixin
    //console.log("Component Did Mount");
    //console.log(this.state.transform);
    this.moveCard();
  },
  moveCard:function(){

    let xRotate=this.state.xRotate+Math.random()*200;
    let yRotate=this.state.yRotate+Math.random()*200;
    let zRotate=this.state.zRotate+Math.random()*200;
    this.setState({
      transform: 'translateX(300px) translateY(300px) rotateX('+xRotate+'deg) rotateY('+yRotate+'deg) rotateZ('+zRotate+'deg) translateZ('+this.state.height+')',
      xRotate:xRotate,
      yRotate:yRotate,
      zRotate:zRotate
    })
  },
  render(){
    //console.log(this.state.transform)
    return (
      <div style = { {
        margin: '0px',
        boxSizing:'border-box',
        display: 'block',
        position: 'absolute',
        backfaceVisibility:'visible',
        display: 'block',
        position: 'absolute',
        backfaceVisibility:'visible',
        transition:'transform 9s',
        transitionTimingFunction: 'linear',
        transform:this.state.transform
      }}>
        {this.props.children}
      </div>
    )
  }
})
