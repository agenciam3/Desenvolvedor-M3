let priceStart = ['0', '51', '151', '301', '501'];
let priceValue = [[0, 50], [51, 150], [151, 300], [301, 500], [501, 9999]]
let priceLabel = ['de R$0 até R$50', 'de R$51 até R$150', 'de R$151 até R$300', 'de R$301 até R$500', 'a partir de R$501'];

let price = document.getElementById('prices');

for(let i in priceLabel) {
  price.innerHTML += `
    <div class="radio">
      <input type="radio" name="price" value="${priceValue[i]}" id="${priceStart[i]}">
      <label for="${priceStart[i]}">${priceLabel[i]}</label>
    </div>
  `;
}