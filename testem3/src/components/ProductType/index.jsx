import { useState } from "react"
import './styles.css'

const ProductType = ({ handleOrganize, setShowFilter }) => {
    const [showOrderBy, setShowOrderBy] = useState(false)
    if (!showOrderBy) {
        return (
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
                    <button className="btn-filter-mobile" onClick={() => setShowOrderBy(oldBool => !oldBool)}>ORDENAR</button>
                </div>
            </div>
        )

    }
    return (

        <div className="modal-organize-mobile">
            <div className="mobile-filters-header">

                <span className="filter-title">ORDENAR</span>

                <button className="close-filters" onClick={() => setShowOrderBy(oldBool => !oldBool)}>
                    <span className="filter-title">X</span>
                </button>
            </div>
            <div className="organize-by-mobile">
                <option className="organize-options" onClick={(e) => {
                    setShowOrderBy(oldBool => !oldBool)
                    handleOrganize(e)
                }}
                    value="lower">Menor Valor</option>
                <option className="organize-options" onClick={(e) => {
                    setShowOrderBy(oldBool => !oldBool)
                    handleOrganize(e)
                }} value="highest">Maior Valor</option>
                <option className="organize-options" onClick={(e) => {
                    setShowOrderBy(oldBool => !oldBool)
                    handleOrganize(e)
                }} value="date">Mais recentes</option>
            </div>
        </div >

    )
}

export default ProductType