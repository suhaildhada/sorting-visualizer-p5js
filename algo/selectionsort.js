import { sleep } from "../helpers/sleep.js";
import { swap } from "../helpers/swap.js";

export async function selectionSort(arr, states) {
  for (let i = 0; i < arr.length; i++) {
    let mni = i;
    states[mni] = 1;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[mni]) {
        states[mni] = -1;
        await sleep(50);
        mni = j;
        states[mni] = 1;
        await sleep(50);
      }
    }

    if (mni != i) {
      states[mni] = 2;
      states[i] = 2;
      await swap(arr, mni, i);
    }
    states[i] = -1;
    states[mni] = -1;
  }

  for (let i = 0; i < states.length; i++) {
    states[i] = -1;
  }
}
