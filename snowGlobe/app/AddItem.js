const React = require('react');

module.exports = React.createClass({
  getInitialState (){
    return {
      newItem:''
    }
  },
  handleChange(e){
    this.setState({
      newItem:e.target.value
    })
  },
  handleSubmit (e){
      if(this.state.newItem !==""){
        this.props.add(this.state.newItem);
        this.setState({
          newItem:''
        })
      }
  },
  handleEnter(e){
    if(e.keyCode === 13){
      this.props.add(this.state.newItem);
      this.setState({
        newItem:''
      })
    }
  },
  render(){
    return(
      <div>
      <input type = "text"
        className ="form-control"
        value ={this.state.newItem}
        placeholder = "New Item"
        onKeyUp = {this.handleEnter}
        onChange = {this.handleChange}/><span onClick = {this.handleSubmit}>+</span>
      </div>
    )
  }
})
