export default function setProducts(lista) {
  const prodContainer = document.querySelector(".products");
  lista.map(item => {
    const prod = document.createElement("div");
    prod.classList.add("prod-card");

    const prodImg = document.createElement('img');
    prodImg.setAttribute("src", item.image);
    prod.appendChild(prodImg);

    const prodName = document.createElement("h4");
    prodName.classList.add("prod-name");
    prodName.innerHTML = item.name;
    prod.appendChild(prodName);

    const prodPrice = document.createElement("h4");
    prodPrice.classList.add("prod-price");
    prodPrice.innerHTML = `R$ ${item.price}`;
    prod.appendChild(prodPrice);

    const prodInstallments = document.createElement("h4");
    prodInstallments.classList.add("prod-install");
    prodInstallments.innerHTML = `até ${item.parcelamento[0]}x de ${item.parcelamento[1]}`;
    prod.appendChild(prodInstallments);

    const buyBtn = document.createElement("button");
    buyBtn.addEventListener("click", function (e) {
      e.preventDefault();
    });
    buyBtn.classList.add("buy-btn");
    buyBtn.setAttribute("type", "button");
    buyBtn.innerHTML = "COMPRAR";
    prod.appendChild(buyBtn);

    prodContainer.appendChild(prod);
  })
}