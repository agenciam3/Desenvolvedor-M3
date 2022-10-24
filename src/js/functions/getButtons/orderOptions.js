import { filterRecents, filterlessRangePrice, filterBiggerRangePrice} from '../..';



const orderOptions = () => {
  const recentBtn = document.getElementById('recent-btn');
  recentBtn.addEventListener('click', (event) => {
    filterRecents();
    selectOrderOption(event)
  });

  const biggerPriceBtn = document.getElementById('bigger-btn');
  biggerPriceBtn.addEventListener('click', (event) => {
    filterBiggerRangePrice();
    selectOrderOption(event)
  });
  
  const smallerPriceBtn = document.getElementById('smaller-btn');
  smallerPriceBtn.addEventListener('click', (event) => {
    filterlessRangePrice();
    selectOrderOption(event)
  });
}

const selectOrderOption = ({ target }) => {
  const oldSelected = document.querySelector('.order-selected');

  if (!!oldSelected) {
    oldSelected.classList.remove('order-selected');
  }
  target.classList.add('order-selected');
};

export default orderOptions;