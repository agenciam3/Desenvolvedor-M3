import ReactDom from 'react-dom';

import { useCart } from '../../contexts/CartContext';

import {
  Overlay,
  CloseArea,
  Container,
  CloseButton,
  ProductContainer,
  ProductQuantity,
  RemoveProduct,
} from './styles';

import Close from '../../assets/images/close.svg';

export default function Cart() {
  const {
    isOpenned,
    productsInCart,
    handleIsOpenned,
    removeProduct,
    productQunatityAdd,
    productQunatityRemove,
  } = useCart();

  return ReactDom.createPortal(
    <>
      {isOpenned && (
      <Overlay>
        <CloseArea onClick={handleIsOpenned} />
        <Container>
          <CloseButton>
            <img onClick={handleIsOpenned} src={Close} alt="close" />
          </CloseButton>

          {productsInCart.map((item) => (
            <ProductContainer key={item.id}>
              <img
                src={require(`../../assets/images/products/${item.photo}.png`)}
                alt={item.name}
              />
              <p>{item.name.toUpperCase()}</p>
              <h4>{`R$ ${item.totalPrice.toFixed(2)}`}</h4>
              <ProductQuantity>
                <button
                  type="button"
                  onClick={() => productQunatityRemove(item)}
                >
                  -
                </button>
                <p>{item.quantity}</p>
                <button
                  type="button"
                  onClick={() => productQunatityAdd(item)}
                >
                  +
                </button>
              </ProductQuantity>
              <RemoveProduct
                type="button"
                onClick={() => removeProduct(item.id)}
              >
                remover
              </RemoveProduct>
            </ProductContainer>
          ))}
        </Container>
      </Overlay>
      )}
    </>,
    document.getElementById('cart-root'),
  );
}
