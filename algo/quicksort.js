import { swap } from "../helpers/swap.js";

export async function qsort(arr, states, settings) {
    await quickSort(arr, 0, arr.length - 1, states, settings);
}

async function quickSort(arr, start, end, states, settings) {
    if (start >= end) {
        return;
    }

    let index = await partition(arr, start, end, states, settings);
    states[index] = settings.noState;

    await Promise.all([
        quickSort(arr, start, index - 1, states, settings),
        quickSort(arr, index + 1, end, states, settings),
    ]);
}

async function partition(arr, start, end, states, settings) {
    for (let i = start; i < end; i++) {
        states[i] = settings.state2;
    }

    let pivotValue = arr[end];
    states[end] = 2;
    let pivotIndex = start;
    states[pivotIndex] = settings.state2;
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            await swap(arr, i, pivotIndex, 10);
            states[pivotIndex] = settings.noState;
            pivotIndex++;
            states[pivotIndex] = settings.state1;
        }
    }
    await swap(arr, pivotIndex, end, 10);

    for (let i = start; i < end; i++) {
        if (i != pivotIndex) {
            states[i] = settings.noState;
        }
    }
    states[end] = settings.noState;

    return pivotIndex;
}
