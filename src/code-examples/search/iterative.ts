export const binaryIterative = (arr, x) => {
  let l = 0;
  let r = arr.length - 1;
  let mid;
  while (r >= l) {
    mid = l + Math.floor((r - l) / 2);

    // If the element is present at the middle
    // itself
    if (arr[mid] === x) {
      return mid;
    }

    // If element is smaller than mid, then
    // it can only be present in left subarray
    if (arr[mid] > x) {
      r = mid - 1;
    }
    // Else the element can only be present
    // in right subarray
    else {
      l = mid + 1;
    }
  }

  // if element's not present
  return -1;
};

// recursive
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
      if (x > arr[mid - 1]) {
        return -1;
      }
      return binaryRecursive(arr, l, mid - 1, x);
    }
    // if l anr r items are the same and the neither value doesn't equal x
    // exit
    if (arr[l] === arr[r - 1] && arr[r] !== x) {
      return -1;
    }
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
};
