export function getInputsValues() {
  const colors = getCheckedInputsByClassName('color-option');
  const sizes = getCheckedInputsByClassName('size-option');
  const ranges = getFormattedRanges();

  return { colors, sizes, ranges }
}

function getFormattedRanges() {
  const ranges = getCheckedInputsByClassName('range-option');
  const formattedRanges = ranges.map((range) => {
    const minToMax = [];
    range.split(',').forEach((string) => {
      minToMax.push(parseInt(string, 10));
    });

    return minToMax;
  });

  return formattedRanges;
}

function getCheckedInputsByClassName(className) {
  const inputs = document.querySelectorAll(`.${className}`);
  const values = [];

  for (let i = 0; i < inputs.length; i += 1) {
    const elem = inputs[i];
    if (elem.checked) {
      values.push(elem.value);
    }
  }

  return values;
}

function applyFilters() {
  console.log(getInputsValues());
}

export default applyFilters;
