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

export const pubSubClass = `
class EventsEmitter {
  events: {},
  dispatch: function (e, x) {
    if (!this.events[e]) {
      return;
    }
    this.events[e].forEach(f => f(x));
  },
  subscribe: function (e, c) {
    if (!this.events[e]) {
      this.events[e] = [];
    }
    this.events[e].push(c);
    const index = this.events[e].indexOf(c);
    return {
      unsubscribe: function() {
        delete this.events[e][index];
      }
    }
  },
};

export default EventsEmitter;
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

export const interpolationSearch = `
/**
 * Interpolation search for item
 * @param {Array} arr - The array being searched
 * @param {number} lo - The lower index in arr
 * @param {number} hi - The higher index in arr
 * @param {number} x - The target element value
 */
export const interpolationSearch = (arr, lo, hi, x) => {
  let pos;

  // since array is sorted, an element present
  // in array must be in range defined by corner
  if (lo <= hi && x >= arr[lo] && x <= arr[hi]) {
    // Probing the position keeping uniform disbrutiation in mind
    pos = lo + Math.floor(((hi - lo) / (arr[hi] - arr[lo])) * (x - arr[lo]));

    // Condition of target found
    if (arr[pos] === x) {
      return pos;
    }

    // If x is smaller, x is in left sub array
    if (arr[pos] > x) {
      if (x > arr[pos - 1]) {
        return -1;
      }
      return interpolationSearch(arr, lo, pos - 1, x);
    }

    // if x is larger, x is in right sub array
    if (arr[pos] < x) {
      if (arr[pos - 1] > x) {
        return -1;
      }
      return interpolationSearch(arr, pos + 1, hi, x);
    }
  }
};
`;
