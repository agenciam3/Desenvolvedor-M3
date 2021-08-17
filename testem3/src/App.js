import Products from "./screens/Products";
import './styles.css'
import Header from "./components/Header";
import img2 from './imagens/img_2.png'
import img3 from './imagens/img_3.png'
import img4 from './imagens/img_4.png'
import img5 from './imagens/img_5.png'
import img6 from './imagens/img_6.png'
import img7 from './imagens/img_7.png'
import img8 from './imagens/img_8.png'
import img9 from './imagens/img_9.png'
import img10 from './imagens/img_10.png'
import { useState } from "react";

const list = [
  {
    id: 1,
    name: "Camiseta Mescla",
    price: "28,00",
    color: "Cinza",
    size: "P",
    installment: 3,
    date: "Mar 12 2012 10:00:00 AM",
    img: img2
  },
  {
    id: 2,
    name: "Saia em couro",
    price: "398,00",
    color: "Azul",
    size: "M",
    installment: 5,
    date: "Mar 12 2013 10:00:00 AM",
    img: img3
  },
  {
    id: 3,
    name: "Cardigan tigre",
    price: "28,00",
    color: "Amarelo",
    size: "G",
    installment: 5,
    date: "Mar 12 2014 10:00:00 AM",
    img: img4
  },
  {
    id: 4,
    name: "Cardigan off white",
    price: "99,00",
    color: "Branco",
    size: "GG",
    installment: 3,
    date: "Mar 12 2015 10:00:00 AM",
    img: img5
  },
  {
    id: 5,
    name: "Body leopardo",
    price: "129,00",
    color: "Amarelo",
    size: "GG",
    installment: 3,
    date: "Mar 12 2016 10:00:00 AM",
    img: img6
  },
  {
    id: 6,
    name: "Casaco Pelos",
    price: "28,00",
    color: "Rosa",
    size: "M",
    installment: 5,
    date: "Mar 12 2017 10:00:00 AM",
    img: img7
  },
  {
    id: 7,
    name: "Cropped Stripes",
    price: "120,00",
    color: "Laranja",
    size: "U",
    installment: 3,
    date: "Mar 12 2018 10:00:00 AM",
    img: img8
  },
  {
    id: 8,
    name: "Camisa Transparente",
    price: "398,00",
    color: "Preto",
    size: "P",
    installment: 5,
    date: "Mar 12 2019 10:00:00 AM",
    img: img9
  },
  {
    id: 9,
    name: "Pochete clutch",
    price: "99,00",
    color: "Preto",
    size: "40",
    installment: 3,
    date: "Mar 12 2020 10:00:00 AM",
    img: img10
  }
]

function App() {
  const [cart, setCart] = useState([])
  return (
    <div className="main-container">
      <Header cart={cart} />
      <div className="body-container">
        <Products list={list} setCart={setCart} />
      </div>
    </div>
  );
}

export default App;
