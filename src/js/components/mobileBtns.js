export function mobileBtns(){
    $(".filter-button").on("click", function(){
        $(".area-filter-mobile").css("left", "0px");
    });

    $(".order-button").on("click", function(){
        $(".area-order-mobile").css("left", "0px");
    });

    $(".close-filter").on("click", function(){
        $(".area-filter-mobile").css("left", "100%");
    });

    $(".close-order").on("click", function(){
        $(".area-order-mobile").css("left", "100%");
    });

    $(".open-size-filter").on("click", function(){
        $(".filter-cors-mobile, .filter-price-range-mobile").hide();
        if(!$(this).hasClass("active")){
            $(".filter-size-mobile").show();
            $(this).addClass("active");
        } else {
            $(".filter-size-mobile").hide();
            $(this).removeClass("active");
        }
    })

    $(".open-color-filter").on("click", function(){
        $(".filter-size-mobile, .filter-price-range-mobile").hide();
        if(!$(this).hasClass("active")){
            $(".filter-cors-mobile").show();
            $(this).addClass("active");
        } else {
            $(".filter-cors-mobile").hide();
            $(this).removeClass("active");
        }
    })

    $(".open-price-range-filter").on("click", function(){
        $(".filter-size-mobile, .filter-cors-mobile").hide();
        if(!$(this).hasClass("active")){
            $(".filter-price-range-mobile").show();
            $(this).addClass("active");
        } else {
            $(".filter-price-range-mobile").hide();
            $(this).removeClass("active");
        }
    })
}