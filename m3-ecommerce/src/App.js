import styles from './styles/App.module.css'

import NavBar from "./components/navbar";
import Header from "./components/header";
import ProductsMenu from './components/productsMenu';

function App() {
  return (
    <div className={styles.app}>
        <NavBar></NavBar>
        <div className = {styles.app_body}>
          <Header/>
          <ProductsMenu/>
        </div>
    </div>
  );
}

export default App;
