export function mergeSort(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

export function quickSort(array) {
  const animations = [];
  if(array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

export function heapSort(array) {
  const animations = [];
  const n = array.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, animations);
  }

  for (let i = n - 1; i > 0; i--) {
    animations.push([0, i]);
    animations.push([0, i]);
    animations.push([0, array[i]]);
    animations.push([i, array[0]]);
    [array[0], array[i]] = [array[i], array[0]];
    heapify(array, i, 0, animations);
  }
  return animations;
}


// Merge Sort

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

// Quick Sort

function quickSortHelper(mainArray, startIdx, endIdx, animations) {
  if (startIdx >= endIdx) return;
  const pivotIdx = partition(mainArray, startIdx, endIdx, animations);
  quickSortHelper(mainArray, startIdx, pivotIdx - 1, animations);
  quickSortHelper(mainArray, pivotIdx + 1, endIdx, animations);
}

function partition(mainArray, startIdx, endIdx, animations) {
  const pivotValue = mainArray[endIdx];
  let pivotIdx = startIdx;
  for (let i = startIdx; i < endIdx; i++) {
    animations.push([i, endIdx]);
    animations.push([i, endIdx]);
    if (mainArray[i] <= pivotValue) {
      animations.push([i, mainArray[pivotIdx]]);
      animations.push([pivotIdx, mainArray[i]]);
      [mainArray[i], mainArray[pivotIdx]] = [mainArray[pivotIdx], mainArray[i]];
      pivotIdx++;
    } else {
      animations.push([i, mainArray[i]]);
    }
  }
  animations.push([pivotIdx, endIdx]);
  animations.push([pivotIdx, endIdx]);
  animations.push([pivotIdx, mainArray[endIdx]]);
  animations.push([endIdx, mainArray[pivotIdx]]);
  [mainArray[pivotIdx], mainArray[endIdx]] = [mainArray[endIdx], mainArray[pivotIdx]];
  return pivotIdx;
}


// Heap Sort

function heapify(array, n, i, animations) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && array[left] > array[largest]) {
    largest = left;
  }

  if (right < n && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== i) {
    animations.push([i, largest]);
    animations.push([i, largest]);
    animations.push([i, array[largest]]);
    animations.push([largest, array[i]]);
    [array[i], array[largest]] = [array[largest], array[i]];
    heapify(array, n, largest, animations);
  }
}


export function bubbleSort(array) {
  const animations = [];
  const n = array.length;
  const arr = array.slice();
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push([j, j + 1]);
      animations.push([j, j + 1]);
      if (arr[j] > arr[j + 1]) {
        animations.push([j, arr[j + 1]]);
        animations.push([j + 1, arr[j]]);
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      } else {
        animations.push([j, arr[j]]);
        animations.push([j + 1, arr[j + 1]]);
      }
    }
  }
  return animations;
}
