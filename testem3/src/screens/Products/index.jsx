import { useEffect, useState } from 'react';
import './styles.css'
import ProductCard from '../../components/ProductCard';
import ProductsFilters from '../../components/ProductsFilters';

const Products = ({ list, setCart }) => {
    const [products, setProducts] = useState(list)
    const [filterList, setFilterList] = useState([])
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

    const handleOrganize = (e) => {
        let filteredArr = [...products]
        switch (e.target.value) {
            case "lower":
                setProducts(filteredArr.sort((a, b) => parseInt(a.price) - parseInt(b.price)))
                break;
            case "highest":
                setProducts(filteredArr.sort((a, b) => parseInt(a.price) - parseInt(b.price)).reverse())
                break;
            case "none":
                setProducts(list)
                break;
            case "date":
                setProducts(filteredArr.sort((a, b) => new Date(b.date) - new Date(a.date)))
                break;

            default:
                break;
        }
    }

    return (
        <div>
            <div className="product-type">
                <h1 className="type-title">Blusas</h1>
                <select onChange={(e) => handleOrganize(e)} className="organize-by-desktop">
                    <option value="none">Ordenar por</option>
                    <option value="lower">Menor Valor</option>
                    <option value="highest">Maior Valor</option>
                    <option value="date">Mais recentes</option>
                </select>
            </div>
            <div className="container-products">
                <div className="filters">
                    <ProductsFilters allColors={allColors} colors={colors} filterList={filterList} setFilterList={setFilterList} products={products} />
                </div>
                <div className="products-area">
                    <div className="cards-area">
                        {filterList.length === 0 ?
                            products.map((item) => {
                                return (
                                    <ProductCard item={item} list={list} setCart={setCart} />
                                )
                            })
                            : filterList.map((item) => {
                                return (
                                    <ProductCard item={item} list={list} setCart={setCart} />
                                )
                            })}

                    </div>
                    <div className="show-more">
                        <button onClick={() => setProducts(products.concat(list))} className="btn-show-more"> CARREGAR MAIS</button>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Products;