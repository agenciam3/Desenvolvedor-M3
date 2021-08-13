import './styles.css'
import { useState } from 'react'

const ProductsFilters = ({ allColors, colors, list }) => {
    const [showAllColors, setShowAllColors] = useState(false)
    const [sizeSelect, setSizeSelect] = useState([])
    const sizes = ["P", "M", "G", "GG", "U", "36", "38", "40", "42", "44", "46"]

    return (
        <>
            <div className="color-filter">
                <label className="filter-label">CORES</label>
                {showAllColors ? allColors.map((item, index) => {
                    return (
                        <label className="checkbox-label" key={index}>
                            <input className="checkbox-filter" type="checkbox" />
                            <span>{item}</span>
                        </label>
                    )
                }) : colors.map((item, index) => {
                    return (
                        <label className="checkbox-label" key={index}>
                            <input className="checkbox-filter" type="checkbox" />
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
                                    sizeSelect.includes(item) ? setSizeSelect([]) : setSizeSelect(oldList => [...oldList, item])

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
                    <input className="checkbox-filter" type="checkbox" />
                    <span>de R$ 0 até R$50</span>
                </label >
                <label className="checkbox-label">
                    <input className="checkbox-filter" type="checkbox" />
                    <span>de R$ 51 até R$150</span>
                </label >
                <label className="checkbox-label">
                    <input className="checkbox-filter" type="checkbox" />
                    <span>de R$ 151 até R$300</span>
                </label >
                <label className="checkbox-label">
                    <input className="checkbox-filter" type="checkbox" />
                    <span>de R$ 301 até R$500</span>
                </label >
                <label className="checkbox-label">
                    <input className="checkbox-filter" type="checkbox" />
                    <span>a partir de R$501</span>
                </label >
            </div>
        </>
    )
}

export default ProductsFilters;