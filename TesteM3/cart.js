//shopping cart
var shoppingCart = (function () {
    cart = [];

    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }

    function Item(id, code, name, price, image, count) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.price = price;
        this.image = image
        this.count = count;
    }
    var obj = {};
    //adiciona item ao carrinho
    obj.addItemToCart = function (id, code, name, price, image, count) {
        for (var item in cart) {
            if (cart[item].id === id) {
                cart[item].count++;
                saveCart();
                return;
            }
        }
        var item = new Item(id, code, name, price, image, count);
        cart.push(item);
        saveCart();
    }
    //muda quantidade de itens no carrinho
    obj.setCountForItem = function (id, count) {
        for (var i in cart) {
            if (cart[i].id === id) {
                cart[i].count += count;
                if (cart[i].count <= 0) {
                    obj.removeItemFromCartAll(cart[i].id);
                }
                break;
            }
        }
        saveCart();
    };
    //remove uuma quantidade do item do carrinho
    obj.removeItemFromCart = function (id) {
        for (var item in cart) {
            if (cart[item].id === id) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }
    //remove um item todo do carrinho independente da quantidade
    obj.removeItemFromCartAll = function (id) {
        for (var item in cart) {
            if (cart[item].id === id) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }
    // remove todos os itens do carriho
    obj.clearCart = function () {
        cart = [];
        saveCart();
    }
    //conta a quantidade total de itens*quantidadeItem
    obj.totalCount = function () {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }
    //preço total do carrinho
    obj.totalCart = function () {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }
    //listar o carrinho, cria um carrinho copia para exibir pois o carrinho é privado   
    obj.listCart = function () {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }
    // cart : array
    // item : object/class
    // addItemToCart : funcao
    // setCountForItem : funcao
    // removeItemFromCart : funcao
    // removeItemFromCartAll : funcao
    // clearCart : funcao
    // countCart : funcao
    // totalCart : funcao
    // listCart : funcao
    // saveCart : funcao
    // loadCart : funcao
    return obj;

})();

// // eventos
// 0 = adiciona ao carrinho
// 1 = diminui a quantidade do item no carrinho
// 2 = remove o item inteiro do carrinho
// 3 = muda a quantidade do item
// 4 = limpa o carrinho

function cartControl(idProduto, operation, newCount) {
    loadJSON(function (response) {
        var data = JSON.parse(response);

        function getProduto(idProduto) {
            for (i in data) {
                if (data[i].id == idProduto) {
                    return data[i];
                }
            }
        }
        temp = getProduto(idProduto);

        switch (operation) {
            case '0':
                shoppingCart.addItemToCart(temp.id, temp.code, temp.name, temp.price, temp.image, 1);

                break;
            case '1':
                shoppingCart.removeItemFromCart(temp.id);
                break;
            case '2':
                shoppingCart.removeItemFromCartAll(temp.id);
                break;
            case '3':
                shoppingCart.setCountForItem(temp.id, newCount);
                break;
            case '4':
                shoppingCart.clearCart();
                break;
        }
        document.getElementById("cartList").classList.add("showCart");
        document.getElementById("cartList").innerHTML = "";
        displayCart();
    })
};

function slideDownCart() {
    var cartDown = document.getElementById("cartList");
    if (cartDown.classList.contains("showCart")) {
        cartDown.classList.remove("showCart")
        document.getElementById("cartList").innerHTML = "";

    } else {
        cartDown.classList.add("showCart");
        displayCart();
    }
}
// apaga os produtos do HTML para isnerir os novos filtrados
function eraseProducts() {
    var x = document.getElementById("product");
    x.innerHTML = "";

}
var p = 0;