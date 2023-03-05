export function genericSortBtnListener(btn, settings, fn) {
    btn.addEventListener("click", () => {
        settings.sorting = true;
        fn(settings.values, settings.states, settings);
    });
}
