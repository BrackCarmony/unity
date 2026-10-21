const React = require('react');

module.exports = React.createClass({


  render(){
    return (
      <div>
        <h1 style = {this.styles.center}>Brack Carmony</h1>
        <img style = {this.styles.image} src = 'images/square.jpg'/>
        <div style = {this.styles.center}>Basic Text</div>
      </div>
    )
  },
  styles:{
    image:{
      width:'50%',
      margin:'auto',
      display:'block'
    },
    center:{
      textAlign:'center'
    }
  }
})
