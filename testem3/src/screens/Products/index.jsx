import { useEffect, useState } from 'react';
import './styles.css'
import ProductCard from '../../components/ProductCard';
import ProductsFilters from '../../components/ProductsFilters';

const Products = ({ list, setCart }) => {
    const [filterList, setFilterList] = useState([])
    const [colors, setColors] = useState([])
    const [showFilter, setShowFilter] = useState(false)
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
        let filteredArr = [...filterList]
        switch (e.target.value) {
            case "lower":
                setFilterList(filteredArr.sort((a, b) => parseInt(a.price) - parseInt(b.price)))
                break;
            case "highest":
                setFilterList(filteredArr.sort((a, b) => parseInt(a.price) - parseInt(b.price)).reverse())
                break;
            case "none":
                setFilterList(filterList)
                break;
            case "date":
                setFilterList(filteredArr.sort((a, b) => new Date(b.date) - new Date(a.date)))
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
                <div className="mobile-filters">
                    <button className="btn-filter-mobile" onClick={() => setShowFilter(oldBool => !oldBool)}>FILTRAR</button>
                    <button className="btn-filter-mobile">ORDENAR</button>
                </div>
            </div>
            <div className="container-products">
                <div className="filters">
                    <ProductsFilters list={list}
                        allColors={allColors}
                        colors={colors}
                        filterList={filterList}
                        showFilter={showFilter}
                        setShowFilter={setShowFilter}
                        setFilterList={setFilterList} />
                </div>
                <div className="products-area">
                    <ul className="cards-area">
                        {filterList.map((item) => {
                            return (
                                <ProductCard item={item} list={list} setCart={setCart} />
                            )
                        })}

                    </ul>
                    <div className="show-more">
                        <button onClick={() => setFilterList(list.concat(list))} className="btn-show-more"> CARREGAR MAIS</button>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Products;