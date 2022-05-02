function closeOrderMenu() {
  const menuContainer = document.querySelector('.menu-container');

  menuContainer.parentNode.removeChild(menuContainer);
}

const orderMenu = `
  <div class="menu-header">
    <h1>Ordenar</h1>
    <button id="close-menu-button">
    </ button>
  </div>
  <button>Mais recente</button>
  <button>Maior preço</button>
  <button>Menor preço</button>
`;

function openOrderMenu() {
  const orderMenuSection = document.createElement('section');

  orderMenuSection.innerHTML = orderMenu;
  orderMenuSection.className = 'menu-container';

  const mainElement = document.getElementById('main');

  mainElement.appendChild(orderMenuSection);

  const closeMenuButton = document.getElementById('close-menu-button');

  closeMenuButton.addEventListener('click', closeOrderMenu);
}

function handleOrderButton() {
  const orderButton = document.getElementById('order-button');

  orderButton.addEventListener('click', openOrderMenu);
}

export default handleOrderButton;
