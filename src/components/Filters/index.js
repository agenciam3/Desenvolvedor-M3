import { useState } from 'react';
import {
  TitleFilter, ColorsContainer, AllColors, SizesContainer, PricesContainer,
} from './styles';

import Arrow from '../../assets/images/arrow.svg';
import { useFilter } from '../../contexts/FilterContext';

import { colors, sizes, prices } from '../../products';

export default function Filters() {
  const [colorLimit, setColorLimit] = useState(5);
  const { colorSelected, sizeSelected, priceSelected } = useFilter();

  return (
    <>
      <TitleFilter>CORES</TitleFilter>
      {colors.slice(0, colorLimit).map((color) => (
        <ColorsContainer key={color}>
          <input id={color} type="checkbox" />
          <label
            htmlFor={color}
            onClick={() => colorSelected(color)}
          >
            {color}
          </label>
        </ColorsContainer>
      ))}
      {colorLimit < colors.length && (
        <AllColors onClick={() => setColorLimit(colors.length)}>
          <p>Ver todas as cores</p>
          <img src={Arrow} alt="arrow" />
        </AllColors>
      )}

      <TitleFilter>TAMANHOS</TitleFilter>
      <SizesContainer>
        {sizes.map((size) => (
          <div key={size}>
            <input id={size} type="checkbox" />
            <button type="button">
              <label
                htmlFor={size}
                onClick={() => sizeSelected(size)}
              >
                {size}
              </label>
            </button>
          </div>
        ))}
      </SizesContainer>

      <TitleFilter>FAIXA DE PREÇO</TitleFilter>
      {prices.map((price) => (
        <PricesContainer key={price.show}>
          <input
            type="radio"
            id={price.minValue}
            name="price"
            value={JSON.stringify(price)}
            onChange={(event) => priceSelected(JSON.parse(event.target.value))}
          />
          <label htmlFor={price.minValue}>{price.show}</label>
        </PricesContainer>
      ))}
    </>
  );
}
