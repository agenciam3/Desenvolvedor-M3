let colorsValue = ['yellow', 'blue', 'white', 'gray', 'orange', 'black', 'pink', 'green', 'red', 'burgundy'];
let colorsName = ['Amarelo', 'Azul', 'Branco', 'Cinza', 'Laranja', 'Preto', 'Rosa', 'Verde', 'Vermelho', 'Vinho'];

let color = document.getElementById('colors');

for(let i in colorsValue) {
  color.innerHTML += `
    <div class="radio">
      <input type="radio" name="color" value="${colorsValue[i]}" id="${colorsValue[i]}">
      <label for="${colorsValue[i]}">${colorsName[i]}</label>
    </div>
  `;

  if(colorsValue[i] === 'orange') {
    color.innerHTML += `
      <div class="rest-color" id="see-all-colors"></div>
    `;
    color = document.getElementById('see-all-colors');
  }
}

color = document.getElementById('colors');

color.innerHTML += `
  <button class="see-all-btn" id="see-all-btn">Ver todas as cores <i class="fas fa-chevron-down"></i></button>
`;