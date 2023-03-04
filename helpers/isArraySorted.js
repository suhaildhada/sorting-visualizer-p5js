export function isArraySorted(values) {
  for (let i = 0; i < values.length - 1; i++) {
    if (values[i + 1] - values[i] < 0) return false;
  }
  return true;
}
