import React from 'react';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms';
import './SortingVisualizer.css';

const ANIMATION_SPEED_MS = 3;
const NUMBER_OF_ARRAY_BARS = 310;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      animationSpeed: ANIMATION_SPEED_MS,
      numberOfBars: NUMBER_OF_ARRAY_BARS,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.numberOfBars; i++) {
      array.push(randomIntFromInterval(5,350));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = sortingAlgorithms.mergeSort(this.state.array);
    this.animateSorting(animations);
  }

  quickSort() {
    const animations = sortingAlgorithms.quickSort(this.state.array);
    this.animateSorting(animations);
  }

  heapSort() {
    const animations = sortingAlgorithms.heapSort(this.state.array);
    this.animateSorting(animations);
  }

   bubbleSortSort() {
    const animations = sortingAlgorithms.bubbleSort(this.state.array);
    this.animateSorting(animations);
  }

  animateSorting(animations) {
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      if (!arrayBars) continue;
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        if (arrayBars[barOneIdx] && arrayBars[barTwoIdx]) {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * this.state.animationSpeed);
        }
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          if (arrayBars[barOneIdx]) {
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }
        }, i * this.state.animationSpeed);
      }
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: Number(event.target.value) }, this.resetArray);
  };

  render() {
    const { array, animationSpeed, numberOfBars } = this.state;

    return (
      <div className="visualizer-container">
        <header className="header">
          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <label>
            Change Array Size & Sorting Speed
            <input
              type="range"
              name="numberOfBars"
              min="10"
              max="300"
              value={numberOfBars}
              onChange={this.handleChange}
            />
            <input
              type="range"
              name="animationSpeed"
              min="1"
              max="100"
              value={animationSpeed}
              onChange={this.handleChange}
            />
          </label>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.heapSort()}>Heap Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        </header>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                height: `${value}px`,
                width: `${100 / numberOfBars}%`
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo){
  if (arrayOne.length !== arrayTwo.length) return false;

  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) return false;
  }
  return true;
}

