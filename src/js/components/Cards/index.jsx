const Card = require("../Card/index.jsx");

const Cards = ({ cards }) => {
  console.log("cards", cards);
  return (
    <div class="page">
      <div class="section-cards">
        <div class="col-filter">1</div>
        <div class="col-cards">
          <div class="row-cards">
            {cards &&
              cards.map((card, idx) => {
                return (
                  <div key={idx} class="col-card">
                    <Card
                      name={card.name}
                      price={card.price}
                      installment={card.parcelamento[0]}
                      installmentValue={card.parcelamento[1]}
                      onBuy={() => alert("Comprei" + JSON.stringify(card))}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

module.exports = Cards;
