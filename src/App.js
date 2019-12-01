import React from 'react';
import Button from '@material-ui/core/Button';
import SimpleMenu from './Menu';
import InputSlider from './Slider';
import ItemBlock from './ItemBlock'
import './App.css';


class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      arr: [2],
      algorithm: "",
      isSorted: true
    }
  };

  changeAlgorithm = algorithm => {
    this.setState({algorithm: algorithm});
  }

  changeArrSize = size => {
    let arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.random() * 100);
    }
    this.setState({arr: arr});
  }

  bubbleSort = (arr, index = 0) =>  {
    if(index === arr.length) {
      this.state.isSorted ? console.log("Eureka") : this.setState({arr: arr, isSorted: true},
        () => this.bubbleSort(this.state.arr, 0)  
      );
    }
    if (index < arr.length) {
      if (arr[index] > arr[index + 1]) {
        let temp = arr[index];
        arr[index] = arr[index + 1];
        arr[index + 1] = temp;
        this.setState({arr: arr, isSorted: false}, 
          () => setTimeout(() => this.bubbleSort(this.state.arr, index + 1), 30)
        );
      } else {
        this.setState({arr: arr},
          () => setTimeout(() => this.bubbleSort(this.state.arr, index + 1), 30)
        );
      }
    }
  }

  handleClick = () => {
    this.bubbleSort(this.state.arr);
    //this.setState({arr: this.state.arr.sort((a,b) => a-b)});
  }

  render() {
    const itemWidth = window.innerWidth / this.state.arr.length;
    let itemBlocks = this.state.arr.map((item, index) => <ItemBlock key={index} itemWidth = {itemWidth} itemHeight = {item}/>)
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




export default App;