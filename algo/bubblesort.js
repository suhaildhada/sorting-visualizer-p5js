import { swap } from "../helpers/swap.js";

export async function bubbleSort(arr, states) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        states[i] = 1;
        states[j] = 2;
        await swap(arr, i, j);
      }
      states[i] = -1;
      states[j] = -1;
    }
  }
}
