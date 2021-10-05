import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import GlobalStyle from "./styles/global";
import FilterPage from "./components/Mobile/FilterPage";
import { MobilePagesContext, useMobilePages } from "./providers/MobilePagesContext";
import { BodyContainer} from "./styles.js";
import OrderPage from "./components/Mobile/OrderPage";
function App() {
  const { mobilePages } = useMobilePages(MobilePagesContext);
  return (
    <>
        <GlobalStyle /> 
        <FilterPage />
        <OrderPage />
        <BodyContainer filter={mobilePages[0]} order={mobilePages[1]}>
          <Header />
          <Home />
          <Footer />
        </BodyContainer>
    </>
  );
}

export default App;
