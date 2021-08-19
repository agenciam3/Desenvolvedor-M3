import './styles.css'

const ProductCard = ({ item, setCart, setShowFeedback }) => {

    const handleAddCart = () => {
        setShowFeedback(oldBool => !oldBool)
        setTimeout(() => setShowFeedback(oldBool => !oldBool), 2000)
        setCart(oldCart => [...oldCart, item])
    }

    return (
        <li className="single-card">
            <img className="product-img" src={item.img} alt="product-img" />
            <span className="product-name">{item.name.toLocaleUpperCase()}</span>
            <div className="price-area">
                <span className="full-price">R${item.price}</span>
                <span>até {item.installment} de R$ {(parseFloat(item.price) / item.installment).toFixed(2)}</span>
            </div>
            <button className="btn-addCart" onClick={() => handleAddCart()}>COMPRAR</button>
        </li>
    )
}

export default ProductCard;