const algorithm = {
  bubbleSort: function (arr, index = 0, counter = 0, isSorted = false) {
    if (index === arr.length - counter - 1) {
      setItemStatus(arr, [], [], [index]);
      if (isSorted) {
        setItemStatus(arr, [], [], [], true);
        this.setState({
          arr: arr,
          isSorted: true,
          sorting: false
        });
      } else {
        this.setState({
            arr: arr,
            isSorted: true
          }, () =>
          algorithm.bubbleSort.call(this, this.state.arr, 0, counter + 1, true)
        );
      }
      return;
    }
    if (index < arr.length) {
      if (arr[index].height > arr[index + 1].height) {
        swapItems(arr, index, index + 1);
        setItemStatus(arr, [index], [index + 1, index + 2]);
        this.setState({
            arr: arr
          }, () =>
          setTimeout(
            () =>
            algorithm.bubbleSort.call(
              this,
              this.state.arr,
              index + 1,
              counter,
              false
            ),
            this.state.speed
          )
        );
        return;
      } else {
        setItemStatus(arr, [index], [index + 1, index + 2]);
        this.setState({
            arr: arr
          }, () =>
          setTimeout(
            () =>
            algorithm.bubbleSort.call(
              this,
              this.state.arr,
              index + 1,
              counter
            ),
            this.state.speed
          )
        );
        return;
      }
    }
  },
  // Planned optimization:
  // 1) Move break condition to top of recursive function for better readability
  // 2) Reduce amount of loops by one via skipping the first iteration
  // 3) Encapsulate color highlighting and value swapping
  selectionSort: function (
    arr,
    index = 0,
    minIndex = 0,
    counter = 0,
    isSorted = false
  ) {
    // Check if every itemblock has been considered as current minimum value
    if (index < arr.length) {
      // Define new minimum, if current item that is being analyzed is smaller than the current minimum
      // Change status of itemBlocks to highlight in respective color
      if (arr[index].height <= arr[minIndex].height) {
        setItemStatus(arr, [minIndex], [index, index + 1]);
        minIndex = index;
        this.setState({
            arr: arr
          }, () =>
          setTimeout(
            () =>
            algorithm.selectionSort.call(
              this,
              this.state.arr,
              index + 1,
              minIndex,
              counter,
              false
            ),
            this.state.speed
          )
        );
        // Move one item ahead, if current item that is being analyzed is not smaller than the current minimum
        // Change status accordingly to use color highlighting
      } else if (arr[index].height > arr[minIndex].height) {
        setItemStatus(arr, [index], [index + 1]);
        this.setState({
            arr: arr
          }, () =>
          setTimeout(
            () =>
            algorithm.selectionSort.call(
              this,
              this.state.arr,
              index + 1,
              minIndex,
              counter
            ),
            this.state.speed
          )
        );
      }
      // After going through all items to check for a new minimum, check if items need to be swapped to further sort the array
      // Swap new minimum with current starting item of the loop - Otherwise, consider array as sorted and fill the itemBlockStatus accordingly for color highlighting.
    } else {
      if (isSorted) {
        setItemStatus(arr, [], [], [], true);
        this.setState({
          arr: arr,
          isSorted: true,
          sorting: false
        });
      } else {
        swapItems(arr, counter, minIndex);
        setItemStatus(arr, [minIndex], [counter + 1], [counter]);
        this.setState({
            arr: arr
          }, () =>
          setTimeout(
            () =>
            algorithm.selectionSort.call(
              this,
              this.state.arr,
              counter + 1,
              counter + 1,
              counter + 1,
              true
            ),
            this.state.speed
          )
        );
      }
    }
  },
  insertionSort: function (arr, itemBlockStatus, index = 0, back = 0, counter = 0) {
    // change code below this line
    if (index < arr.length) {
      if (back >= 0) {
        if (arr[back] <= arr[back - 1]) {
          let tmp = arr[back];
          arr[back] = arr[back - 1];
          arr[back - 1] = tmp;
        } else if (arr[back] > arr[back - 1]) {
          itemBlockStatus[back] = "default";
          itemBlockStatus[back - 1] = "default";
          itemBlockStatus[index] = "analyzed";
          itemBlockStatus[index + 1] = "analyzed";
          this.setState({
              arr: arr,
              itemBlockStatus: itemBlockStatus
            },
            () => setTimeout(() => algorithm.insertionSort.call(this, this.state.arr, this.state.itemBlockStatus, index + 1, index + 1, counter + 1), 30)
          );
          return;
        }
        itemBlockStatus[back + 1] = "default";
        itemBlockStatus[back] = "analyzed";
        itemBlockStatus[back - 1] = "analyzed"
        this.setState({
            arr: arr,
            itemBlockStatus: itemBlockStatus
          },
          () => setTimeout(() => algorithm.insertionSort.call(this, this.state.arr, this.state.itemBlockStatus, index, back - 1, counter), 30)
        );
      } else {
        itemBlockStatus[back + 1] = "default";
        itemBlockStatus[index] = "analyzed";
        itemBlockStatus[index + 1] = "analyzed";
        this.setState({
            arr: arr,
            itemBlockStatus: itemBlockStatus
          },
          () => setTimeout(() => algorithm.insertionSort.call(this, this.state.arr, this.state.itemBlockStatus, index + 1, index + 1, counter + 1), 30)
        );
      }
    } else {
      this.setState({
        isSorted: true,
        itemBlockStatus: itemBlockStatus.fill("sorted")
      });
    }
    return arr;
  },
  quickSort: function (arr, left, right) {
    if (arr.length > 1) {
      let index = partition.call(this, arr, left, right);
      if (left < index - 1) {
        algorithm.quickSort.call(this, arr, left, index - 1);
      }
      if (index < right) {
        algorithm.quickSort.call(this, arr, index, right);
      }
    }
    return arr;
  },
  quickSortWrapper: function (arr, left, right) {
    algorithm.stateArr = JSON.parse(JSON.stringify(arr));
    algorithm.quickSort.call(this, arr, left, right);
    arr.map(item => (item.status = "sorted"));
    queueAnimation.call(this, arr, true);
    algorithm.counter = 1;
  },
  mergeSort: function (arr) {
    if (arr.length <= 1) {
      return arr;
    }
    let leftHalf = arr.splice(0, Math.floor(arr.length / 2));
    let rightHalf = arr.splice(0, arr.length);
    let left = algorithm.mergeSort.call(this, leftHalf);
    let right = algorithm.mergeSort.call(this, rightHalf);
    arr = merge.call(this, left, right);
    return arr;
  },
  mergeSortWrapper: function (arr) {
    algorithm.stateArr = JSON.parse(JSON.stringify(arr));
    algorithm.mergeSort.call(this, arr);
    algorithm.counter = 1;
  },
  counter: 1,
  stateArr: []
};

function setItemStatus(
  arr,
  defaultItems = [],
  analyzedItems = [],
  sortedItems = [],
  isSorted = false
) {
  for (let i = 0; i < defaultItems.length; i++) {
    if (arr[defaultItems[i]] && arr[defaultItems[i]].status !== "sorted") {
      arr[defaultItems[i]].status = "default";
    }
  }
  for (let i = 0; i < analyzedItems.length; i++) {
    if (arr[analyzedItems[i]] && arr[analyzedItems[i]].status !== "sorted") {
      arr[analyzedItems[i]].status = "analyzed";
    }
  }
  for (let i = 0; i < sortedItems.length; i++) {
    if (arr[sortedItems[i]]) {
      arr[sortedItems[i]].status = "sorted";
    }
  }
  if (isSorted) {
    arr.map(item => (item.status = "sorted"));
  }
  return arr;
}

function swapItems(arr, firstItemIndex, secondItemIndex) {
  let tmp = arr[firstItemIndex];
  arr[firstItemIndex] = arr[secondItemIndex];
  arr[secondItemIndex] = tmp;
  return arr;
}

function merge(left, right, sortedArray = []) {
  while (left.length > 0 && right.length > 0) {
    for (let i = 0; i < algorithm.stateArr.length; i++) {
      if (
        algorithm.stateArr[i].index === left[0].index ||
        algorithm.stateArr[i].index === right[0].index
      ) {
        setItemStatus(algorithm.stateArr, [], [i]);
      }
    }
    queueAnimation.call(this, algorithm.stateArr);
    for (let i = 0; i < algorithm.stateArr.length; i++) {
      if (
        algorithm.stateArr[i].index === left[0].index ||
        algorithm.stateArr[i].index === right[0].index
      ) {
        setItemStatus(algorithm.stateArr, [i], []);
      }
    }
    queueAnimation.call(this, algorithm.stateArr);
    algorithm.counter -= 1;
    if (left[0].height < right[0].height) {
      sortedArray = [...sortedArray, left.shift()];
    } else {
      sortedArray = [...sortedArray, right.shift()];
    }
  }
  while (left.length > 0) {
    for (let i = 0; i < algorithm.stateArr.length; i++) {
      if (algorithm.stateArr[i].index === left[0].index) {
        setItemStatus(algorithm.stateArr, [], [i]);
      }
    }
    queueAnimation.call(this, algorithm.stateArr);
    for (let i = 0; i < algorithm.stateArr.length; i++) {
      if (algorithm.stateArr[i].index === left[0].index) {
        setItemStatus(algorithm.stateArr, [i], []);
      }
    }
    queueAnimation.call(this, algorithm.stateArr);
    algorithm.counter -= 1;
    sortedArray = [...sortedArray, left.shift()];
  }
  while (right.length > 0) {
    for (let i = 0; i < algorithm.stateArr.length; i++) {
      if (algorithm.stateArr[i].index === right[0].index) {
        setItemStatus(algorithm.stateArr, [], [i]);
      }
    }
    queueAnimation.call(this, algorithm.stateArr);
    for (let i = 0; i < algorithm.stateArr.length; i++) {
      if (algorithm.stateArr[i].index === right[0].index) {
        setItemStatus(algorithm.stateArr, [i], []);
      }
    }
    queueAnimation.call(this, algorithm.stateArr);
    algorithm.counter -= 1;
    sortedArray = [...sortedArray, right.shift()];
  }
  animateArraySorting.call(this, sortedArray);
  if (algorithm.stateArr.length === sortedArray.length) {
    setItemStatus(algorithm.stateArr, [], [], [], true);
    queueAnimation.call(this, algorithm.stateArr, true);
  }
  return sortedArray;
}

function animateArraySorting(sortedArray) {
  let minimum = findMinimum(algorithm.stateArr, sortedArray);
  for (let i = 0; i < sortedArray.length; i++) {
    algorithm.stateArr[minimum + i] = JSON.parse(
      JSON.stringify(sortedArray[i])
    );
    queueAnimation.call(this, algorithm.stateArr);
  }
}

function findMinimum(unsortedArr, sortedArray) {
  for (let i = 0; i < unsortedArr.length; i++) {
    for (let j = 0; j < sortedArray.length; j++) {
      if (unsortedArr[i].index === sortedArray[j].index) {
        return i;
      }
    }
  }
}

function queueAnimation(updatedArray, isSorted) {
  let arr = JSON.parse(JSON.stringify(updatedArray));
  setTimeout(() => {
    if (isSorted) {
      this.setState({
        arr: arr,
        isSorted: true,
        sorting: false
      });
    } else {
      this.setState({
        arr: arr
      });
    }
  }, algorithm.counter * this.state.speed);
  algorithm.counter += 1;
}

//Adapted from https://www.guru99.com/quicksort-in-javascript.html
function partition(arr, left, right) {
  let pivot = arr[Math.floor((right + left) / 2)].height;
  let i = left;
  let j = right;
  while (i <= j) {
    while (arr[i].height < pivot) {
      setItemStatus(algorithm.stateArr, [], [i]);
      queueAnimation.call(this, algorithm.stateArr);
      setItemStatus(algorithm.stateArr, [i], []);
      queueAnimation.call(this, algorithm.stateArr);
      algorithm.counter -= 1;
      i++;
    }
    while (arr[j].height > pivot) {
      setItemStatus(algorithm.stateArr, [], [j]);
      queueAnimation.call(this, algorithm.stateArr);
      setItemStatus(algorithm.stateArr, [j], []);
      queueAnimation.call(this, algorithm.stateArr);
      algorithm.counter -= 1;
      j--;
    }
    if (i <= j) {
      swapItems(arr, i, j);
      setItemStatus(algorithm.stateArr, [], [i, j]);
      swapItems(algorithm.stateArr, i, j);
      queueAnimation.call(this, algorithm.stateArr);
      setItemStatus(algorithm.stateArr, [i, j], []);
      queueAnimation.call(this, algorithm.stateArr);
      //algorithm.counter -= 1;
      i++;
      j--;
    }
  }
  return i;
}

export default algorithm;