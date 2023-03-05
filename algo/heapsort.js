import { sleep } from "../helpers/sleep.js";
import { swap } from "../helpers/swap.js";

export async function heapSort(arr, states) {
    let n = arr.length;
    let i = Math.floor(n / 2 - 1);
    let j = n - 1;
    while (i >= 0) {
        await heapify(arr, n, i, states);
        i--;
    }

    while (j >= 0) {
        states[0] = 2;
        states[j] = 1;

        await swap(arr, 0, j, 10);

        states[0] = -1;
        states[j] = -1;

        await heapify(arr, j, 0, states);
        j--;
    }
}

async function heapify(arr, n, i, states) {
    let largest = i;
    let left = 2 * i + 1;
    let right = left + 1;

    if (left < n && arr[left] > arr[largest]) {
        states[left] = 0;
        largest = left;
        await sleep(5);
        states[left] = -1;
    }
    if (right < n && arr[right] > arr[largest]) {
        states[right] = 0;
        largest = right;
        await sleep(5);
        states[right] = -1;
    }

    if (i != largest) {
        states[i] = 0;
        states[largest] = 1;

        await swap(arr, i, largest, 10);

        states[i] = -1;
        states[largest] = -1;
        await heapify(arr, n, largest, states);
    }
}
