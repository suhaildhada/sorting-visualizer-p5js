import { sleep } from "../helpers/sleep.js";
import { swap } from "../helpers/swap.js";

export async function selectionSort(arr, states, settings) {
    for (let i = 0; i < arr.length; i++) {
        let mni = i;
        states[mni] = settings.state2;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[mni]) {
                states[mni] = settings.noState;
                await sleep(50);
                mni = j;
                states[mni] = settings.state2;
                await sleep(50);
            }
        }

        if (mni != i) {
            states[mni] = settings.state3;
            states[i] = settings.state3;
            await swap(arr, mni, i);
        }
        states[i] = settings.noState;
        states[mni] = settings.noState;
    }

    for (let i = 0; i < states.length; i++) {
        states[i] = settings.noState;
    }
}
