export function genericSortBtnListener(btn, settings, fn) {
    btn.addEventListener("click", () => {
        settings.sorting = true;
        settings.time = performance.now();
        fn(settings.values, settings.states, settings);
    });
}
