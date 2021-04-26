const QTDPAGE = 6;

function renderItems(listItems, page = 1) {
    var items = "";
    var init = QTDPAGE * (page - 1);
    var final = QTDPAGE * page;

    $(".more-products").hide();

    localStorage.setItem("items", JSON.stringify(listItems));
    localStorage.setItem("page", page);

    if (listItems.length == 0) {
        renderEmpty();
        return;
    }

    if (listItems.length <= final)
        final = listItems.length;
    else
        $(".more-products").show();


    for (var i = init; i < final; i++) {
        items += renderItem(listItems[i])
    }

    if (page == 1)
        $(".items-list").html(items);
    else
        $(".items-list").append(items);

}

function renderItem(item) {
    /*Limitar Numero de item */

    return `
        <div class="item">
            <img src="${item.image}" alt="${item.name}">
            <figure class="nome-item">${item.name}</figure>
            <span class="preco">R$ ${item.price}</span>
            <span class="parcelas">até ${item.installment}x de R$ ${item.installmentValue}</span>
            <button class="buy">COMPRAR</button>
        </div>
    `;
}

function renderEmpty() {
    $(".items-list").html(`
        <div class="empty-search">
            <img src="images/empty.png" class="logo">
            <p>Não encontramos resultados para sua busca.</p>
            <button class="clear-filter">Limpar filtros</button>
        </div>
    `);
}

function addItemToBag() {
    var quantity = $(".bag-qtd").text();

    quantity++;
    $(".bag-qtd").text(quantity);

    if (quantity > 0) $(".bag-qtd").removeClass("hide");
}

function filter() {
    var colors = $(".check-color input:checked"),
        sizes = $(".check-size input:checked"),
        prices = $(".check-price input:checked");

    var filteredItems = [],
        filteredForColors, filteredForSizes, filteredForPrices = [];

    if (colors.length > 0) {
        var selectedColors = [];

        $(colors).each(function (index, element) {
            let color = $(element).val();
            selectedColors.push(color);
        });

        filteredForColors = filterColor(selectedColors, items);
    } else {
        filteredForColors = items;
    }

    if (sizes.length > 0) {
        var selectedSizes = [];

        $(sizes).each(function (index, element) {
            let size = $(element).val();
            selectedSizes.push(size);
        });

        filteredForSizes = filterSize(selectedSizes, items);
    } else {
        filteredForSizes = items;
    }

    if (prices.length > 0) {
        var selectedPrices = [];

        $(prices).each(function (index, element) {
            let price = $(element).val();
            selectedPrices.push(price);
        });

        filteredForPrices = filterPrices(selectedPrices, items);
    } else {
        filteredForPrices = items;
    }

    items.forEach(item => {
        var haveInColors = (filteredForColors.indexOf(item) >= 0);
        var haveInSizes = (filteredForSizes.indexOf(item) >= 0);
        var haveInPrices = (filteredForPrices.indexOf(item) >= 0);

        if (haveInColors && haveInSizes && haveInPrices)
            filteredItems.push(item);

    });

    renderItems(filteredItems);
}

function filterColor(colors, items) {
    var filteredItems = [];

    items.forEach(item => {
        if (colors.indexOf(item.color) >= 0)
            filteredItems.push(item);
    });

    if (filteredItems.length == 0)
        renderEmpty();

    return filteredItems;
}

function filterSize(sizes, items) {
    var filteredItems = [];

    items.forEach(item => {
        for (var i = 0; i < item.sizes.length; i++) {
            if (sizes.indexOf(item.sizes[i]) >= 0) {
                if (filteredItems.indexOf(item) < 0)
                    filteredItems.push(item);
            }
        }
    });

    return filteredItems;
}

function filterPrices(prices, items) {
    var filteredItems = [];

    for (var i = 0; i < prices.length; i++) {
        var price = prices[i];
        var initialPrice, finalPrice;

        price = price.split("-");
        initialPrice = parseFloat(price[0]);
        finalPrice = parseFloat(price[1]);

        items.forEach(item => {
            let priceItem = parseFloat(item.price);

            if (priceItem >= initialPrice && priceItem <= finalPrice)
                filteredItems.push(item);

            if (finalPrice == 0) {
                if (priceItem >= initialPrice)
                    filteredItems.push(item);
            }
        })
    }

    return filteredItems;
}

function orderBy(option) {
    var sortedItems = items;

    switch (option) {
        case "recentes":
            sortedItems.sort(function (a, b) {
                var x = new Date(a["publish"]);
                var y = new Date(b["publish"]);

                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            });

            break;
        case "min-price":
            sortedItems.sort(function (a, b) {
                var x = parseFloat(a["price"]);
                var y = parseFloat(b["price"]);

                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });

            break;
        case "max-price":
            sortedItems.sort(function (a, b) {
                var x = parseFloat(a["price"]);
                var y = parseFloat(b["price"]);

                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            });
            break;
        default:
            break;
    }

    renderItems(sortedItems);
}

function loadMore() {
    var items = JSON.parse(localStorage.getItem("items"));
    var page = localStorage.getItem("page");
    page++

    renderItems(items, page);
}

function closeOrderBy() {
    $(".ordenar").removeClass("openSort")
}