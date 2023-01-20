export function quantityProductCar(){
    const quantityArea = document.querySelector('span.area-number');
    const quantity = localStorage.getItem('@M3Store_KeyProduct');
    const len = quantity.split(',');

    if(quantity === null){
        quantityArea.textContent = '0';
    } else if( len.length > 9 ){
        quantityArea.textContent = '+9';
    } else {
        quantityArea.textContent = `${len.length}`;
    }
}

export function activeCardForBuy(){
    const buyButtonElements = $("button.buy-button-product");

    $(buyButtonElements).each((key, element)=>{
        $(element).on("click", function(e){
            const key = $(this).attr("data-value");
            const CardBuy = $("div.card-buy");
            const array = [];

            if(localStorage.getItem("@M3Store_KeyProduct") !== null){
                array.push(localStorage.getItem("@M3Store_KeyProduct"));
            }

            array.push(key);

            localStorage.setItem("@M3Store_KeyProduct", array);

            quantityProductCar();

            $(CardBuy).css("bottom", "10vh");
            $(CardBuy).css("display", "flex");

            setTimeout(() => {
                $(CardBuy).css("bottom", "-100vh");
                $(CardBuy).css("display", "none");
            }, 2000);
        });
    });
}