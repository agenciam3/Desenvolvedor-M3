export function moreFilterColor(){
    const moreColorElement = $(".swipe-button");
    const allFilterColors = $(".color-none");

    $(moreColorElement).on("click", function(){
        if(!$(this).hasClass("active")){
            $(allFilterColors).show();
            $(allFilterColors).css("display", "flex");
            $(this).addClass("active");
        } else {
            $(allFilterColors).hide();
            $(this).removeClass("active");
        }
    });
}