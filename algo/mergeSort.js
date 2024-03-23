function mergeSort(arr, l, r) {
  if (l < r) {
    const mid = (l + r) >> 1;
    mergeSort(arr, l, mid);
    mergeSort(arr, mid + 1, r);
    merge(arr, l, mid, r);
  }
}

function merge(arr, l, m, r) {
  const leftArr = arr.slice(l, m + 1);
  const rightArr = arr.slice(m + 1, r + 1);
  leftArr.push(Infinity);
  rightArr.push(Infinity);

  let i = 0;
  let j = 0;

  for (let k = l; k <= r; k++) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i++];
    } else {
      arr[k] = rightArr[j++];
    }
  }
}

inputArr = [6, 5, 4, 3, 2, 1];
mergeSort(inputArr, 0, inputArr.length - 1);
console.log(inputArr);
