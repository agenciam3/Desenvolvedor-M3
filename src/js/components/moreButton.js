export function moreButton(){
    const moreButtonElement = $("button.more-elements");
    const productElementsNone = $(".card-none");

    $(moreButtonElement).on("click", function(){
        $(productElementsNone).each((key, elementProduct)=>{
            $(elementProduct).show();
        });
    });
}