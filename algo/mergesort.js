import { sleep } from "../helpers/sleep.js";

export async function mergeSort(arr, states, settings) {
    let low = 0,
        high = arr.length - 1;
    let aux = [];
    await helper(arr, aux, low, high, states, settings);
}

async function helper(arr, aux, low, high, states, settings) {
    if (high <= low) return;
    for (let i = low; i <= high; i++) {
        states[i] = settings.state2;
    }
    let mid = Math.floor((low + high) / 2);

    await helper(arr, aux, low, mid, states, settings);
    await helper(arr, aux, mid + 1, high, states, settings);
    await merge(arr, aux, low, mid, high, states, settings);
    for (let i = low; i <= high; i++) {
        states[i] = settings.noState;
    }
}

async function merge(arr, aux, low, mid, high, states, settings) {
    for (let x = 0; x < arr.length; x++) {
        aux[x] = arr[x];
    }
    let i = low;
    let j = mid + 1;

    for (let k = low; k <= high; k++) {
        if (i > mid) {
            arr[k] = aux[j++];
            setState(states, settings, k, j - 1);
            await sleep(10);
            resetState(states, k, j - 1);
        } else if (j > high) {
            arr[k] = aux[i++];
            setState(states, settings, k, i - 1);
            await sleep(10);
            resetState(states, k, i - 1);
        } else if (aux[j] < aux[i]) {
            setState(states, settings, j, i, k);
            arr[k] = aux[j++];
            await sleep(10);
            resetState(states, j - 1, i, k);
        } else {
            setState(states, settings, i, j, k);
            arr[k] = aux[i++];
            await sleep(10);
            resetState(states, i - 1, j, k);
        }
    }
}

function setState(states, settings, i, j, k = -1) {
    if (k != -1) {
        states[k] = settings.state3;
    }
    states[i] = settings.state1;
    states[j] = settings.state2;
}

function resetState(states, i, j, k = -1) {
    if (k != -1) {
        states[k] = -1;
    }
    states[i] = -1;
    states[j] = -1;
}
