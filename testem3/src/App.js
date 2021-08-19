import { useState } from "react";

import Products from "./screens/Products";
import Header from "./components/Header";
import { list } from './assets/products'

import './App.css'

function App() {
  const [cart, setCart] = useState([])
  return (
    <div className="main-container">
      <Header cart={cart} setCart={setCart} />
      <div className="body-container">
        <Products list={list} setCart={setCart} cart={cart} />
      </div>
    </div>
  );
}

export default App;
