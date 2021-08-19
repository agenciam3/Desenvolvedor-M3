import { useState } from "react"
import './styles.css'

const MobileFilters = ({ allColors, setShowFilter, handleColorFilter, handleSizeFilter, handlePriceFilter, sizes, sizeFilter, colorFilter, priceFilter, setPriceFilter, setColorFilter, setSizeFilter }) => {
    const [showColorsMobile, setShowColorsMobile] = useState(false)
    const [showSizesMobile, setShowSizesMobile] = useState(false)
    const [showPricesMobile, setShowPricesMobile] = useState(false)
    return (
        <div className="filter-container-mobile">
            <div>
                <div className="mobile-filters-header">

                    <span className="filter-title">FILTRAR</span>

                    <button className="close-filters" onClick={() => setShowFilter(oldBool => !oldBool)}>
                        <span className="filter-title">X</span>
                    </button>
                </div>
                <div className="color-filter-mobile">
                    <div className="filter-label">
                        <label>CORES</label>
                        <img onClick={() => setShowColorsMobile(oldBool => !oldBool)} src={`${!showColorsMobile ? 'https://img.icons8.com/material-rounded/20/000000/plus-math--v1.png' : 'https://img.icons8.com/material-rounded/20/000000/minus-math--v1.png'}`} />
                    </div>
                    {showColorsMobile &&
                        allColors.map((item, index) => {
                            return (
                                <label className="checkbox-label" key={index}>
                                    <input value={item} className={`checkbox-filter ${colorFilter.includes(item) && "active"}`} type="checkbox" onClick={() => handleColorFilter(item)} />
                                    <span>{item}</span>
                                </label>
                            )
                        })}
                </div>
                <div className="size-filter-mobile">
                    <div className="filter-label">
                        <label>TAMANHOS</label>
                        <img onClick={() => setShowSizesMobile(oldBool => !oldBool)} src={`${!showSizesMobile ? 'https://img.icons8.com/material-rounded/20/000000/plus-math--v1.png' : 'https://img.icons8.com/material-rounded/20/000000/minus-math--v1.png'}`} />
                    </div>
                    <div className="btn-size-area">
                        {showSizesMobile &&
                            sizes.map((item, index) => {
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
                <div className="prices-filter-mobile">
                    <div className="filter-label">
                        <label>FAIXA DE PREÇO</label>
                        <img onClick={() => setShowPricesMobile(oldBool => !oldBool)} src={`${!showPricesMobile ? 'https://img.icons8.com/material-rounded/20/000000/plus-math--v1.png' : 'https://img.icons8.com/material-rounded/20/000000/minus-math--v1.png'}`} />
                    </div>
                    {showPricesMobile &&
                        <div className="prices-filter">

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
                    }
                </div>
            </div>
            {(showColorsMobile || showSizesMobile || showPricesMobile) &&

                <div className="btn-area-filters">
                    <button className="btn-filters" onClick={() => setShowFilter(oldBool => !oldBool)}>APLICAR</button>
                    <button className="btn-filters" onClick={() => {
                        setSizeFilter([])
                        setPriceFilter([])
                        setColorFilter([])
                    }}>LIMPAR</button>
                </div>

            }
        </div>
    )
}
export default MobileFilters;