import { formatPrice } from "../utils/formatPrice";
import WarningHandler from "./WarningHandler";

class CartHandler {
  static cart = [];

  static showInCart() {
    if (this.cart.length > 0) {
      const cartBody = document.querySelector(".cart__body");
      cartBody.innerText = "";

      this.cart.forEach((product) => {
        const itemCart = this.buildCartProduct(product);

        cartBody.append(itemCart);
      });
    }
  }

  static buildCartProduct(product) {
    const itemCart = document.createElement("article");
    const itemCartImage = this.createItemCartImage(product);
    const itemCartInfo = this.createItemCartInfo(product);
    const itemCartDelete = this.createItemCartDelete(product);

    itemCart.classList.add("itemCart");

    itemCart.append(itemCartImage, itemCartInfo, itemCartDelete);

    return itemCart;
  }

  static createItemCartImage(product) {
    const itemCartImage = document.createElement("section");
    const image = document.createElement("img");

    itemCartImage.classList.add("itemCart__image");
    image.src = product.image;
    image.alt = product.name;

    itemCartImage.append(image);

    return itemCartImage;
  }

  static createItemCartInfo(product) {
    const itemCartInfo = document.createElement("section");
    const title = document.createElement("h4");
    const size = document.createElement("p");
    const price = document.createElement("span");

    itemCartInfo.classList.add("itemCart__info");
    title.classList.add("itemCart__title");
    title.innerText = product.name;
    size.classList.add("itemCart__size");
    size.innerText = product.size.join(" | ");
    price.classList.add("itemCart__price");
    price.innerText = formatPrice(product.price);

    itemCartInfo.append(title, size, price);

    return itemCartInfo;
  }

  static createItemCartDelete(product) {
    const itemCartDelete = document.createElement("section");
    const itemCartQtArea = document.createElement("div");
    const itemCartBtn = document.createElement("button");

    const itemCartQtMenos = document.createElement("button");
    const itemCartItemQt = document.createElement("div");
    const itemCartQtMais = document.createElement("button");

    const imageBtn = document.createElement("img");

    itemCartDelete.classList.add("itemCart__delete");
    itemCartQtArea.classList.add("itemCart__QtArea");
    itemCartBtn.classList.add("itemCart__btn");

    itemCartQtMenos.classList.add("itemCart__qtmenos");
    itemCartQtMenos.innerText = "-";
    itemCartQtMenos.addEventListener("click", () => {
      this.decreaseInCart(product);
    });
    itemCartItemQt.classList.add("itemCart__ItemQt");
    itemCartItemQt.innerText = product.quantity;
    itemCartQtMais.classList.add("itemCart__qtmais");
    itemCartQtMais.innerText = "+";
    itemCartQtMais.addEventListener("click", () => {
      this.increaseInCart(product);
    });

    imageBtn.src = "./img/trash.png";
    imageBtn.alt = "trash image";

    imageBtn.addEventListener("click", () => {
      this.removeFromCart(product);
    });

    itemCartQtArea.append(itemCartQtMenos, itemCartItemQt, itemCartQtMais);
    itemCartBtn.append(imageBtn);

    itemCartDelete.append(itemCartQtArea, itemCartBtn);

    return itemCartDelete;
  }

  static addToCart(product) {
    if (this.cart.findIndex((item) => item.id === product.id) === -1) {
      product.quantity = 1;
      this.cart.push(product);

      WarningHandler.clearWarnings();
      WarningHandler.showWarning("Produto Adicionado!");
      this.updateCart();
    } else {
      this.increaseInCart(product);
    }
  }

  static removeFromCart(product) {
    const index = this.cart.findIndex((item) => item.id === product.id);

    this.cart.splice(index, 1);

    if (this.cart.length === 0) {
      this.closeCart();
    }

    this.updateCart();
  }

  static updateCart() {
    this.showInCart();

    const htmlQuantity = document.querySelector(".quantity__value");
    const cartIconCircle = document.querySelector(".cart-icon__circle");
    const quantity = this.cart.reduce((acc, { quantity }) => acc + quantity, 0);
    htmlQuantity.innerText = `${quantity}`;
    cartIconCircle.innerText = `${quantity}`;

    const htmlTotal = document.querySelector(".total__value");
    const total = this.cart.reduce((acc, { quantity, price }) => {
      const totalPrice = quantity * price;

      return acc + totalPrice;
    }, 0);

    htmlTotal.innerText = `${formatPrice(total)}`;
  }

  static increaseInCart(product) {
    const index = this.cart.findIndex((item) => item.id === product.id);
    this.cart[index].quantity++;

    this.updateCart();
  }

  static decreaseInCart(product) {
    const index = this.cart.findIndex((item) => item.id === product.id);
    this.cart[index].quantity--;

    if (this.cart[index].quantity === 0) {
      this.removeFromCart(product);
    }

    this.updateCart();
  }

  static animateExitCartFromScreen() {
    const keyframe = [
      {
        opacity: 1,
        transform: "translate3d(0,0,0)",
      },
      {
        opacity: 0,
        transform: "translate3d(0,-50px,0)",
      },
    ];

    const options = {
      duration: 500,
      iterations: 1,
    };

    const cart = document.querySelector(".cart");

    cart.animate(keyframe, options);
  }

  static openCart() {
    if (this.cart.length > 0) {
      const aside = document.querySelector("aside");
      aside.classList.add("openAside");
    } else {
      WarningHandler.clearWarnings();
      WarningHandler.showWarning("Adicione algo ao carrinho");
    }
  }

  static closeCart() {
    const aside = document.querySelector("aside");

    this.animateExitCartFromScreen();

    setTimeout(() => {
      aside.classList.remove("openAside");
    }, 450);
  }
}

export default CartHandler;
