import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import ProductsFilters from '../../components/ProductsFilters';
import ProductType from '../../components/ProductType';
import './styles.css'

const Products = ({ list, setCart }) => {
    const [filterList, setFilterList] = useState([])
    const [colors, setColors] = useState([])
    const [showFilter, setShowFilter] = useState(false)
    const [allColors, setAllColors] = useState([])
    const [showAllProducts, setShowAllProducts] = useState(false)
    useEffect(() => {
        let cont = 1
        let colorsA = []
        colorsA = list.reduce((obj, item) => obj.includes(item.color) ? obj : [...obj, item.color], []);
        colorsA.forEach((newColor) => {
            if (cont <= 5) {
                cont++
                setColors(oldColors => [...oldColors, newColor])
            }
        })
        colorsA.forEach((newColor) => { setAllColors(oldColors => [...oldColors, newColor]) })

    }, [list])

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
            <ProductType handleOrganize={handleOrganize}
                setShowFilter={setShowFilter}
            />
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
                        {filterList.map((item, index) => {
                            if (index >= 6 && !showAllProducts) {
                                return <div key={index}></div>
                            }
                            return <ProductCard key={index} item={item} list={list} setCart={setCart} />
                        })}

                    </ul>
                    <div className="show-more">
                        <button onClick={() => {
                            setShowAllProducts(oldBool => !oldBool)
                        }} className={`btn-show-more ${showAllProducts && 'active'}`}> CARREGAR MAIS</button>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Products;