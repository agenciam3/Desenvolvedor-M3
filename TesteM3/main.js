function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'products.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

window.onload = function loadAll() {
    loadJSON(function (response) {
        var data = JSON.parse(response);
        display(data);

    });
}
window.onload = function () {
    load();
}

//filter


function load() {
    loadJSON(function (response) {
    var data = JSON.parse(response);
    var newData = [];

    if (filter.colors.length == 0 && filter.sizes.length == 0 && filter.prices.length == 0) {
        display(data);
        return;
    } else {
        if (filter.prices.length > 0) {
            var tempFilter = filter.getTempFilter();
            var min = Math.min.apply(null, tempFilter);
            var max = Math.max.apply(null, tempFilter);
        }

        newData = data.filter(function (obj) {
            if ((filter.colors.length < 1 || filter.colors.includes(obj.color)) &&
                (filter.sizes.length < 1 || filter.sizes.includes(obj.size)) &&
                ((filter.prices.length < 1 || obj.price >= min) && (filter.prices.length < 1 || obj.price <= max))) {
                return true;
            }
            return false;
        })
    }
    display(newData);
}
)};

function orderBtn() {
    document.getElementById("orderMenu").classList.toggle("show");
};


window.onclick = function (event) {
    if (!event.target.matches(".orderBtn")) {
        var dropdown = document.getElementById("orderMenu");

        if (dropdown.classList.contains("show")) {
            dropdown.classList.remove("show");
        }
    }

};

//printa no html
function display(data) {

    var z = 1;
    for (p in data) {

        var elementToAdd = document.createElement("div");
        elementToAdd.classList.add('products');

        var name = document.createElement("P");
        var temp = document.createTextNode(data[p].name);
        name.appendChild(temp);

        var price = document.createElement("P");
        temp = document.createTextNode("R$ " + data[p].price);
        price.appendChild(temp);

        var portionPrice = document.createElement("P");
        temp = document.createTextNode("até " + data[p].portions + " parcelas de R$ " + ((data[p].price / data[p].portions).toFixed(2)));
        portionPrice.appendChild(temp);

        var img = new Image;
        img.src = data[p].image;

        var btnComprar = document.createElement("button");
        btnComprar.dataset.idproduto = data[p].id;
        btnComprar.dataset.operation = 0;
        btnComprar.classList.add("btnComprar");
        btnComprar.innerHTML = "COMPRAR";
        btnComprar.addEventListener('click', function () {
            cartControl(this.dataset.idproduto, this.dataset.operation);
        });


        elementToAdd.appendChild(img);
        elementToAdd.appendChild(name);
        elementToAdd.appendChild(price);
        elementToAdd.appendChild(portionPrice);
        elementToAdd.appendChild(btnComprar);

        var interface = document.getElementById("product");
        interface.appendChild(elementToAdd);
        var btnCarregarMais = document.getElementById("btnCarregarMais");
        btnCarregarMais.onclick = function () {

            load();
        }

        if (z >= 9) {
            return;
        }
        z++;
    }
}

function displayCart() {
    document.getElementById("cartList").innerHTML = "";
    var cartCopy = shoppingCart.listCart();

    var cartView = document.getElementById("cartList");
    for (i in cartCopy) {

        var elementToAddToCart = document.createElement("div");

        var itemImage = new Image();
        itemImage.src = cartCopy[i].image;

        var itemName = document.createElement("span");
        var temp = document.createTextNode(cartCopy[i].name)
        itemName.classList.toggle("itemName");
        itemName.appendChild(temp);

        var divQtd = document.createElement("div");

        var btnMinusOne = document.createElement("button");
        temp = document.createTextNode("-");
        btnMinusOne.appendChild(temp);
        btnMinusOne.dataset.idproduto = cartCopy[i].id;
        btnMinusOne.dataset.operation = 1;
        btnMinusOne.classList.add("btnCart");
        btnMinusOne.addEventListener('click', function () {
            cartControl(this.dataset.idproduto, this.dataset.operation, -1);
        });

        var btnPlusOne = document.createElement("button");
        temp = document.createTextNode("+");
        btnPlusOne.appendChild(temp);
        btnPlusOne.dataset.idproduto = cartCopy[i].id;
        btnPlusOne.dataset.operation = 3;
        btnPlusOne.classList.add("btnCart");
        btnPlusOne.addEventListener('click', function () {
            cartControl(this.dataset.idproduto, this.dataset.operation, 1);
        });


        var itemQtd = document.createElement("span");
        temp = document.createTextNode(cartCopy[i].count);
        itemQtd.appendChild(temp);
        itemQtd.classList.add("itemQtd")

        divQtd.appendChild(btnMinusOne);
        divQtd.appendChild(itemQtd);
        divQtd.appendChild(btnPlusOne);


        var btnDeleteItem = document.createElement("button");
        btnDeleteItem.dataset.idproduto = cartCopy[i].id;
        btnDeleteItem.dataset.operation = 2;
        btnDeleteItem.classList.add("btnCart");
        temp = document.createTextNode("X");
        btnDeleteItem.appendChild(temp);
        btnDeleteItem.addEventListener('click', function () {
            cartControl(this.dataset.idproduto, this.dataset.operation);
        });

        var itemTotalPrice = document.createElement("span");
        var breakline = document.createElement("br");
        var totalPrice = Number(cartCopy[i].price * cartCopy[i].count).toFixed(2);
        temp = document.createTextNode("R$ " + totalPrice);
        itemTotalPrice.classList.toggle("itemTotalPrice");
        itemTotalPrice.appendChild(btnDeleteItem);
        itemTotalPrice.appendChild(breakline);
        itemTotalPrice.appendChild(temp);


        elementToAddToCart.appendChild(itemImage);
        elementToAddToCart.appendChild(itemName);
        elementToAddToCart.appendChild(divQtd);
        elementToAddToCart.appendChild(itemTotalPrice);

        elementToAddToCart.classList.add("cartItem");

        cartView.appendChild(elementToAddToCart)
    }


    var cartTotalPrice = document.createElement("p");
    var totalPrice = shoppingCart.totalCart();
    var btnClearCart = document.createElement("button");
    btnClearCart.classList.add("btnCart", "btnClearCart");
    btnClearCart.dataset.operation = 4;
    temp = document.createTextNode("Limpar Carrinho");
    btnClearCart.appendChild(temp);
    btnClearCart.addEventListener('click', function () {
        cartControl(this.dataset.idproduto, this.dataset.operation, 1);
    });


    temp = document.createTextNode("O Total do carrinho é: R$ " + totalPrice);
    cartTotalPrice.appendChild(temp);
    cartTotalPrice.classList.add("totalCart");
    cartView.appendChild(cartTotalPrice);
    cartView.appendChild(btnClearCart);

}


