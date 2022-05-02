const orderMenu = `
  <section class="menu-container">
    <div class="menu-header">
      <h1>Ordenar</h1>
    </div>
    <button>Mais recente</button>
    <button>Maior preço</button>
    <button>Menor preço</button>
  </section>
`;

function openOrderMenu() {
  const orderMenuSection = document.createElement('section');

  orderMenuSection.innerHTML = orderMenu;

  const mainElement = document.getElementById('main');

  mainElement.appendChild(orderMenuSection);
}

function handleOrderButton() {
  const orderButton = document.getElementById('order-button');

  orderButton.addEventListener('click', openOrderMenu);
}

export default handleOrderButton;
