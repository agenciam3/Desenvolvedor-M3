import { orderByMoreRecent, orderBySmallerPrice, orderByBiggerPrice } from '../../';

const orderOptions = () => {
  const recentBtn = document.createElement('button');
  recentBtn.textContent = 'Mais recente';
  recentBtn.id = 'recent-btn';
  recentBtn.className = 'button';
  recentBtn.addEventListener('click', orderByMoreRecent);

  const biggerPriceBtn = document.createElement('button');
  biggerPriceBtn.textContent = 'Maior preço';
  biggerPriceBtn.id = 'bigger-btn';
  biggerPriceBtn.className = 'button';
  biggerPriceBtn.addEventListener('click', orderByBiggerPrice)
  
  const smallerPriceBtn = document.createElement('button');
  smallerPriceBtn.textContent = 'Menor preço';
  smallerPriceBtn.id = 'smaller-btn';
  smallerPriceBtn.className = 'button';
  smallerPriceBtn.addEventListener('click', orderBySmallerPrice);

  const div = document.createElement('div');
  div.appendChild(recentBtn);
  div.appendChild(smallerPriceBtn);
  div.appendChild(biggerPriceBtn);

  return div;
}

export default orderOptions;
