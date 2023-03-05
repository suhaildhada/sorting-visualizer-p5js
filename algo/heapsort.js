import { sleep } from "../helpers/sleep.js";
import { swap } from "../helpers/swap.js";

export async function heapSort(arr, states, settings) {
    let n = arr.length;
    let i = Math.floor(n / 2 - 1);
    let j = n - 1;
    while (i >= 0) {
        await heapify(arr, n, i, states, settings);
        i--;
    }

    while (j >= 0) {
        states[0] = settings.state3;
        states[j] = settings.state2;

        await swap(arr, 0, j, 10);

        states[0] = settings.noState;
        states[j] = settings.noState;

        await heapify(arr, j, 0, states, settings);
        j--;
    }
}

async function heapify(arr, n, i, states, settings) {
    let largest = i;
    let left = 2 * i + 1;
    let right = left + 1;

    if (left < n && arr[left] > arr[largest]) {
        states[left] = settings.state1;
        largest = left;
        await sleep(5);
        states[left] = settings.noState;
    }
    if (right < n && arr[right] > arr[largest]) {
        states[right] = settings.state1;
        largest = right;
        await sleep(5);
        states[right] = settings.noState;
    }

    if (i != largest) {
        states[i] = settings.state1;
        states[largest] = settings.state2;

        await swap(arr, i, largest, 10);

        states[i] = settings.noState;
        states[largest] = settings.noState;

        await heapify(arr, n, largest, states, settings);
    }
}
