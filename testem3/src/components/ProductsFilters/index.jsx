import './styles.css'
import { useState, useEffect } from 'react'
import MobileFilters from './MobileFilters'
import DesktopFilters from './DesktopFilters'

const ProductsFilters = ({ allColors, filterList, setFilterList, list, showFilter, setShowFilter }) => {
    const [colorFilter, setColorFilter] = useState([])
    const [sizeFilter, setSizeFilter] = useState([])
    const [priceFilter, setPriceFilter] = useState([])
    const sizes = ["P", "M", "G", "GG", "U", "36", "38", "40", "42", "44", "46"]


    useEffect(() => {

        let newFilters = []
        if (colorFilter.length === 0) {
            newFilters = list
        } else {
            newFilters = list.filter(value => colorFilter.includes(value.color))
        }
        if (sizeFilter.length !== 0) {
            newFilters = newFilters.filter(value => sizeFilter.includes(value.size))
        }
        if (priceFilter.length !== 0) {
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
        if (filterList.length === 0 && sizeFilter.length !== 0) {
            setFilterList(list)
        }
        setFilterList(newFilters)
    }, [colorFilter.length, sizeFilter.length, priceFilter.length, colorFilter, filterList.length, list, setFilterList, sizeFilter, priceFilter])

    const handleColorFilter = (colorCheck) => {
        let newArr = []
        if (colorFilter.includes(colorCheck)) {
            newArr = colorFilter.filter((color) => colorCheck !== color)
            setColorFilter(newArr)
        } else {
            setColorFilter(oldList => [...oldList, colorCheck])
        }
    }

    const handleSizeFilter = (newSize) => {

        let newArr = []
        if (sizeFilter.includes(newSize)) {
            newArr = sizeFilter.filter((size) => newSize !== size)
            setSizeFilter(newArr)
        } else {
            setSizeFilter(oldList => [...oldList, newSize])
        }
    }

    const handlePriceFilter = (e) => {
        let price = e.target.value
        let newArr = []
        if (priceFilter.includes(price)) {
            newArr = priceFilter.filter((newPrice) => price !== newPrice)
            setPriceFilter(newArr)
        } else {
            setPriceFilter(oldList => [...oldList, price])
        }
    }

    if (!showFilter) {
        return (
            <DesktopFilters
                allColors={allColors}
                setShowFilter={setShowFilter}
                handleColorFilter={handleColorFilter}
                handleSizeFilter={handleSizeFilter}
                handlePriceFilter={handlePriceFilter}
                sizes={sizes}
                sizeFilter={sizeFilter}
                colorFilter={colorFilter}
                priceFilter={priceFilter}

            />
        )
    }
    return (
        <MobileFilters
            allColors={allColors}
            setShowFilter={setShowFilter}
            handleColorFilter={handleColorFilter}
            handleSizeFilter={handleSizeFilter}
            handlePriceFilter={handlePriceFilter}
            sizes={sizes}
            sizeFilter={sizeFilter}
            setSizeFilter={setSizeFilter}
            colorFilter={colorFilter}
            setColorFilter={setColorFilter}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
        />
    )
}

export default ProductsFilters;