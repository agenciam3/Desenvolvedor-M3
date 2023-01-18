import { quantityProductCar } from "./components/activeCardForBuy";
import { CreateModal } from "./components/createModel";
import { filterColors } from "./components/filterColors";
import { moreFilterColor } from "./components/moreFilterColor";

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
});