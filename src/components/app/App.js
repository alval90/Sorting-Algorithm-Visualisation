import React from "react";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import SimpleMenu from "../menu/Menu";
import InputSlider from "../slider/Slider";
import ItemBlock from "../itemBlock/ItemBlock";
import algorithm from "./Algorithms";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      algorithm: "",
      speed: 30,
      isSorted: false,
      isSorting: false
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
      let randomHeight = calcRandomInIntervall(20, 400);
      arr.push(new Item(randomHeight, "default", i));
    }
    this.setState({ arr: arr, isSorted: false });
  };

  handleClick = () => {
    if (this.state.arr.length > 1) {
      if (!this.state.isSorted && !this.state.isSorting) {
        let arr = JSON.parse(JSON.stringify(this.state.arr));
        switch (this.state.algorithm) {
          case "Bubble Sort":
            this.setState({ isSorting: true });
            algorithm.bubbleSortWrapper.call(this, arr);
            break;
          case "Selection Sort":
            this.setState({ isSorting: true });
            algorithm.selectionSortWrapper.call(this, arr);
            break;
          case "Insertion Sort":
            this.setState({ isSorting: true });
            algorithm.insertionSortWrapper.call(this, arr);
            break;
          case "Quick Sort":
            this.setState({ isSorting: true });
            algorithm.quickSortWrapper.call(this, arr, 0, arr.length - 1);
            break;
          case "Merge Sort":
            this.setState({ isSorting: true });
            algorithm.mergeSortWrapper.call(this, arr);
            break;
          default:
            break;
        }
      } else if (!this.state.isSorted && this.state.isSorting) {
        //Note to myself: Hacky implementation. Normally refraing from use, because of termination of global setTimeouts.
        let highestTimeoutId = setTimeout(";");
        for (let i = 0; i < highestTimeoutId; i++) {
          clearTimeout(i);
        }
        this.setState({ isSorted: true, isSorting: false });
      } else {
        let arr = JSON.parse(JSON.stringify(this.state.arr));
        arr.sort((a, b) => a.index - b.index);
        arr.map(item => (item.status = "default"));
        this.setState({ arr: arr, isSorted: false });
      }
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
        <header
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <SimpleMenu
              changeAlgorithm={this.changeAlgorithm}
              algorithm={algorithm}
            />
          </div>
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <InputSlider
              disabled={this.state.isSorting}
              changeArrSize={this.changeArrSize}
            />
          </div>
          <div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
            <Button
              startIcon={
                this.state.isSorting ? (
                  <Icon className="fas fa-stop" style={{ fontSize: "16px" }} />
                ) : this.state.isSorted ? (
                  <Icon className="fas fa-undo" style={{ fontSize: "16px" }} />
                ) : (
                  <Icon
                    className="fas fa-sort-amount-up"
                    style={{ fontSize: "16px" }}
                  />
                )
              }
              variant="contained"
              color="primary"
              onClick={this.handleClick}
              style={{ width: "130px" }}
            >
              {this.state.isSorting
                ? "STOP"
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
