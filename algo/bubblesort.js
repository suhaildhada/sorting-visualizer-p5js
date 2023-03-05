import { swap } from "../helpers/swap.js";

export async function bubbleSort(arr, states, settings) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                states[i] = settings.state2;
                states[j] = settings.state3;
                await swap(arr, i, j);
            }
            states[i] = settings.noState;
            states[j] = settings.noState;
        }
    }
}
