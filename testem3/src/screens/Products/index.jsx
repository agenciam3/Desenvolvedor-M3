import { useEffect, useState } from 'react';
import './styles.css'
import ProductCard from '../../components/ProductCard';
import ProductsFilters from '../../components/ProductsFilters';

const Products = ({ list, setCart }) => {
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
        <div>
            <div className="product-type">
                <h1 className="type-title">Blusas</h1>
                <select className="organize-by">
                    <option >Ordenar por</option>
                    <option >Menor Valor</option>
                    <option >Maior Valor</option>
                    <option >Mais recentes</option>
                </select>
            </div>
            <div className="container-products">
                <div className="filters">
                    <ProductsFilters allColors={allColors} colors={colors} />
                </div>
                <div className="products-area">
                    <div className="cards-area">
                        {list.map((item) => {
                            return (
                                <ProductCard item={item} list={list} setCart={setCart} />
                            )
                        })}
                    </div>
                    <div className="show-more">
                        <button className="btn-show-more"> CARREGAR MAIS</button>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Products;