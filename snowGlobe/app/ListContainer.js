const React = require('react');
const AddItem = require("./AddItem");
const List = require("./List");
const VerticleDotDistribution = require('./components/VerticleDotDistribution');

module.exports = React.createClass({
  getInitialState (){
    return {
      list:this.randomArray()
    }
  },
  randomArray(){
    let arry = [];
    for (let i=0;i<30;i++){
      arry.push(Math.floor(Math.random()*100))
    }
    return arry
  },
  handleAddItem(newItem){
    this.setState({
      list:this.state.list.concat([newItem])
    });
  },
  handleRemoveItem (index){
    var newList = this.state.list;
    newList.splice(index, 1);
    this.setState({
      list:newList
    })
  },
  render(){
    return (
      <div style = {this.styles.chartDiv}>
        <div style = {this.styles.center}>

          <div style = {this.styles.parentList}>
            <div style = {this.styles.D3Chart}>
              <VerticleDotDistribution points = {this.state.list} r = '1'/>
            </div>
            <div style = {this.styles.List}>
              <AddItem add = {this.handleAddItem}></AddItem>
              <List items = {this.state.list} remove = {this.handleRemoveItem}></List>
            </div>
          </div>
        </div>
      </div>
    )
  },
  styles:{
    D3Chart:{
      maxWidth:'60px',
      display:"inline-block",
      verticalAlign:"top",
      flex:1
    },
    List:{
      padding:"10px",
      display:"inline-block",
      flex:4
    },
    parentList:{
      display:'flex'
    },
    chartDiv:{
      minHeight:"300px",
      backgroundColor:"mintcream",
      border:"1px solid black",
      padding:"10px",
      margin:"10px",
      position:"relative",
      boxSizing:"border-box"
    }

  }
})
