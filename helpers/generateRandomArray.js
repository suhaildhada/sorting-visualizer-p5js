export function generateRandomArray(p5, w, values, sorting = false) {
  if (sorting) return;
  let bound = p5.height - 100;
  for (let i = 0; i < p5.floor(p5.width / w); i++) {
    values[i] = p5.random(bound);
  }
}
