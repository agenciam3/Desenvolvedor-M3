const mq = window.matchMedia("(max-width: 767px)");
if (mq.matches) {

    var btnFilters, btnColors, btnSizes, btnPrices;
    btnFilters = document.createElement("button");
    btnColors = document.createElement("button");
    btnSizes = document.createElement("button");
    btnPrices = document.createElement("button");


    btnFilters.classList.add("showMobile");
    var idFilter = document.getElementById("filter");
    var idColors = document.getElementById("colors");
    var idSizes = document.getElementById("sizes");
    var idPrices = document.getElementById("prices");

    var classFilters = document.querySelectorAll(".filters");
    var classColors = document.querySelectorAll(".colors");
    var classSizes = document.querySelectorAll(".sizeBtn");
    var classPrices = document.querySelectorAll(".prices");

    console.log(classColors);

    var temp = document.createTextNode("Filtrar");
    btnFilters.appendChild(temp);
    btnFilters.classList.add("btnFilters", "btnAsd", "showMobile");
    idFilter.prepend(btnFilters);




    temp = document.createTextNode("Cores");
    btnColors.appendChild(temp);
    btnColors.classList.add("btnFiltroMobile");
    idColors.prepend(btnColors);


    temp = document.createTextNode("Tamanhos");
    btnSizes.appendChild(temp);
    btnSizes.classList.add("btnFiltroMobile", "btnTamanho");
    idSizes.prepend(btnSizes);


    temp = document.createTextNode("Preços");
    btnPrices.appendChild(temp);
    btnPrices.classList.add("btnFiltroMobile");
    idPrices.prepend(btnPrices);


    btnFilters.addEventListener('click', function () {
        if (idFilter.classList.contains("fullscreen")) {
            idFilter.classList.remove("fullscreen")
            idColors.classList.remove("showMobile");
            idSizes.classList.remove("showMobile");
            idPrices.classList.remove("showMobile");
        } else {
            idFilter.classList.add("fullscreen");
            idColors.classList.add("showMobile");
            idSizes.classList.add("showMobile");
            idPrices.classList.add("showMobile")
        }
    });
    btnColors.addEventListener('click', function () {
        for (i in classColors) {
            if (classColors[i].classList.contains("showMobile")) {
                classColors[i].classList.remove("showMobile");

            } else {
                classColors[i].classList.add("showMobile");
            }
        }
    });
    btnSizes.addEventListener('click', function () {
        for (i in classSizes) {
            if (classSizes[i].classList.contains("showMobileSize")) {
                classSizes[i].classList.remove("showMobileSize");

            } else {
                classSizes[i].classList.add("showMobileSize");
            }
        }
    });
    btnPrices.addEventListener('click', function () {
        for (i in classPrices) {
            if (classPrices[i].classList.contains("showMobile")) {
                classPrices[i].classList.remove("showMobile");

            } else {
                classPrices[i].classList.add("showMobile");
            }
        }
    });


    document.getElementById("orderBtn").addEventListener('click', function () {
        if (document.getElementById("order").classList.contains("fullscreen")) {
            document.getElementById("order").classList.remove("fullscreen")
            document.getElementById("orderMenu").classList.remove("showMobile", "show");
        } else {
            document.getElementById("order").classList.add("fullscreen")
            document.getElementById("orderMenu").classList.toggle("showMobile");
        }
    })


}