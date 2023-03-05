import { swap } from "../helpers/swap.js";

export async function qsort(arr, states) {
    await quickSort(arr, 0, arr.length - 1, states);
}

async function quickSort(arr, start, end, states) {
    if (start >= end) {
        return;
    }

    let index = await partition(arr, start, end, states);
    states[index] = -1;

    await Promise.all([
        quickSort(arr, start, index - 1, states),
        quickSort(arr, index + 1, end, states),
    ]);
}

async function partition(arr, start, end, states) {
    for (let i = start; i < end; i++) {
        states[i] = 1;
    }

    let pivotValue = arr[end];
    states[end] = 2;
    let pivotIndex = start;
    states[pivotIndex] = 0;
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            await swap(arr, i, pivotIndex, 10);
            states[pivotIndex] = -1;
            pivotIndex++;
            states[pivotIndex] = 0;
        }
    }
    await swap(arr, pivotIndex, end, 10);

    for (let i = start; i < end; i++) {
        if (i != pivotIndex) {
            states[i] = -1;
        }
    }
    states[end] = -1;

    return pivotIndex;
}
