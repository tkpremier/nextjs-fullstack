export const bubbleSortCode = `
export const bubbleSort = (arr = []) => {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
};
`;

export const insertionSortCode = `
export const insertionSort = (arr = []) => {
  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > val) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = val;
  }
  return arr;
};
`;

export const selectionSortStableCode = `
export const selectionSortStable = (arr = []) => {
  const n = arr.length;
  // O(n)
  for (let i = 0; i < n; i++) {
    let minIndex = i;
    // O(n)
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    // My way
    // Splicing minimum element
    // found with the first element.
    if (minIndex !== i) {
      
      let temp = arr[minIndex];
      arr.splice(i, 0, temp);
      arr.splice(minIndex + 1, 1);
      console.log('add: ', arr);
      console.log('remove: ', arr);
    }
    /**
     * gfg way https://www.geeksforgeeks.org/stable-selection-sort/
     * // Move minimum element at current i.
      let key = a[min];
      while (min > i)
      {
          a[min] = a[min - 1];
          min--;
      }
          
      a[i] = key;
     */
  }
  // Time complexity O(n) + O(n) = O(n^2);
  return arr;
};`;

export const selectionSortCode = `
const swap = (arr, xp, yp) => {
  let temp = arr[xp];
  arr[xp] = arr[yp];
  arr[yp] = temp;
};

export const selectionSort = (arr = []) => {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let minIndex = i;
    // let minString = arr[i];
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        // minString = arr[j];
        minIndex = j;
      }
    }
    // Swapping the minimum element
    // found with the first element.
    if (minIndex !== i) {
      swap(arr, minIndex, i);
    }
  }
  return arr;
};

export const selectionSortString = (arr = []) => {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let minIndex = i;
    let minString = arr[i];
    for (let j = i + 1; j < n; j++) {
      if (arr[j].localeCompare(minString) === -1) {
        minString = arr[j];
        minIndex = j;
      }
    }
    // Swapping the minimum element
    // found with the first element.
    if (minIndex !== i) {
      swap(arr, minIndex, i);
    }
  }
  return arr;
};
`;
