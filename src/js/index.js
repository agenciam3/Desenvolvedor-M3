import { quantityProductCar } from "./libs/activeCardForBuy";
import { CreateModal } from "./libs/createModel";
import { mobileBtns } from "./libs/mobileBtns";
import { moreFilterColor } from "./libs/moreFilterColor";

import { FilterController } from "./controllers/FiltersController";
import { OrderController } from "./controllers/OrderController";
import { ClearFilterController } from "./controllers/ClearFilterController";

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
    const filterController = new FilterController();
    const orderController = new OrderController();
    const clearFilterController = new ClearFilterController();

    ajaxReq();
    quantityProductCar();
    moreFilterColor();
    mobileBtns();
    filterController.start();
    orderController.start();
    clearFilterController.index();
});