import React from 'react';
import Button from '@material-ui/core/Button';
import SimpleMenu from './Menu';
import InputSlider from './Slider';
import ItemBlock from './ItemBlock';
import './App.css';
import algorithm from './Algorithms';


class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      arr: [2],
      algorithm: "",
      isSorted: false,
      itemBlockStatus: []
    }
  };

  changeAlgorithm = algorithm => {
    this.setState({algorithm: algorithm});
  }

  changeArrSize = size => {
    let arr = [];
    let itemBlockStatus = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.random() * 100);
      itemBlockStatus.push("default");
    }
    this.setState({arr: arr, itemBlockStatus: itemBlockStatus});
  }

  handleClick = () => {
    switch (this.state.algorithm) {
      case "Bubble":
        algorithm.bubbleSort.call(this, this.state.arr, this.state.itemBlockStatus);
        break;
      case "Selection":
        algorithm.selectionSort.call(this, this.state.arr, this.state.itemBlockStatus);
        break
      case "Insertion":
        break;
      case "Merge":
        break;
      case "Quicksort":
        break;
      case "Heap":
        break;
      default:
        break;
    }
  }

  render() {
    const itemWidth = window.innerWidth / this.state.arr.length - 2;
    let itemBlocks = this.state.arr.map((item, index) => {
      let blockColor = setColor(this.state.itemBlockStatus[index]);
      return <ItemBlock key={index} itemWidth = {itemWidth} itemHeight = {item} blockColor = {blockColor}/>;
    })
    return (
      <div>
        <header style={{display:"flex",alignItems:"center"}}>
          <div style={{display:"flex",flex:1,justifyContent:"center"}}>
            <SimpleMenu changeAlgorithm = {this.changeAlgorithm} algorithm = {this.state.algorithm}/>
          </div>
          <div style={{display:"flex",flex:1,justifyContent:"center"}}>
            <InputSlider changeArrSize = {this.changeArrSize}/>
          </div>
          <div style={{display:"flex",flex:1,justifyContent:"center"}}>
            <Button variant="contained" color="primary" onClick={this.handleClick}>
              Sort Array
            </Button>
          </div>
        </header>
          <div style={{display:"flex"}}>
            {itemBlocks}
          </div>
      </div>
    );
  }
}

function setColor(itemBlockStatus) {
  switch (itemBlockStatus) {
    case "analyzed":
      return "#F98334";
    case "sorted":
      return "#3ECF8E";
    default:
      return "#408AF8";
  }
}

export default App;