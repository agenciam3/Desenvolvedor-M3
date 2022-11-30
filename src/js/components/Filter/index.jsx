const Checkbox = require("../Checkbox/index.jsx");

const Filter = () => {
  return (
    <div className="col-filter">
      <h2>Cores</h2>
      <div className="checkbox-wrapper">
        <form action="/">
          <div>
            <Checkbox name={"Amarelo"} value={true} />
            <Checkbox name={"Azul"} value={true} />
            <Checkbox name={"Branco"} value={true} />
            <Checkbox name={"Cinza"} value={true} />
            <Checkbox name={"Laranja"} value={true} />
            <Checkbox name={"Preto"} value={true} />
          </div>
          <div className="button-text">
            <button id="submit" type="submit">
              Ver todas as cores
              <svg
                width="9"
                height="7"
                viewBox="0 0 9 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L4.5 6L8 1.00519"
                  stroke="#666666"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>

          <div class="size-filter-title">
            <h2>Tamanhos</h2>
          </div>

          <div class="amount-filter">
            <h2>Faixa de preço</h2>
          </div>
        </form>
      </div>
    </div>
  );
};

module.exports = Filter;
