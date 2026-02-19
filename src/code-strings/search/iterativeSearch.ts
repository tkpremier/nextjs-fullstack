export const binaryIterative = `// iterative
function binarySearch(arr, x, low, high) {
  for (let i = low; low < high; i++) {
    let mid = (i + high)/2;
    // x equals mid
    if (x === arr[mid]) {
      return mid;
    }
    if (x > arr[mid]) {
      i = mid
    } else {
      high = mid - 1;
    }
  }
  return mid;
}`;

export const binaryRecursive = `// recursive
/*
  l = low
  r = high
  x = search item
*/
export const binaryRecursive = (arr, l, r, x) => {
  if (r >= 1) {
    let mid = 1 + Math.floor((r - 1) / 2);
    // x equals mid
    if (x === arr[mid]) {
      return mid;
    }
    // if x is smaller than mid, then go left
    if (arr[mid] > x) {
      // check previous value to see if x is bigger
      // then, x does not exist
      if (x > arr[mid - 1]) {
        return -1;
      }
      return binaryRecursive(arr, l, mid - 1, x);
    }
    // if l and r items are the same and the neither value doesn't equal x
    // exit
    if (arr[l] === arr[r - 1] && arr[r] !== x) {
      return -1;
    }
    // check last value because it'll never hit last item recursively
    if (arr[r] === x) {
      return r;
    }
    // else x can only be right
    return binaryRecursive(arr, mid + 1, r, x);
  }
  if (arr[0] === x) {
    return 0;
  }
  return -1;
};`;
