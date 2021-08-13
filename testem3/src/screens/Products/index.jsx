import { useEffect, useState } from 'react';
import './styles.css'
import ProductCard from '../../components/ProductCard';
import ProductsFilters from '../../components/ProductsFilters';
import img2 from '../../imagens/img_2.png'
import img3 from '../../imagens/img_3.png'
import img4 from '../../imagens/img_4.png'
import img5 from '../../imagens/img_5.png'
import img6 from '../../imagens/img_6.png'
import img7 from '../../imagens/img_7.png'
import img8 from '../../imagens/img_8.png'
import img9 from '../../imagens/img_9.png'
import img10 from '../../imagens/img_10.png'


const list = [
    {
        id: 1,
        name: "Camiseta Mescla",
        price: "28,00",
        color: "Cinza",
        installment: 3,
        img: img2
    },
    {
        id: 2,
        name: "Saia em couro",
        price: "398,00",
        color: "Azul",
        installment: 5,
        img: img3
    },
    {
        id: 3,
        name: "Cardigan tigre",
        price: "28,00",
        color: "Amarelo",
        installment: 5,
        img: img4
    },
    {
        id: 4,
        name: "Cardigan off white",
        price: "99,00",
        color: "Branco",
        installment: 3,
        img: img5
    },
    {
        id: 5,
        name: "Body leopardo",
        price: "129,00",
        color: "Amarelo",
        installment: 3,
        img: img6
    },
    {
        id: 6,
        name: "Casaco Pelos",
        price: "28,00",
        color: "Rosa",
        installment: 5,
        img: img7
    },
    {
        id: 7,
        name: "Cropped Stripes",
        price: "120,00",
        color: "Laranja",
        installment: 3,
        img: img8
    },
    {
        id: 8,
        name: "Camisa Transparente",
        price: "398,00",
        color: "Preto",
        installment: 5,
        img: img9
    },
    {
        id: 9,
        name: "Pochete clutch",
        price: "99,00",
        color: "Preto",
        installment: 3,
        img: img10
    }
]

const Products = () => {
    const [colors, setColors] = useState([])
    const [allColors, setAllColors] = useState([])
    useEffect(() => {
        let cont = 1
        let colorsA = []
        colorsA = list.reduce((obj, item) => obj.includes(item.color) ? obj : [...obj, item.color], []);
        colorsA.map((newColor) => {
            if (cont <= 5) {
                cont++
                setColors(oldColors => [...oldColors, newColor])
            }
        })
        colorsA.map((newColor) => { setAllColors(oldColors => [...oldColors, newColor]) })

    }, [])
    return (
        <div className="container-products">
            <div className="filters">
                <ProductsFilters allColors={allColors} colors={colors} />
            </div>
            <div className="cards-area">
                {list.map((item) => {
                    return (
                        <ProductCard item={item} list={list} />
                    )
                })}
            </div>
        </div>
    )
}

export default Products;