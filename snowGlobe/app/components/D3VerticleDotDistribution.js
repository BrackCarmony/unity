const React = require('react');

module.exports = React.createClass({

  getDefaultProps(){
    return {
      points:[],
      boxWidth:20,
      boxHeight:100,
      minY:0,
      maxY:100,
      r:2
    }
  },
  makeDots(){
    //console.log(this)
    if (this.props.points){
      var count = this.props.points.length;
    return (this.props.points.map((item, index) =>
      (<circle
      key = {index+"str"}
      cx={(index+1)/(count+1)*this.props.boxWidth}
      cy={(item-this.props.minY)/(this.props.maxY-this.props.minY)*this.props.boxHeight}
      r={this.props.r}
      />)
    ));
    }
  },
  render(){
    return (
      <svg viewBox = {'0 0 ' + this.props.boxWidth + " " + this.props.boxHeight}>
        <rect x={this.props.boxWidth/2 -.25} y = '0' width = '.5' height = {this.props.boxHeight} />
        <rect x='0' y = '0' width = {this.props.boxWidth} height = '.25' />
        <rect x='0' y = {this.props.boxHeight-.25} width = {this.props.boxWidth} height = '.25' />
        {this.makeDots()}
      </svg>
    )
  }
})
