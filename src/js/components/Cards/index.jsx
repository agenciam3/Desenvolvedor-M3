const Card = require("../Card/index.jsx");
const Filter = require("../Filter/index.jsx");
const Modal = require("../Modal/index.jsx");

const Cards = ({ cards }) => {
  const [modal, setModal] = React.useState({
    open: false,
    content: "",
  });
  console.log("modal", modal);

  console.log("cards", cards);
  return (
    <div className="page">
      <div className="section-order">
        <div className="section-order-title">
          <h1>Blusas</h1>
        </div>
        {modal.open && (
          <Modal
            title={modal.content}
            onClose={() =>
              setModal({
                open: false,
                content: "",
              })
            }
          >
            {modal.content === "filtrar" && <div>filtro</div>}

            {modal.content === "ordernar" && (
              <>
                <div className="modal-container-button">
                  <button className="modal-order-button">Mais recente</button>
                </div>
                <div className="modal-container-button">
                  <button className="modal-order-button">Maior preço</button>
                </div>
                <div className="modal-container-button">
                  <button className="modal-order-button">Menor preço</button>
                </div>
              </>
            )}
          </Modal>
        )}
        <div className="button-responsive-filters">
          <div className="col-tab">
            <button
              onClick={() =>
                setModal({
                  open: true,
                  content: "filtrar",
                })
              }
              className="tab"
            >
              Filtrar
            </button>
          </div>

          <div>
            <div className="divider-tab" />
          </div>

          <div className="col-tab">
            <button
              onClick={() =>
                setModal({
                  open: true,
                  content: "ordernar",
                })
              }
              className="tab"
            >
              Ordernar
            </button>
          </div>
        </div>

        <div className="section-order-by">
          <select id="orderby" name="orderby">
            <option value="">Ordenar por:</option>
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
