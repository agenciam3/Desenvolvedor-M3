import { useState } from "react"

const DesktopFilters = ({ allColors, handleColorFilter, handleSizeFilter, handlePriceFilter, sizes, sizeFilter, colorFilter, priceFilter }) => {
    const [showAllColors, setShowAllColors] = useState(false)
    return (
        <div className={`filter-container-desktop`}>
            <div className="color-filter">
                <label className="filter-label">CORES</label>
                {allColors.map((item, index) => {
                    if (index >= 5 && !showAllColors) {
                        return <div key={index}></div>
                    }
                    return (
                        <label className="checkbox-label" key={index}>
                            <input type="checkbox" value={item} className={`checkbox-filter ${colorFilter.includes(item) && "active"}`} onClick={() => handleColorFilter(item)} />
                            <span>{item}</span>
                        </label>
                    )
                })}
                <button className="btn-more-colors" onClick={() => setShowAllColors(oldBool => !oldBool)}>
                    {showAllColors ? "Ver menos cores " : "Ver mais cores"} <img alt="colors-icon" className={`colors-icon ${!showAllColors && "active"}`} src="https://img.icons8.com/ios-glyphs/15/808080/chevron-up.png" />
                </button>
            </div>
            <div className="sizes-filter">
                <label className="filter-label">TAMANHOS</label>
                <div className="btn-size-area">
                    {sizes.map((item, index) => {
                        return (
                            <button key={index} className={sizeFilter.includes(item) ? "btn-size-selected" : "btn-size-unselected"}
                                onClick={() => {
                                    handleSizeFilter(item)
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
                    <input value="50" className={`checkbox-filter ${priceFilter.includes('50') && "active"}`} type="checkbox" onClick={(e) => handlePriceFilter(e)} />
                    <span>de R$ 0 até R$50</span>
                </label >
                <label className="checkbox-label">
                    <input value="51" className={`checkbox-filter ${priceFilter.includes('51') && "active"}`} type="checkbox" onClick={(e) => handlePriceFilter(e)} />
                    <span>de R$ 51 até R$150</span>
                </label >
                <label className="checkbox-label">
                    <input value="151" className={`checkbox-filter ${priceFilter.includes('151') && "active"}`} type="checkbox" onClick={(e) => handlePriceFilter(e)} />
                    <span>de R$ 151 até R$300</span>
                </label >
                <label className="checkbox-label">
                    <input value="301" className={`checkbox-filter ${priceFilter.includes('301') && "active"}`} type="checkbox" onClick={(e) => handlePriceFilter(e)} />
                    <span>de R$ 301 até R$500</span>
                </label >
                <label className="checkbox-label">
                    <input value="501" className={`checkbox-filter ${priceFilter.includes('501') && "active"}`} type="checkbox" onClick={(e) => handlePriceFilter(e)} />
                    <span>a partir de R$501</span>
                </label >
            </div>
        </div>
    )
}

export default DesktopFilters;