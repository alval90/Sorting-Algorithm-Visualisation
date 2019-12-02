const algorithm = {
    bubbleSort: function (arr, index = 0)  {
      if(index === arr.length) {
        this.state.isSorted ? console.log("Eureka") : this.setState({arr: arr, isSorted: true},
          () => algorithm.bubbleSort.call(this, this.state.arr, 0)  
        );
      }
      if (index < arr.length) {
        if (arr[index] > arr[index + 1]) {
          let temp = arr[index];
          arr[index] = arr[index + 1];
          arr[index + 1] = temp;
          this.setState({arr: arr, isSorted: false}, 
            () => setTimeout(() => algorithm.bubbleSort.call(this, this.state.arr, index + 1), 30)
          );
        } else {
          this.setState({arr: arr},
            () => setTimeout(() => algorithm.bubbleSort.call(this, this.state.arr, index + 1), 30)
          );
        }
      }
    }
  }

  export default algorithm;