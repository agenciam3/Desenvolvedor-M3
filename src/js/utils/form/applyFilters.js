import { filterProducts } from '../..';

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

export function isAnyColorAvailable(colors, productColor) {
  if (colors.length === 0) return true;

  return colors.some((color) => color.toLowerCase() === productColor.toLowerCase());
}

export function isAnySizeAvailable(sizes, productSizes) {
  if (sizes.length === 0) return true;

  console.log(sizes);
  console.log(productSizes)

  return sizes.some((size) => productSizes.includes(size));
}

export function isInAnyRange(ranges, productPrice) {
  if (ranges.length === 0) return true;

  return ranges.some((range) => {
    if (range.length === 1) {
      return productPrice > range[0];
    }
    return productPrice > range[0] && productPrice <= range[1];
  });
}

function applyFilters() {
  filterProducts(getInputsValues());
}

export default applyFilters;
