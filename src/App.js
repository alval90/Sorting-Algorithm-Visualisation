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
      // TODO: Merge arr and itemBlockStatus into object
      arr: [],
      algorithm: "",
      isSorted: false
    }
  };

  componentDidMount () {
    this.changeArrSize(30);
  }

  changeAlgorithm = algorithm => {
    this.setState({algorithm: algorithm});
  }

  changeArrSize = size => {
    let arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(new Item(Math.random() * (100 - 5) + 5, "default", i));
    }
    this.setState({arr: arr});
  }

  handleClick = () => {
    switch (this.state.algorithm) {
      case "Bubble":
        algorithm.bubbleSort.call(this, this.state.arr);
        break;
      case "Selection":
        algorithm.selectionSort.call(this, this.state.arr);
        break
      case "Insertion":
        break;
      case "Merge":
        algorithm.mergeSort.call(this, this.state.arr, this.state.itemBlockStatus);
        break;
      case "Quicksort":
        algorithm.quickSort.call(this, this.state.arr, this.state.itemBlockStatus);
        break;
      case "Heap":
        break;
      default:
        break;
    }
  }

  render() {
    let { arr, algorithm } = this.state;
    const itemWidth = calculateItemWidth(arr.length);
    let itemBlocks = arr.map((item, index) => {
      let blockColor = setColor(item.status);
      return <ItemBlock key={index} itemWidth = {itemWidth} itemHeight = {item.height} blockColor = {blockColor}/>;
    })
    return (
      <div>
        <header style={{display:"flex", alignItems:"center"}}>
          <div style={{display:"flex", flex:1, justifyContent:"center"}}>
            <SimpleMenu changeAlgorithm = {this.changeAlgorithm} algorithm = {algorithm}/>
          </div>
          <div style={{display:"flex", flex:1, justifyContent:"center"}}>
            <InputSlider changeArrSize = {this.changeArrSize}/>
          </div>
          <div style={{display:"flex", flex:1, justifyContent:"center"}}>
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

class Item {
  constructor (height, status, index) {
    this.height = height;
    this.status = status;
    this.index = index;
  }
}

function calculateItemWidth (itemCount) {
  return window.innerWidth / itemCount - 2;
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