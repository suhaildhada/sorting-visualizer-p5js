import { sleep } from "../helpers/sleep.js";

export async function shellSort(arr, states, settings) {
    let n = arr.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = 0; i <= gap; i++) {
            states[i] = settings.state1;
        }

        for (let i = gap; i < n; i++) {
            let key = arr[i];
            let j = i;
            for (j = i; j >= gap && arr[j - gap] > key; j -= gap) {
                states[j] = settings.state2;
                states[j - gap] = settings.state3;
                arr[j] = arr[j - gap];
                await sleep(50);
                states[j] = settings.noState;
                states[j - gap] = settings.noState;
            }
            states[j] = settings.state2;
            arr[j] = key;
            await sleep(50);
            states[j] = settings.noState;
        }

        for (let i = 0; i <= gap; i++) {
            states[i] = settings.noState;
        }
    }
}
