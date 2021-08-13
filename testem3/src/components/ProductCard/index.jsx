import './styles.css'

const ProductCard = ({ item }) => {
    return (
        <div key={item.id} className="single-card">
            {/* <image source={item.img}/> */}
            <span>{item.name.toLocaleUpperCase()}</span>
            <span>R${item.price}</span>
            <span>até {item.installment} de R$ {(parseFloat(item.price) / item.installment).toFixed(2)}</span>
            <button>Comprar</button>
        </div>
    )
}

export default ProductCard;