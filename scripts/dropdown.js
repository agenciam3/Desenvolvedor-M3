const drop = document.querySelector(".dropdown-items");
const dropbtn = document.querySelector(".dropdown-value");

drop.style.display = "none";

function toggleDropdown() {
    if(window.innerWidth <= 600) {
        console.log("hi");
        const dropdown = document.querySelector(".dropdown");

        if(dropdown.style.display == "none") {
            dropdown.style.display = "block";
        } else {
            dropdown.style.display = "none";
        }
    } else {
        if(drop.style.display == "none") {
            drop.style.display = "block";
        } else {
            drop.style.display = "none";
        }
    }
}

let sortBy = "";

const dropitems = document.querySelectorAll(".dropdown-item");

dropitems.forEach(item => {
    item.addEventListener("click", e => {
        sortBy = dropbtn.innerHTML = e.target.innerHTML;
        toggleDropdown();     
        updateProducts();
    });
})