const algorithm = {
  bubbleSort: function (arr, itemBlockStatus, index = 0, counter = 0)  {
    if(index === (arr.length - counter - 1)) {
      itemBlockStatus[index] = "sorted";
      this.state.isSorted ? this.setState({itemBlockStatus: itemBlockStatus.fill("sorted")}) : this.setState({arr: arr, itemBlockStatus: itemBlockStatus, isSorted: true},
        () => algorithm.bubbleSort.call(this, this.state.arr, this.state.itemBlockStatus, 0, counter + 1)  
      );
    }
    if (index < arr.length) {
      if (arr[index] > arr[index + 1]) {
        arr = swapValues(arr, index);
        itemBlockStatus = setItemBlockStatus(itemBlockStatus, index);
        this.setState({arr: arr, itemBlockStatus: itemBlockStatus, isSorted: false}, 
          () => setTimeout(() => algorithm.bubbleSort.call(this, this.state.arr, this.state.itemBlockStatus, index + 1, counter), 30)
        );
      } else {
        itemBlockStatus = setItemBlockStatus(itemBlockStatus, index);
        this.setState({arr: arr, itemBlockStatus: itemBlockStatus},
          () => setTimeout(() => algorithm.bubbleSort.call(this, this.state.arr, this.state.itemBlockStatus, index + 1, counter), 30)
        );
      }
    }
  },
  selectionSort: function (arr) {
    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;
      for (let j = i; j < arr.length; j++) {
        if(arr[j] < arr[minIndex]) {
          minIndex = j;
        }    
      }
      let tmp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = tmp;
    }
    return arr;
  }
}

function setItemBlockStatus (itemBlockStatus, index) {
  if(itemBlockStatus[index] !== "sorted") {
    itemBlockStatus[index] = "default";
  }  
  if(itemBlockStatus[index + 1] !== "sorted") {
    itemBlockStatus[index + 1] = "analyzed";
  }
  if(itemBlockStatus[index + 2] !== "sorted") {
    itemBlockStatus[index + 2] = "analyzed";
  }  
  return itemBlockStatus;
}

function swapValues (arr, index) {
  let tmp = arr[index];
  arr[index] = arr[index + 1];
  arr[index + 1] = tmp;
  return arr;
}

export default algorithm;