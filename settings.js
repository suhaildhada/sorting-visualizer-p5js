export default class Settings {
    constructor() {
        this.values = [];
        this.states = [];
        this.frameRate = 60;
        this.state1 = 0;
        this.state2 = 1;
        this.state3 = 2;
        this.noState = -1;
        this.sortedState = 3;
        this.sorting = false;
        this.sorted = false;
        this.w = 10;
    }

    generateRandomArray(p5) {
        if (this.sorting) return;
        let bound = p5.floor(p5.height - 100);
        for (let i = 0; i < p5.floor(p5.width / this.w); i++) {
            this.values[i] = p5.floor(p5.random(bound));
        }
    }
    isArraySorted() {
        for (let i = 0; i < this.values.length - 1; i++) {
            if (this.values[i + 1] - this.values[i] < 0) {
                this.sorted = false;
                return;
            }
        }
        this.sorted = true;
        this.sorting = false;
    }

    reset(p5) {
        if (!this.sorting) {
            this.sorted = false;
            this.generateRandomArray(p5);
            this.states = [];
        }
    }
}
