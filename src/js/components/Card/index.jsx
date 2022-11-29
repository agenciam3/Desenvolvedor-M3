const Card = ({image, name, price, installment, installmentValue, onBuy}) => {
  return (
    <div className="card">
      <div className="card-media">
        <img id="card-image" src={image} />
      </div>
      <div className="card-content">
        <div className="card-product">
          <span className="card-product-title">{name}</span>
        </div>
        <div className="card-prices">
          <strong id="card-price-amount">R$ {price}</strong>
          <br />
          <span id="card-price-installment">até {installment}x de R$ {installmentValue}</span>
        </div>
        <div className="card-button">
          <button id="card-button-buy" onClick={onBuy}>Comprar</button>
        </div>
      </div>
    </div>
  );
};

module.exports = Card;
