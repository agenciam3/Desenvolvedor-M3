const Card = ({name, price, installment, installmentValue, onBuy}) => {
  return (
    <div class="card">
      <div class="card-media">
        <img id="card-image" src="./img/img_2.png" />
      </div>
      <div class="card-content">
        <div class="card-product">
          <span class="card-product-title">{name}</span>
        </div>
        <div class="card-prices">
          <strong id="card-price-amount">R$ {price}</strong>
          <br />
          <span id="card-price-installment">até {installment}x de R$ {installmentValue}</span>
        </div>
        <div class="card-button">
          <button id="card-button-buy" onClick={onBuy}>Comprar</button>
        </div>
      </div>
    </div>
  );
};

module.exports = Card;
