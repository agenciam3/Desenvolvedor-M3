import { ThemeProvider } from 'styled-components';
import { CartContextProvider } from '../../contexts/CartContext';
import { FilterContextProvider } from '../../contexts/FilterContext';

import Home from '../../pages/Home';

import Header from '../Header';
import Footer from '../Footer';
import Cart from '../Cart';
import MobileModal from '../MobileModal';

import { PageContainer } from './styles';
import GlobalStyles from '../../assets/styles/global';
import DefaultTheme from '../../assets/styles/Themes/default';
import { MobileModalProvider } from '../../contexts/MobileModalContext';

export default function App() {
  return (
    <CartContextProvider>
      <FilterContextProvider>
        <MobileModalProvider>
          <ThemeProvider theme={DefaultTheme}>
            <Cart />
            <MobileModal />
            <GlobalStyles />
            <Header />
            <PageContainer>
              <Home />
            </PageContainer>
            <Footer />
          </ThemeProvider>
        </MobileModalProvider>
      </FilterContextProvider>
    </CartContextProvider>
  );
}
