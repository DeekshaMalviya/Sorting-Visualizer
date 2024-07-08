// export const getMergeSortAnimations

// export const mergeSort = (array,startIdx, endIdx, animations = []) => {
//   if(startIdx === endIdx)return;
//   const middleIndex = Math.floor(endIdx + 1 - startIdx/2);
//   const firstHalf = mergeSort(array,middleIndex, startIdx, animations);
//   const secondHalf = mergeSort(array, middleIndex +1, endIdx, animations);
//   const sortedArray = [];
//   let i = startIdx;
//   let j=middleIndex + 1;
//   while (i<middleIndex +1 && j<endIdx +  1) {
//     if(firstHalf[i] < secondHalf[j]){
//       sortedArray.push(firstHalf[i++]);
//     } else{
//       sortedArray.push(secondHalf[j++]);
//     }
//   }
//   while(i< firstHalf.length)sortedArray.push(firstHalf[i++]);
//   while(j<secondHalf.length) sortedArray.push(secondHalf[j++]);
//   return sortedArray;
// };


export function mergeSort(array) {
  const animations = [];
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  const middleIndex = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIndex, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIndex + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIndex, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIndex, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIndex + 1;

  while (i <= middleIndex && j <= endIdx) {
    const animation = {};
    animation.comparison = [i, j];
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animation.swap = [k, i];
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animation.swap = [k, j];
      mainArray[k++] = auxiliaryArray[j++];
    }
    animations.push(animation);
  }
  while (i <= middleIndex) {
    animations.push({
      comparison: [i, i],
      swap: [k, i],
    });
    mainArray[k++] = auxiliaryArray[i++];
  }

  while (j <= endIdx) {
    animations.push({
      comparison: [j, j],
      swap: [k, j],
    });
    mainArray[k++] = auxiliaryArray[j++];
  }
}
