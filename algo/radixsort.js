import { sleep } from "../helpers/sleep.js";

export async function radixSort(arr, states, settings) {
    let maxDigits = 0;
    let maxDigitsIdx = 0;
    for (let i = 0; i < arr.length; i++) {
        let len = arr[i].toString().length;
        states[i] = settings.state2;
        if (len > maxDigits) {
            states[maxDigitsIdx] = settings.noState;
            maxDigitsIdx = i;
            states[maxDigitsIdx] = settings.state3;
            maxDigits = len;
        }
        if (i != maxDigitsIdx) {
            states[i] = settings.noState;
        }
    }
    states[maxDigitsIdx] = settings.noState;

    let temp = [];
    for (let digit = 0; digit < maxDigits; digit++) {
        let count = new Array(10).fill(0);

        for (let val of arr) {
            let digitVal = Math.floor(val / Math.pow(10, digit)) % 10;
            count[digitVal]++;
        }

        for (let i = 1; i < count.length; i++) {
            count[i] += count[i - 1];
        }

        for (let i = arr.length - 1; i >= 0; i--) {
            let val = arr[i];
            let digitVal = Math.floor(val / Math.pow(10, digit)) % 10;
            let idx = count[digitVal] - 1;
            states[i] = 0;
            states[idx] = settings.state2;
            temp[idx] = val;
            count[digitVal]--;
            await sleep(10);
            states[i] = settings.noState;
        }

        for (let i = 0; i < states.length; i++) {
            states[i] = settings.noState;
        }

        for (let i = 0; i < temp.length; i++) {
            states[i] = settings.state3;
            arr[i] = temp[i];
            await sleep(10);
            states[i] = settings.noState;
        }
    }
}
