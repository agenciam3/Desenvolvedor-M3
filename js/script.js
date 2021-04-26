$(document).ready(function () {
    renderItems(items);

    $("body").on("click", "button.buy", addItemToBag);

    $(".selected-color").on("click", filter);
    $(".selected-size").on("click", filter);
    $(".selected-price").on("click", filter);

    $(".ordenar select").change(function () {
        var option = $(this).find("option:selected").val();
        orderBy(option);
    });

    $(".ordenar .order-option").on("click", function () {
        var option = $(this).attr("data-order");

        $(".order-option.selected").removeClass("selected");
        $(this).addClass("selected");

        orderBy(option);
        closeOrderBy();
    });

    $(".all-colors").on("click", () => {
        $(".check-color ul").addClass("view-all");
        $(".all-colors").hide();
    })

    $(".filtrar-mobile").on("click", () => {
        $(".filtros").addClass("open")
    });

    $(".aply").on("click", () => {
        $(".filtros").removeClass("open")
    });

    $(".clear").on("click", () => {
        renderItems(items);
        $(".filtros").removeClass("open")
    });

    $(".close-filters").on("click", () => {
        $(".filtros").removeClass("open")
    });

    $(".toggle-filters").on("click", function () {
        $(this).toggleClass("open");
        $(this).parent().next().slideToggle();
    })

    $(".ordenar-mobile").on("click", () => {
        $(".ordenar").addClass("openSort")
    });

    $(".close-sort").on("click", closeOrderBy);

    $(".more-products").on("click", loadMore);

    //    $("body").on("click", "button.buy", addItemToBag);


    $("body").on("click", ".empty-search .clear-filter", () => {
        renderItems(items);
    });
});