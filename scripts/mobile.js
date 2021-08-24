function showFilters() {
    document.querySelector(".filters").style.display = "block";
}

function showSorts() {
    document.querySelector("#sort-container").style.display = "block";
    document.querySelector(".dropdown-items").style.display = "block";
    document.querySelector(".dropdown").style.display = "block";
}

function closeFilters() {
    document.querySelector(".filters").style.display = "none";
}

function closeSortMenu() {
    document.querySelector(".dropdown").style.display = "none";
}

function expandFilter(index, btn) {
    const container = document.querySelectorAll(".input-container")[index];
    const icon = btn.querySelector(".expand-filters");
    if(container.style.display == "flex") {
        container.style.display = "none";
        icon.src = "assets/icons/add_black_24dp.svg";
    } else {
        container.style.display = "flex";
        icon.src = "assets/icons/remove_black_24dp.svg";
    };
}