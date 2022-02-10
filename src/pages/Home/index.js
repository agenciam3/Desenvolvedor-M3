import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';

import Arrow from '../../assets/images/arrow.svg';

import Filters from '../../components/Filters';

import {
  Container,
  TopContainer,
  MobileContainer,
  PageTitle,
  OrderBy,
  OrderByOpen,
  FilterContainer,
  Product,
} from './styles';
import { useFilter } from '../../contexts/FilterContext';
import { useMobileModal } from '../../contexts/MobileModalContext';

export default function Home() {
  const [limit, setLimit] = useState(6);
  const { addProduct } = useCart();
  const {
    setColors,
    setSizes,
    setPriceRange,
    productsFiltered,
    orderby,
    ordering,
    orderbyIsOpen,
  } = useFilter();

  const {
    handleModalIsOpenned,
    setShowContent,
  } = useMobileModal();

  function changeLimit() {
    if (productsFiltered.length <= limit) return;

    setLimit((prevState) => prevState + 3);
  }

  function selectModalContent(content) {
    setShowContent(content);
    handleModalIsOpenned();
  }

  function openMobileFilter() {
    setColors([]);
    setSizes([]);
    setPriceRange({});
    selectModalContent('filter');
  }

  return (
    <Container>
      <TopContainer>
        <PageTitle>Blusas</PageTitle>
        <OrderBy onClick={orderbyIsOpen}>
          <p>Ordenar por:</p>
          <img src={Arrow} alt="arrow" />

          {orderby && (
            <OrderByOpen>
              <p onClick={() => ordering('recent')}>Mais recentes</p>
              <p onClick={() => ordering('cheaper')}>Menor preço</p>
              <p onClick={() => ordering('more-expensive')}>Maior preço</p>
            </OrderByOpen>
          )}
        </OrderBy>
      </TopContainer>

      <MobileContainer>
        <p>Blusas</p>

        <div>
          <button onClick={openMobileFilter} type="button">Filtrar</button>
          <button onClick={() => selectModalContent('orderby')} type="button">Ordenar</button>
        </div>
      </MobileContainer>

      <div>
        <FilterContainer>
          <Filters />
        </FilterContainer>

        <main>
          <div>
            {productsFiltered?.slice(0, limit).map((item) => (
              <Product key={item.id}>
                <img
                  src={require(`../../assets/images/products/${item.photo}.png`)}
                  alt={item.name}
                />
                <p>{item.name}</p>
                <h4>{item.showprice}</h4>
                <p>{item.installments}</p>
                <button type="button" onClick={() => addProduct(item)}>COMPRAR</button>
              </Product>
            ))}
          </div>
          {productsFiltered.length > limit && (
            <button type="button" onClick={changeLimit}>
              CARREGAR MAIS
            </button>
          )}
        </main>
      </div>
    </Container>
  );
}
