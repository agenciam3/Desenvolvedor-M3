//sort
function sortData(type) {
    loadJSON(function (response) {
        var data = JSON.parse(response);
    var newData = [];
    switch (type) {
        case 'ascendingPrice':
            newData = data.sort(function (a, b) {
                return a.price - b.price;
            });
            break;
        case 'descendingPrice':
            newData = data.sort(function (a, b) {
                return b.price - a.price;
            });
            break;
        case 'recent':
            newData = data.sort(function (a, b) {
                return a.price - b.price;
            });
            break;
    }
    eraseProducts();
    display(newData);

})};