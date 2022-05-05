import { appendById, createElementWithClass, lockUnlockScroll } from "./module_helpers"

export function displayCart(){
  let div = document.createElement('div')
  div.innerHTML = `  <section id="cart">
                      <div class="container cart-container">
                        <header>
                          <p>Carrinho</p>
                          <i class="fa-solid fa-xmark close-window"></i>
                        </header>
                        <section id="items">

                        </section>
                        <footer>
                          <div class="items-total">

                          </div>
                          <div class="checkout">
                            FINALIZAR COMPRA
                          </div>
                        </footer>
                      </div>
                    </section>`
  let body = document.querySelector('body')
  body.appendChild(div)
  lockUnlockScroll();

  let closeCartButton =  document.querySelector('.close-window')
  closeCartButton.addEventListener("click", function () { closeCart(div) })
}

export function closeCart(div){
  div.remove()
  lockUnlockScroll()
}

export function addToCart(buyButton, cart){
  let id = parseInt(buyButton.parentElement.querySelector('.product-id').innerText)

  if (cart.get(id) === undefined) {
    cart.set(id, {amt: 1})
  }
  else{
    cart.get(id).amt++
  }

  updateItemsCounter(cart);
}

export function listCartItems(cart, catalog) {
  let total = 0.00

  cart.forEach((item, id) => {
    let div = createElementWithClass('div', 'item');
    div.innerHTML= `
      <i class="fa-solid fa-circle-minus remove-product"></i>
      <div class="cart-product-img">

      </div>
      <div class="cart-product-info">

        <p class="cart-product-name">${catalog[id - 1].name}</p>
        <div class="prices">
          <div class="quantity">
            <div class="button take-one">
              <i class="fa-solid fa-minus"></i>
            </div>
            <div class="amount-counter">
              ${item.amt}
            </div>
            <div class="button add-one">
              <i class="fa-solid fa-plus"></i>
            </div>
          </div>
          <div class="total">
            <p>Subtotal:</p>
            <p class="price-total">R$${parseFloat((catalog[id - 1].price) * item.amt).toFixed(2)}</p>
          </div>
        </div>
      </div>
    `
    div.querySelector('.cart-product-img').style.backgroundImage = `url(${catalog[id - 1].image})`

    let addOne = div.querySelector('.add-one')
    addOne.addEventListener("click", function() { addOneProduct(id, cart, catalog) })

    let takeOne = div.querySelector('.take-one')
    takeOne.addEventListener("click", function() { takeOneProduct(id, cart, catalog) })

    let removePr = div.querySelector('.remove-product')
    removePr.addEventListener("click", function() { removeProduct(id, cart, catalog) })
    appendById(div, 'items')

    total += parseFloat(catalog[id - 1].price * item.amt)
  });

  document.querySelector('.items-total').innerText = `TOTAL:\n R$${total.toFixed(2)}`
}

function addOneProduct(id, cart, catalog) {
  cart.get(id).amt++
  updateCart(cart, catalog);
  updateItemsCounter(cart)
}

function removeProduct(id, cart, catalog) {
  cart.delete(id)
  updateCart(cart, catalog)
  updateItemsCounter(cart)

}

function takeOneProduct(id, cart, catalog) {
  cart.get(id).amt--
  if (cart.get(id).amt === 0) {
    removeProduct(id, cart, catalog)
  }
  else {
    updateCart(cart, catalog)
  }
  updateItemsCounter(cart);
}

function updateCart(cart, catalog) {
  closeCart(document.getElementById('cart'));
  displayCart();
  listCartItems(cart, catalog);
}

function updateItemsCounter(cart){
  let counter = document.querySelector('.amount-of-items')
  let total = 0
  cart.forEach((item) => {
    total += item.amt
  })

  counter.innerText = total

  if (total > 0) {
    counter.parentElement.classList.remove('d-none')
  }
  else {
    counter.parentElement.classList.add('d-none')
  }
}
