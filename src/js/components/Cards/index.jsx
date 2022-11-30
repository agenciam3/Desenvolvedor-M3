const Card = require("../Card/index.jsx");
const Filter = require("../Filter/index.jsx");

const Cards = ({ cards }) => {
  console.log("cards", cards);
  return (
    <div className="page">
      <div className="section-order">
        <div>
          <h1>Blusas</h1>
        </div>
        <div className="section-order-by">
          <select id="orderby" name="orderby">
            <option value="">Ordenar por:</option>
            <svg
              className="svg"
              width="14"
              height="11"
              viewBox="0 0 14 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L7 10L13 1.00935"
                stroke="#666666"
                stroke-linecap="round"
              />
            </svg>
            <option value="recentes">Mais recentes</option>
            <option value="nenor">Menor preço</option>
            <option value="maior">Maior preço</option>
          </select>
        </div>
      </div>
      <div className="section-cards">
        <Filter />
        <div className="col-cards">
          <div className="row-cards">
            {cards &&
              cards.map((card, idx) => {
                return (
                  <div key={idx} className="col-card">
                    <Card
                      image={card.image}
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
