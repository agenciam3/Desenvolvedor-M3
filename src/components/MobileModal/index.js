import ReactDOM from 'react-dom';

import { useFilter } from '../../contexts/FilterContext';
import { useMobileModal } from '../../contexts/MobileModalContext';

import Close from '../../assets/images/close.svg';

import {
  Overlay,
  Container,
  OrderByOpen,
  FilterContainer,
  FilterController,
} from './styles';
import FiltersMobile from '../FiltersMobile';

export default function MobileModal() {
  const {
    setColors,
    setSizes,
    setPriceRange,
    ordering,
    colors,
    sizes,
    priceRange,
    filteringOnMobile,
  } = useFilter();

  const {
    handleModalIsOpenned,
    isOpenned,
    showContent,
  } = useMobileModal();

  function selectedOrdering(value) {
    ordering(value);
    handleModalIsOpenned();
  }

  function cleanFilter() {
    setColors([]);
    setSizes([]);
    setPriceRange({});
    handleModalIsOpenned();
  }

  function applyFilter() {
    filteringOnMobile();
    handleModalIsOpenned();
  }

  return ReactDOM.createPortal(
    <>
      {(isOpenned && showContent === 'orderby') ? (
        <Overlay>
          <Container>
            <OrderByOpen>
              <div>
                <h1>ORDERNAR</h1>
                <img onClick={handleModalIsOpenned} src={Close} alt="close" />
              </div>
              <p onClick={() => selectedOrdering('recent')}>Mais recentes</p>
              <p onClick={() => selectedOrdering('cheaper')}>Menor preço</p>
              <p onClick={() => selectedOrdering('more-expensive')}>Maior preço</p>
            </OrderByOpen>
          </Container>
        </Overlay>
      )
        : (isOpenned && showContent === 'filter') && (
          <Overlay>
            <Container>
              <FilterContainer>
                <div>
                  <h1>FILTRAR</h1>
                  <img onClick={handleModalIsOpenned} src={Close} alt="close" />
                </div>

                <>
                  <FiltersMobile />

                  {(colors.length >= 1 || sizes.length >= 1 || priceRange.show) && (
                    <FilterController>
                      <button onClick={applyFilter} type="button"> APLICAR </button>
                      <button onClick={cleanFilter} type="button"> LIMPAR </button>
                    </FilterController>
                  )}
                </>
              </FilterContainer>
            </Container>
          </Overlay>
        )}
    </>,
    document.getElementById('mobile-modal-root'),
  );
}
