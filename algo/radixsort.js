import { sleep } from "../helpers/sleep.js";

export async function radixSort(arr, states) {
    let maxDigits = 0;
    let maxDigitsIdx = 0;
    for (let i = 0; i < arr.length; i++) {
        let len = arr[i].toString().length;
        states[i] = 1;
        await sleep(100);
        if (len > maxDigits) {
            states[maxDigitsIdx] = -1;
            await sleep(100);
            maxDigitsIdx = i;
            states[maxDigitsIdx] = 2;
            await sleep(100);
            maxDigits = len;
        }
        if (i != maxDigitsIdx) {
            states[i] = -1;
        }
    }
    states[maxDigitsIdx] = -1;

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
            states[idx] = 1;
            temp[idx] = val;
            count[digitVal]--;
            await sleep(100);
            states[i] = -1;
        }

        for (let i = 0; i < states.length; i++) {
            states[i] = -1;
        }

        for (let i = 0; i < temp.length; i++) {
            states[i] = 2;
            arr[i] = temp[i];
            await sleep(100);
            states[i] = -1;
        }
    }
}
