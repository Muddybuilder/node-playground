function fib(n) {
  if (!n || n < 1) {
    console.log("Put valid number ( must start from 1)");
    process.exit(-1);
  }
  arr = [0, 1];
  if (n < 3) {
    return arr.slice(0, n);
  }
  for (let i = 2; i < n; i++) {
    let first = arr[i - 2];
    let second = arr[i - 1];
    arr.push(first + second);
  }
  return arr;
}

input = process.argv[2];

// console.log(fib(+input));
/*
Using iteration, 
write a function fibs which takes a number and returns an array containing that many numbers from the Fibonacci sequence.
 Using an example input of 8, this function should return the array [0, 1, 1, 2, 3, 5, 8, 13].
*/

function fibRec(n) {
  if (!n || n < 1) {
    console.error("Put valid number (must start from 1)");
    process.exit(1);
  }
  if (n < 3) {
    return [0, 1].slice(0, n);
  }
  arr = fibRec(n - 1);
  arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
  return arr;
}
console.log(fibRec(+input));
