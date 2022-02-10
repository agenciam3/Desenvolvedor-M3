import LogoM3 from '../../assets/images/logo-m3.png';
import Bag from '../../assets/images/bag.svg';

import { Container, Logo, Cart } from './styles';
import { useCart } from '../../contexts/CartContext';

export default function Header() {
  const { productsInCart, handleIsOpenned } = useCart();
  return (
    <Container>
      <Logo
        src={LogoM3}
        alt="Logo"
        onClick={() => window.open('https://m3ecommerce.com/', '_blank')}
      />
      <Cart
        onClick={handleIsOpenned}
      >
        <img src={Bag} alt="Cart" />
        <span>
          {productsInCart.reduce((accumulator, current) => (
            accumulator += current.quantity
          ), 0)}
        </span>
      </Cart>
    </Container>
  );
}
