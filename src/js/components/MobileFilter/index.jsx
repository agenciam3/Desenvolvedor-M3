const Checkbox = require("../Checkbox/index.jsx");
const SizeField = require("../SizeField/index.jsx");

const MobileFilter = () => {
  return (
    <div className="filter-modal-mobile">
      <div>
        <button className="modal-form-option">
          <div>
            <span>Cores</span>
          </div>
          <div>
            <svg
              width="20"
              height="15"
              viewBox="0 0 20 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L10 14L19 1.0135"
                stroke="#666666"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </button>
      </div>

      <div className="filter-modal-form">
        <form>
          <div className="filter-modal-form-colors">
            <Checkbox name={"Amarelo"} value={"true"} />
            <Checkbox name={"Azul"} value={"true"} />
            <Checkbox name={"Branco"} value={"true"} />
            <Checkbox name={"Cinza"} value={"true"} />
            <Checkbox name={"Laranja"} value={"true"} />
            <Checkbox name={"Preto"} value={"true"} />
          </div>

          <div>
            <button className="modal-form-option">
              <div>
                <span>Tamanhos</span>
              </div>
              <div>
                <svg
                  width="20"
                  height="15"
                  viewBox="0 0 20 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L10 14L19 1.0135"
                    stroke="#666666"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
            </button>
          </div>

          <div className="filter-modal-form-sizes">
            <SizeField size={"P"} value={"true"} />
            <SizeField size={"M"} value={"true"} />
            <SizeField size={"G"} value={"true"} />
            <SizeField size={"GG"} value={"true"} />
            <SizeField size={"U"} value={"true"} />
            <SizeField size={"36"} value={"true"} />
            <SizeField size={"38"} value={"true"} />
            <SizeField size={"40"} value={"true"} />
            <SizeField size={"36"} value={"true"} />
            <SizeField size={"38"} value={"true"} />
            <SizeField size={"40"} value={"true"} />
          </div>

          <div>
            <button className="modal-form-option">
              <div>
                <span>Faixa de preços</span>
              </div>
              <div>
                <svg
                  width="20"
                  height="15"
                  viewBox="0 0 20 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L10 14L19 1.0135"
                    stroke="#666666"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
            </button>
          </div>

          <div className="filter-modal-form-prices">
            <Checkbox name={"de R$0 até R$50"} value={"true"} />
            <Checkbox name={"de R$51 até R$150"} value={"true"} />
            <Checkbox name={"de R$151 até R$300"} value={"true"} />
            <Checkbox name={"de R$301 até R$500"} value={"true"} />
            <Checkbox name={"a partir de R$ 500"} value={"true"} />
          </div>

          <div className="modal-filter-buttons">
            <button className="modal-filter-button-apply">Aplicar</button>
            <button className="modal-filter-button-cancel">Limpar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

module.exports = MobileFilter;
