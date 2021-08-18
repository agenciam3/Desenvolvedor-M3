import './styles.css'
import { useState, useEffect } from 'react'

const ProductsFilters = ({ allColors, colors, filterList, setFilterList, list }) => {
    const [showAllColors, setShowAllColors] = useState(false)
    const [colorFilter, setColorFilter] = useState([])
    const [sizeFilter, setSizeFilter] = useState([])
    const [priceFilter, setPriceFilter] = useState([])
    const [sizeSelect, setSizeSelect] = useState([])
    const sizes = ["P", "M", "G", "GG", "U", "36", "38", "40", "42", "44", "46"]

    const handleSelectSize = (item) => {
        if (sizeSelect.includes(item)) {
            let filteredArr = sizeSelect.filter((size) => size !== item)
            setSizeSelect(filteredArr)
        } else {
            setSizeSelect(oldArr => [...oldArr, item])
        }

    }
    useEffect(() => {

        let newFilters = []
        if (colorFilter.length === 0) {
            newFilters = list
        } else {
            newFilters = list.filter(value => colorFilter.includes(value.color))
        }
        if (sizeFilter.length != 0) {
            newFilters = newFilters.filter(value => sizeFilter.includes(value.size))
        }
        console.log(priceFilter)
        if (priceFilter.length != 0) {
            newFilters = newFilters.filter((value) => {
                let price
                let productPrice = parseInt(value.price)
                if (productPrice <= 50) {
                    price = "50"
                } else if (productPrice > 50 && productPrice <= 150) {
                    price = "51"
                } else if (productPrice > 150 && productPrice <= 300) {
                    price = "151"
                } else if (productPrice > 300 && productPrice <= 500) {
                    price = "301"
                } else if (productPrice > 500) {
                    price = "501"
                }
                return priceFilter.includes(price)
            })
        }
        console.log(filterList)
        if (filterList.length === 0 && sizeFilter.length != 0) {
            setFilterList(list)
        }
        setFilterList(newFilters)
    }, [colorFilter.length, sizeFilter.length, priceFilter.length])

    const handleColorFilter = (e) => {
        let colorCheck = e.target.value
        let newArr = []
        if (colorFilter.includes(colorCheck)) {
            newArr = colorFilter.filter((color) => colorCheck != color)
            setColorFilter(newArr)
        } else {
            setColorFilter(oldList => [...oldList, colorCheck])
        }
    }

    const handleSizeFilter = (newSize) => {

        let newArr = []
        if (sizeFilter.includes(newSize)) {
            newArr = sizeFilter.filter((size) => newSize != size)
            setSizeFilter(newArr)
        } else {
            setSizeFilter(oldList => [...oldList, newSize])
        }
    }

    const handlePriceFilter = (e) => {
        let price = e.target.value
        let newArr = []
        if (priceFilter.includes(price)) {
            newArr = priceFilter.filter((newPrice) => price != newPrice)
            setPriceFilter(newArr)
        } else {
            setPriceFilter(oldList => [...oldList, price])
        }
    }


    return (
        <div className="filter-container">
            <div className="color-filter">
                <label className="filter-label">CORES</label>
                {showAllColors ? allColors.map((item, index) => {
                    return (
                        <label className="checkbox-label" key={index}>
                            <input value={item} className="checkbox-filter" type="checkbox" onChange={(e) => handleColorFilter(e)} />
                            <span>{item}</span>
                        </label>
                    )
                }) : colors.map((item, index) => {
                    return (
                        <label className="checkbox-label" key={index}>
                            <input value={item} className="checkbox-filter" type="checkbox" onChange={(e) => handleColorFilter(e)} />
                            <span>{item}</span>
                        </label>
                    )
                })}
                {showAllColors ? <button className="btn-more-colors" onClick={() => setShowAllColors(oldBool => !oldBool)}>
                    Ver menos cores <img src="https://img.icons8.com/ios-glyphs/15/808080/chevron-up.png" />
                </button> : <button className="btn-more-colors" onClick={() => setShowAllColors(oldBool => !oldBool)}>
                    Ver todas as cores <img src="https://img.icons8.com/ios-glyphs/15/808080/chevron-down.png" />
                </button>}
            </div>
            <div className="sizes-filter">
                <label className="filter-label">TAMANHOS</label>
                <div className="btn-size-area">
                    {sizes.map((item, index) => {
                        return (
                            <button key={index} className={sizeSelect.includes(item) ? "btn-size-selected" : "btn-size-unselected"}
                                onClick={() => {
                                    handleSizeFilter(item)
                                    handleSelectSize(item)
                                }}>
                                {item}
                            </button>
                        )
                    })}
                </div>
            </div>
            <div className="prices-filter">
                <label className="filter-label">FAIXA DE PREÇO</label>

                <label className="checkbox-label">
                    <input value="50" className="checkbox-filter" type="checkbox" onClick={(e) => handlePriceFilter(e)} />
                    <span>de R$ 0 até R$50</span>
                </label >
                <label className="checkbox-label">
                    <input value="51" className="checkbox-filter" type="checkbox" onClick={(e) => handlePriceFilter(e)} />
                    <span>de R$ 51 até R$150</span>
                </label >
                <label className="checkbox-label">
                    <input value="151" className="checkbox-filter" type="checkbox" onClick={(e) => handlePriceFilter(e)} />
                    <span>de R$ 151 até R$300</span>
                </label >
                <label className="checkbox-label">
                    <input value="301" className="checkbox-filter" type="checkbox" onClick={(e) => handlePriceFilter(e)} />
                    <span>de R$ 301 até R$500</span>
                </label >
                <label className="checkbox-label">
                    <input value="501" className="checkbox-filter" type="checkbox" onClick={(e) => handlePriceFilter(e)} />
                    <span>a partir de R$501</span>
                </label >
            </div>
        </div>
    )
}

export default ProductsFilters;