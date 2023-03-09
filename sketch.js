import { bubbleSort } from "./algo/bubblesort.js";
import { heapSort } from "./algo/heapsort.js";
import { insertionSort } from "./algo/insertionsort.js";
import { mergeSort } from "./algo/mergesort.js";
import { qsort } from "./algo/quicksort.js";
import { radixSort } from "./algo/radixsort.js";
import { selectionSort } from "./algo/selectionsort.js";
import { shellSort } from "./algo/shellSort.js";
import { genericSortBtnListener } from "./helpers/eventListners.js";

import Settings from "./settings.js";

let container = document.getElementById("container");
let quicksortBtn = document.getElementById("quick-sort");
let bubblesortBtn = document.getElementById("bubble-sort");
let selectionSortBtn = document.getElementById("selection-sort");
let resetBtn = document.getElementById("reset-btn");
let radixSortBtn = document.getElementById("radix-sort");
let mergeSortBtn = document.getElementById("merge-sort");
let insertionSortBtn = document.getElementById("insertion-sort");
let heapSortBtn = document.getElementById("heap-sort");
let shellSortBtn = document.getElementById("shell-sort");

let settings = new Settings();

new p5((p5) => {
    p5.setup = () => {
        const divPadding = 4;

        let canvasHeight = p5.windowHeight - container.offsetHeight;
        // 4 is padding of div container
        p5.createCanvas(p5.windowWidth - divPadding, canvasHeight);
        p5.frameRate(settings.frameRate);
        settings.generateRandomArray(p5);

        genericSortBtnListener(bubblesortBtn, settings, bubbleSort);
        genericSortBtnListener(quicksortBtn, settings, qsort);
        genericSortBtnListener(selectionSortBtn, settings, selectionSort);
        genericSortBtnListener(radixSortBtn, settings, radixSort);
        genericSortBtnListener(mergeSortBtn, settings, mergeSort);
        genericSortBtnListener(insertionSortBtn, settings, insertionSort);
        genericSortBtnListener(heapSortBtn, settings, heapSort);
        genericSortBtnListener(shellSortBtn, settings, shellSort);

        resetBtn.addEventListener("click", () => {
            if (!settings.sorting) {
                settings.reset(p5);
            }
        });
    };

    p5.draw = async () => {
        p5.background(0);
        for (let i = 0; i < settings.values.length; i++) {
            p5.noStroke();
            if (settings.states[i] === settings.state1) {
                p5.fill("#F26419");
            } else if (settings.states[i] === settings.state2) {
                p5.fill("#1C5D99");
            } else if (settings.states[i] === settings.state3) {
                p5.fill("#961D4E");
            } else if (settings.states[i] === settings.sortedState) {
                p5.fill("#006400");
            } else {
                p5.fill(255);
            }
            p5.rect(
                i * settings.w,
                p5.height - settings.values[i],
                settings.w,
                settings.values[i],
            );
        }
        if (!settings.sorted && settings.sorting) {
            settings.isArraySorted();
        }
    };
});
