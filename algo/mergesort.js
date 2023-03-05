import { sleep } from "../helpers/sleep.js";

export async function mergeSort(arr, states) {
    let low = 0,
        high = arr.length - 1;
    let aux = [];
    await helper(arr, aux, low, high, states);
}

async function helper(arr, aux, low, high, states) {
    if (high <= low) return;
    for (let i = low; i <= high; i++) {
        states[i] = 1;
    }
    let mid = Math.floor((low + high) / 2);

    await helper(arr, aux, low, mid, states);
    await helper(arr, aux, mid + 1, high, states);
    await merge(arr, aux, low, mid, high, states);
    for (let i = low; i <= high; i++) {
        states[i] = -1;
    }
}

async function merge(arr, aux, low, mid, high, states) {
    for (let x = 0; x < arr.length; x++) {
        aux[x] = arr[x];
    }
    let i = low;
    let j = mid + 1;

    for (let k = low; k <= high; k++) {
        if (i > mid) {
            arr[k] = aux[j++];
            states[k] = 1;
            states[j] = 0;
            await sleep(10);
            states[k] = -1;
            states[j - 1] = -1;
        } else if (j > high) {
            arr[k] = aux[i++];
            states[k] = 1;
            states[i] = 0;
            await sleep(10);
            states[k] = -1;
            states[i - 1] = -1;
        } else if (aux[j] < aux[i]) {
            states[j] = 0;
            states[i] = 1;
            states[k] = 2;
            arr[k] = aux[j++];
            await sleep(10);
            states[j - 1] = -1;
            states[i] = -1;
            states[k] = -1;
        } else {
            states[j] = 0;
            states[i] = 1;
            states[k] = 2;
            arr[k] = aux[i++];
            await sleep(10);
            states[j] = -1;
            states[i - 1] = -1;
            states[k] = -1;
        }
    }
}
