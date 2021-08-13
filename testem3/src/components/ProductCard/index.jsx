import './styles.css'

const ProductCard = ({ item }) => {
    return (
        <div key={item.id} className="single-card">
            <img src={item.img} />
            <span>{item.name.toLocaleUpperCase()}</span>
            <div className="price-area">
                <span className="full-price">R${item.price}</span>
                <span>até {item.installment} de R$ {(parseFloat(item.price) / item.installment).toFixed(2)}</span>
            </div>
            <button className="btn-addCart">COMPRAR</button>
        </div>
    )
}

export default ProductCard;