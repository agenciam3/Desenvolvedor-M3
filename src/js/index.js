import { quantityProductCar } from "./components/activeCardForBuy";
import { clearFilter } from "./components/clearFilter";
import { CreateModal } from "./components/createModel";
import { filterColors } from "./components/filterColors";
import { filterPrices } from "./components/filterPrices";
import { filterSize } from "./components/filterSize";
import { mobileBtns } from "./components/mobileBtns";
import { moreFilterColor } from "./components/moreFilterColor";
import { orderProducts } from "./components/orderProducts";
import { orderProductsMobile } from "./components/orderProductsMobile";

function ajaxReq() {
    const req = {
        url: "http://localhost:5000/products",
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            const createModal = new CreateModal(data);
            createModal.render();
        }
    }

    $.ajax(req);
}

$(document).ready(function () {
    ajaxReq();
    quantityProductCar();
    moreFilterColor();
    filterColors();
    filterSize();
    filterPrices();
    orderProducts();
    mobileBtns();
    orderProductsMobile();
    clearFilter();
});