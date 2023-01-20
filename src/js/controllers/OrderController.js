import { OrderModel } from "../models/OrderModel";
import { OrderView } from "../views/OrderView";

export class OrderController {
    index() {
        $("#smarthint-search-sort-select").on("change", function(){
            let val = $(this).val();
            let arrList = OrderModel(val);
    
            OrderView(arrList);
        });
    }

    mobile() {
        $(".main-content-order span").on("click", function(){
            let val = $(this).attr("data-value");
            let arrList = OrderModel(val);
    
            $(".elements").empty();
    
            OrderView(arrList);
        });
    }

    start() {
        this.mobile();
        this.index();
    }
}