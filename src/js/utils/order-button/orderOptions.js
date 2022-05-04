import { orderByMoreRecent, orderBySmallerPrice, orderByBiggerPrice } from '../../';

const selectOrderOption = ({ target }) => {
  const oldSelected = document.querySelector('.order-selected');

  if (!!oldSelected) {
    oldSelected.classList.remove('order-selected');
  }
  target.classList.add('order-selected');
};

const orderOptions = () => {
  const recentBtn = document.getElementById('recent-btn');
  recentBtn.addEventListener('click', (event) => {
    orderByMoreRecent();
    selectOrderOption(event)
  });

  const biggerPriceBtn = document.getElementById('bigger-btn');
  biggerPriceBtn.addEventListener('click', (event) => {
    orderByBiggerPrice();
    selectOrderOption(event)
  });
  
  const smallerPriceBtn = document.getElementById('smaller-btn');
  smallerPriceBtn.addEventListener('click', (event) => {
    orderBySmallerPrice();
    selectOrderOption(event)
  });
}

export default orderOptions;