import ColorsCheckboxes from './elements/ColorsCheckboxes.js';
import PriceRangeCheckboxes from './elements/PriceRangeCheckboxes.js';


ColorsCheckboxes().create('colors-filter-container-id', ['branco', 'preto', 'rosa', 'cinza'], function (value) {
    console.log(value);
});


PriceRangeCheckboxes().create('price-range-filter-container-id', [120.33, 450.50], function (value) {
    console.log(value);
});