import React from "react";
import Button from "@material-ui/core/Button";
import SimpleMenu from "./Menu";
import InputSlider from "./Slider";
import ItemBlock from "./ItemBlock";
import algorithm from "./Algorithms";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      algorithm: "",
      isSorted: false,
      sorting: false
    };
  }

  componentDidMount() {
    this.changeArrSize(30);
  }

  changeAlgorithm = algorithm => {
    this.setState({ algorithm: algorithm });
  };

  changeArrSize = size => {
    let arr = [];
    for (let i = 0; i < size; i++) {
      let randomHeight = calcRandomInIntervall(5, 100);
      arr.push(new Item(randomHeight, "default", i));
    }
    this.setState({ arr: arr, isSorted: false });
  };

  handleClick = () => {
    if (!this.state.isSorted && !this.state.sorting) {
      this.setState({ sorting: true });
      let arr = JSON.parse(JSON.stringify(this.state.arr));
      switch (this.state.algorithm) {
        case "Bubble":
          algorithm.bubbleSort.call(this, arr);
          break;
        case "Selection":
          algorithm.selectionSort.call(this, arr);
          break;
        case "Insertion":
          break;
        case "Quicksort":
          algorithm.quickSortWrapper.call(this, arr, 0, arr.length - 1);
          break;
        case "Merge":
          algorithm.mergeSortWrapper.call(this, arr);
          break;
        default:
          break;
      }
    } else if (!this.state.isSorted && this.state.sorting) {
    } else {
      let arr = JSON.parse(JSON.stringify(this.state.arr));
      arr.sort((a, b) => a.index - b.index);
      arr.map(item => (item.status = "default"));
      this.setState({ arr: arr, isSorted: false });
    }
  };

  render() {
    let { arr, algorithm } = this.state;
    const itemWidth = calcItemWidth(arr.length);
    let itemBlocks = arr.map((item, index) => {
      let blockColor = setColor(item.status);
      return (
        <ItemBlock
          key={index}
          itemWidth={itemWidth}
          itemHeight={item.height}
          blockColor={blockColor}
        />
      );
    });
    return (
      <div>
        <header style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <SimpleMenu
              changeAlgorithm={this.changeAlgorithm}
              algorithm={algorithm}
            />
          </div>
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <InputSlider
              disabled={this.state.sorting}
              changeArrSize={this.changeArrSize}
            />
          </div>
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <Button
              disabled={this.state.sorting}
              variant="contained"
              color="primary"
              onClick={this.handleClick}
            >
              {this.state.sorting
                ? "SORTING..."
                : this.state.isSorted
                ? "RESET"
                : "SORT"}
            </Button>
          </div>
        </header>
        <div style={{ display: "flex" }}>{itemBlocks}</div>
      </div>
    );
  }
}

class Item {
  constructor(height, status, index) {
    this.height = height;
    this.status = status;
    this.index = index;
  }
}

function calcRandomInIntervall(min, max) {
  return Math.random() * (max - min) + min;
}

function calcItemWidth(itemCount) {
  return window.innerWidth / itemCount - 2;
}

function setColor(itemStatus) {
  switch (itemStatus) {
    case "analyzed":
      return "#F98334";
    case "sorted":
      return "#3ECF8E";
    default:
      return "#408AF8";
  }
}

export default App;
