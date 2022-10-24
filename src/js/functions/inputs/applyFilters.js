import { filterProducts } from '../..';



export function getCheckValue() {
 
  const sizes = captureClassesName('check_size');
   const colors = captureClassesName('check_color');
  const ranges = checkValidateFormater();

  return { colors, sizes, ranges }
}


export function colorRange(colors, productColor) {
  if (colors.length === 0) return true;

  return colors.some((color) => color.toLowerCase() === productColor.toLowerCase());
}



export function priceRange(ranges, productPrice) {
  if (ranges.length === 0) return true;

  return ranges.some((range) => {
    if (range.length === 1) {
      return productPrice > range[0];
    }
    return productPrice > range[0] && productPrice <= range[1];
  });
}

export function sizeRange(sizes, productSizes) {
  if (sizes.length === 0) return true;

 
  return sizes.some((size) => productSizes.includes(size));
}


function checkValidateFormater() {
  const ranges = captureClassesName('check_range');
  const formattedRanges = ranges.map((range) => {
    const valuesMinMax = [];
    range.split(',').forEach((string) => {
      valuesMinMax.push(parseInt(string, 10));
    });

    return valuesMinMax;
  });

  return formattedRanges;
}


function captureClassesName(className) {
  const inputs = document.querySelectorAll(`.${className}`);
  const classValue = [];

  for (let i = 0; i < inputs.length; i += 1) {
    const product = inputs[i];
    if (product.checked) {
      classValue.push(product.value);
    }
  }

  return classValue;
}

function applyFilters() {
  filterProducts(getCheckValue());
}

export default applyFilters;
