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
  // Planned optimization:
  // 1) Move break condition to top of recursive function for better readability
  // 2) Reduce amount of loops by one via skipping the first iteration
  // 3) Encapsulate color highlighting and value swapping
  selectionSort: function (arr, itemBlockStatus, index = 0, minIndex = 0, counter = 0) {
    // Check if every itemblock has been considered as current minimum value
    if (index < arr.length) {
      // Define new minimum, if current item that is being analyzed is smaller than the current minimum
      // Change status of itemBlocks to highlight in respective color
      if (arr[index] <= arr[minIndex]) {
        itemBlockStatus[minIndex] = "default";
        minIndex = index;
        itemBlockStatus[minIndex] = "analyzed";
        itemBlockStatus[index + 1] = "analyzed";
        this.setState({arr: arr, itemBlockStatus: itemBlockStatus, isSorted: false},
          () => setTimeout(() => algorithm.selectionSort.call(this, this.state.arr, this.state.itemBlockStatus, index + 1, minIndex, counter), 30)
        );
      // Move one item ahead, if current item that is being analyzed is not smaller than the current minimum
      // Change status accordingly to use color highlighting
      } else if (arr[index] > arr[minIndex]) {
        itemBlockStatus[index] = "default";
        itemBlockStatus[index + 1] = "analyzed";
        this.setState({arr: arr, itemBlockStatus: itemBlockStatus},
          () => setTimeout(() => algorithm.selectionSort.call(this, this.state.arr, this.state.itemBlockStatus, index + 1, minIndex, counter), 30)
        );
      }
    // After going through all items to check for a new minimum, check if items need to be swapped to further sort the array
    // Swap new minimum with current starting item of the loop - Otherwise, consider array as sorted and fill the itemBlockStatus accordingly for color highlighting.
    } else {
      if (this.state.isSorted) {
        this.setState({itemBlockStatus: itemBlockStatus.fill("sorted")});
      } else {
        let tmp = arr[counter];
        arr[counter] = arr[minIndex];
        arr[minIndex] = tmp;
        itemBlockStatus[minIndex] = "default";
        itemBlockStatus[counter] = "sorted";
        itemBlockStatus[counter + 1] = "analyzed";
        this.setState({arr: arr, itemBlockStatus: itemBlockStatus, isSorted: true},
          () => setTimeout(() => algorithm.selectionSort.call(this, this.state.arr, this.state.itemBlockStatus, counter + 1, counter + 1, counter + 1), 30)
        ); 
      }
    }
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