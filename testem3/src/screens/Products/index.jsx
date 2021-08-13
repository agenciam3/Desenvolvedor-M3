import { useEffect, useState } from 'react';
import './styles.css'
import ProductCard from '../../components/ProductCard';

const list = [
    {
        id: 1,
        name: "Camiseta Mescla",
        price: "28,00",
        color: "Cinza",
        installment: 3
    },
    {
        id: 2,
        name: "Saia em couro",
        price: "398,00",
        color: "Azul",
        installment: 5
    },
    {
        id: 3,
        name: "Cardigan tigre",
        price: "28,00",
        color: "Amarelo",
        installment: 5
    },
    {
        id: 4,
        name: "Cardigan off white",
        price: "99,00",
        color: "Branco",
        installment: 3
    },
    {
        id: 5,
        name: "Body leopardo",
        price: "129,00",
        color: "Amarelo",
        installment: 3
    },
    {
        id: 6,
        name: "Casaco Pelos",
        price: "28,00",
        color: "Rosa",
        installment: 5
    },
    {
        id: 7,
        name: "Cropped Stripes",
        price: "120,00",
        color: "Laranja",
        installment: 3
    },
    {
        id: 8,
        name: "Camisa Transparente",
        price: "398,00",
        color: "Preto",
        installment: 5
    },
    {
        id: 9,
        name: "Pochete clutch",
        price: "99,00",
        color: "Preto",
        installment: 3
    }
]

const Products = () => {
    const [colors, setColors] = useState([])
    const [allColors, setAllColors] = useState([])
    const [showAllColors, setShowAllColors] = useState(false)
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

    const sizes = ["P", "M", "G", "GG", "U", "36", "38", "40", "42", "44"]
    return (
        <div className="container-products">
            <div className="filters">
                <div className="color-filter">
                    <label>Cores</label>
                    {showAllColors ? allColors.map((item, index) => {
                        return (
                            <div key={index}>
                                <input type="checkbox" />
                                <span>{item}</span>
                            </div>
                        )
                    }) : colors.map((item, index) => {
                        return (
                            <div key={index}>
                                <input type="checkbox" />
                                <span>{item}</span>
                            </div>
                        )
                    })}
                    {showAllColors ? <button onClick={() => setShowAllColors(oldBool => !oldBool)}>
                        Mostrar Menos
                    </button> : <button onClick={() => setShowAllColors(oldBool => !oldBool)}>
                        Mostrar Mais
                    </button>}
                </div>
                <div className="sizes">
                    <label>Tamanhos</label>
                    <div className="btn-size-area">
                        {sizes.map((item, index) => {
                            return (
                                <button key={index} className="btn-size">
                                    {item}
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div className="prices">
                    <label>Faixa de Preço</label>
                    <input type="checkbox" />
                    <span>de R$ 0 até R$50</span>
                    <input type="checkbox" />
                    <span>de R$ 51 até R$150</span>
                    <input type="checkbox" />
                    <span>de R$ 151 até R$300</span>
                    <input type="checkbox" />
                    <span>de R$ 301 até R$500</span>
                    <input type="checkbox" />
                    <span>a partir de R$501</span>
                </div>
            </div>
            <div className="cards-area">
                {list.map((item) => {
                    return (
                        <ProductCard item={item} />
                    )
                })}
            </div>
        </div>
    )
}

export default Products;