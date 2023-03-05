import { sleep } from "../helpers/sleep.js";

export async function insertionSort(arr, states) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            states[j + 1] = 0;
            states[j] = 1;

            arr[j + 1] = arr[j];
            await sleep(20);
            states[j + 1] = -1;
            states[j] = -1;
            j--;
        }
        states[j + 1] = 2;
        arr[j + 1] = key;
        await sleep(20);
        states[j + 1] = -1;
    }
}
