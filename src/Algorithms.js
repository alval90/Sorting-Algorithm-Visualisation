const algorithm = {
  bubbleSort: function (arr) {
    let isSorted = false;
    let j = 0;
    while (!isSorted) {
      isSorted = true;
      for (let i = 0; i < arr.length - j - 1; i++) {
        setItemStatus(arr, [], [i, i + 1]);
        if (arr[i].height > arr[i + 1].height) {
          swapItems(arr, i, i + 1);
          isSorted = false;
        }
        queueAnimation.call(this, arr);
        setItemStatus(arr, [i, i + 1], []);
        queueAnimation.call(this, arr);
        algorithm.counter -= 1;
      }
      setItemStatus(arr, [], [], [arr.length - j - 1]);
      j++;
    }
    setItemStatus(arr, [], [], [], true);
    queueAnimation.call(this, arr, true);
  },
  selectionSort: function (arr) {
    let j = 0;
    while (j < arr.length) {
      let minIndex = j;
      for (let i = j, minimum = arr[minIndex].height; i < arr.length; i++) {
        setItemStatus(arr, [i - 1], [i, minIndex]);
        queueAnimation.call(this, arr);
        if (arr[i].height < minimum) {
          minimum = arr[i].height;
          setItemStatus(arr, [minIndex]);
          minIndex = i;
        }
      }
      if (minIndex != j) {
        swapItems(arr, j, minIndex);
      }
      setItemStatus(arr, [j, arr.length - 1], [], [j]);
      j++;
    }
    setItemStatus(arr, [], [], [], true);
    queueAnimation.call(this, arr, true);
  },
  insertionSort: function (arr) {
    for (let i = 1; i < arr.length; i++) {
      for (let j = i; j > 0 && arr[j].height < arr[j - 1].height; j--) {
        setItemStatus(arr, [], [j, j - 1]);
        swapItems(arr, j, j - 1);
        queueAnimation.call(this, arr);
        setItemStatus(arr, [j, j - 1], []);
        queueAnimation.call(this, arr);
        algorithm.counter -= 1;
      }
    }
    setItemStatus(arr, [], [], [], true);
    queueAnimation.call(this, arr, true);
  },
  insertionSortWrapper: function (arr) {
    algorithm.insertionSort.call(this, arr);
    algorithm.counter = 1;
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
  let minimum = findMinimumIndex(algorithm.stateArr, sortedArray);
  for (let i = 0; i < sortedArray.length; i++) {
    algorithm.stateArr[minimum + i] = JSON.parse(
      JSON.stringify(sortedArray[i])
    );
    queueAnimation.call(this, algorithm.stateArr);
  }
}

function findMinimumIndex(unsortedArr, sortedArray) {
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