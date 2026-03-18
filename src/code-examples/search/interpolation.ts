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
