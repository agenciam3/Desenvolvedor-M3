import { useState } from 'react';
import {
  TitleFilter,
  ColorsContainer,
  SizesContainer,
  PricesContainer,
} from './styles';

import Arrow from '../../assets/images/arrow.svg';
import { useFilter } from '../../contexts/FilterContext';

import { colors, sizes, prices } from '../../products';

export default function FiltersMobile() {
  const [colorsIsOpen, setColorsIsOpen] = useState(false);
  const [sizesIsOpen, setSizesIsOpen] = useState(false);
  const [pricesIsOpen, setPricesIsOpen] = useState(false);
  const { colorSelected, sizeSelected, priceSelected } = useFilter();

  return (
    <>
      <TitleFilter onClick={() => setColorsIsOpen((prevState) => (
        prevState === true ? false : true
      ))}
      >
        <p>CORES</p>
        <img src={Arrow} alt="arrow" />
      </TitleFilter>
      {colorsIsOpen && (colors.map((color) => (
        <ColorsContainer key={color}>
          <input id={`mb${color}`} type="checkbox" />
          <label
            htmlFor={`mb${color}`}
            onClick={() => colorSelected(color)}
          >
            {color}
          </label>
        </ColorsContainer>
      )))}

      <TitleFilter onClick={() => setSizesIsOpen((prevState) => (
        prevState === true ? false : true
      ))}
      >
        <p>TAMANHOS</p>
        <img src={Arrow} alt="arrow" />
      </TitleFilter>
      <SizesContainer>
        {sizesIsOpen && (sizes.map((size) => (
          <div key={size}>
            <input id={`mb${size}`} type="checkbox" />
            <button type="button">
              <label
                htmlFor={`mb${size}`}
                onClick={() => sizeSelected(size)}
              >
                {size}
              </label>
            </button>
          </div>
        )))}
      </SizesContainer>

      <TitleFilter onClick={() => setPricesIsOpen((prevState) => (
        prevState === true ? false : true
      ))}
      >
        <p>FAIXA DE PREÇO</p>
        <img src={Arrow} alt="arrow" />
      </TitleFilter>
      {pricesIsOpen && (prices.map((price) => (
        <PricesContainer key={price.show}>
          <input
            type="radio"
            id={`mb${price.show}`}
            name="price"
            value={JSON.stringify(price)}
            onChange={(event) => priceSelected(JSON.parse(event.target.value))}
          />
          <label htmlFor={`mb${price.show}`}>{price.show}</label>
        </PricesContainer>
      )))}
    </>
  );
}
