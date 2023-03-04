import { sleep } from "./sleep.js";

export async function swap(arr, a, b, ms = 50) {
  await sleep(ms);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
