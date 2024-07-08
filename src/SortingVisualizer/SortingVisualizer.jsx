import React from 'react';
import * as mergeSort from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';


export default class SortingVisualizer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      array: [],
    }
  }

  componentDidMount(){
    this.resetArray();
  }
  
  resetArray(){
    const array = [];
    for(let i=0; i<310; i++){
      array.push(randomIntFromInterval(5,730));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = mergeSort(this.state.array.slice());
    for(let i=0; i<animations.length; i++){
      const { comparison, swap } = animations[i];
      setTimeout(() => {
        const arrayBars = document.getElementsByClassName('array-bar');
        arrayBars[comparison[1]].style.backgroundColor = 'red';
        arrayBars[comparison[0]].style.backgroundColor = 'red';
        setTimeout(() => {
          arrayBars[comparison[1]].style.backgroundColor = 'turquoise';          
          arrayBars[comparison[0]].style.backgroundColor = 'turquoise';
        }, (i+1) * 10);
      }, i * 10);
    }
  }

  testSortingAlgorithm() {
    for(let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for(let j = 0; j < length; j++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortArray = mergeSort(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortArray));
    }
  }

  render() {
    const { array } = this.state;

    return(
      <div className="array-container">
        {array.map((value, idx) => (
          <div 
            className="array-bar" 
            key={idx} 
            style={{ height: `${value}px` }}
          ></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Array</button>
        <button onClick={() => this.quickSort()}>Quick Array</button>
        <button onClick={() => this.heapSort()}>Heap Array</button>
        <button onClick={() => this.bubbleSort()}>Bubble Array</button>
        <button onClick={() => this.testSortingAlgorithm()}>Test Sorting Algorithm</button>
      </div>
    );
  }
}

function randomIntFromInterval(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo){
  if(arrayOne.length !== arrayTwo.length) return false;
  for(let i = 0; i < arrayOne.length; i++){
    if(arrayOne[i] !== arrayTwo[i]) return false;
  }
  return true;
}
