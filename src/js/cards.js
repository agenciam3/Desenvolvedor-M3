const createdCard = (products, cards) => {
    cards.innerHTML = "";
    for (let product of products) {
        const card = createCard(product);
        cards.appendChild(card);
    }

    return cards;
};

const createCard = (product) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = createImgCard(product.image);
    const title = createTitleCard(product.name);
    const price = createPriceCard(product.price);
    const installment = createInstallmentCard(product.parcelamento);
    const btn = createBtnCard();

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(installment);
    card.appendChild(btn);

    return card;
};

const createImgCard = (product) => {
    const img = document.createElement("img");
    img.classList.add("card-img");
    img.setAttribute("src", product);

    return img;
};

const createTitleCard = (product) => {
    const title = document.createElement("span");
    title.classList.add("card-title");
    title.innerText = product;

    return title;
};

const createPriceCard = (product) => {
    const price = document.createElement("span");
    price.classList.add("card-price");
    price.innerText = product % 1 === 0 ? `R$ ${product}.0` : `R$ ${product}`;

    return price;
};

const createInstallmentCard = (product) => {
    const installment = document.createElement("span");
    installment.classList.add("card-installment");

    const installmentAmount =
        product[1] % 1 === 0 ? `${product[1]}.00` : product[1];

    installment.innerText = `até ${product[0]}x de R$ ${installmentAmount}`;

    return installment;
};

const createBtnCard = () => {
    const btn = document.createElement("button");
    btn.classList.add("card-btn");
    btn.innerText = "COMPRAR";

    handleAmountBag(btn);
    return btn;
};

const bag = document.querySelector(".amount-bag");
let qtd = parseInt(bag.textContent);

export const handleAmountBag = (btn) => {
    btn.addEventListener("click", () => {
        qtd++;
        bag.innerText = qtd;
    });
};

export default createdCard;
