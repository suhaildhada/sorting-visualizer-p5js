import { bubbleSort } from "../algo/bubblesort.js";
import { selectionSort } from "../algo/selectionsort.js";
import { heapSort } from "./algo/heapsort.js";
import { insertionSort } from "./algo/insertionsort.js";
import { mergeSort } from "./algo/mergesort.js";
import { quickSort } from "./algo/quicksort.js";
import { radixSort } from "./algo/radixsort.js";

import { generateRandomArray } from "./helpers/generateRandomArray.js";
import { isArraySorted } from "./helpers/isArraySorted.js";
let values = [];
let w = 10;
let frameRate = 120;
let states = [];

const pivotState = 2;
const state1 = 0;
const state2 = 1;
const sortedState = 100;

let quicksortBtn = document.getElementById("quick-sort");
let bubblesortBtn = document.getElementById("bubble-sort");
let selectionSortBtn = document.getElementById("selection-sort");
let resetBtn = document.getElementById("reset-btn");
let radixSortBtn = document.getElementById("radix-sort");
let mergeSortBtn = document.getElementById("merge-sort");
let insertionSortBtn = document.getElementById("insertion-sort");
let heapSortBtn = document.getElementById("heap-sort");

let sorting = false;
let sorted = false;
new p5((p5) => {
    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.frameRate(frameRate);
        generateRandomArray(p5, w, values);
        quicksortBtn.addEventListener("click", () => {
            sorting = true;
            quickSort(values, 0, values.length - 1, states, sorting);
        });

        bubblesortBtn.addEventListener("click", () => {
            sorting = true;
            bubbleSort(values, states);
        });

        selectionSortBtn.addEventListener("click", () => {
            sorting = true;
            selectionSort(values, states);
        });

        radixSortBtn.addEventListener("click", () => {
            sorting = true;
            radixSort(values, states);
        });

        mergeSortBtn.addEventListener("click", () => {
            sorting = true;
            mergeSort(values, states);
        });

        insertionSortBtn.addEventListener("click", () => {
            sorting = true;
            insertionSort(values, states);
        });

        heapSortBtn.addEventListener("click", () => {
            sorting = true;
            heapSort(values, states);
        });

        resetBtn.addEventListener("click", () => {
            if (!sorting) {
                states = [];
                sorted = false;
                sorting = false;
                generateRandomArray(p5, w, values);
            }
        });
    };

    p5.draw = async () => {
        p5.background(0);
        for (let i = 0; i < values.length; i++) {
            p5.noStroke();
            if (states[i] === state1) {
                p5.fill("#F26419");
            } else if (states[i] === state2) {
                p5.fill("#1C5D99");
            } else if (states[i] === pivotState) {
                p5.fill("#961D4E");
            } else if (states[i] === sortedState) {
                p5.fill("#006400");
            } else {
                p5.fill(255);
            }
            p5.rect(i * w, p5.height - values[i], w, values[i]);
        }
        if (!sorted && sorting && isArraySorted(values)) {
            sorted = true;
            sorting = false;
        }
        //Try to make it work... not necessary.
        // if (sorted) {
        //   for (let i = 0; i < values.length; i++) {
        //     states[i] = sortedState;
        //     await sleep(100);
        //   }
        //   for (let i = 0; i < values.length; i++) {
        //     states[i] = -1;
        //     await sleep(100);
        //   }
        //   sorted = false;
        // }
    };
});
