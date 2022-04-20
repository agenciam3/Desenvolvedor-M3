import { closeFilter } from ".";
import fetchProductJSON from "./fetchProductJSON";
import renderGrid from "./renderGrid";

const sidebar = document.querySelectorAll("#sidebar-filter input");
const sidebarArr = Array.prototype.slice.call(sidebar);

sidebarArr.forEach((sidebarArr) => {
  sidebarArr.addEventListener("click", clickFilter);
});

const url = "http://localhost:5000/products/?_page=1&_limit=9";

const queryFilter = [];
async function clickFilter(e) {
  if (e.target.checked == true) {
    queryFilter.push(e.target.getAttribute("rel"));
    localStorage.setItem("queryFilter", queryFilter);
  } else {
    queryFilter.pop(e.target.getAttribute("rel"));
    localStorage.setItem("queryFilter", queryFilter);
  }

  queryFilter.join();
  var dados = queryFilter.join();
  queryFilter.length == 0
    ? queryFilter
    : localStorage.setItem("queryFilter", queryFilter);
}

const btAply = document.getElementById("apply-filter");

const btclear = document.getElementById("clear-filter");
btclear.addEventListener("click", filterClear);

function filterClear(e) {
  closeFilter();
  sidebarArr.forEach((sidebarArr) => {
    sidebarArr.checked ? (sidebarArr.checked = false) : sidebarArr.checked;
  });

  fetchProductJSON(`http://localhost:5000/products/?_page=1&_limit=9$`).then(
    (response) => {
      renderGrid(response);
    }
  );
}

btAply.addEventListener("click", () => {
  if (queryFilter.length == 0) {
  } else {
    const urlfilter = queryFilter.join("");
    urlfilter.toString();
    urlfilter.replace(",", "");

    fetchProductJSON(
      `http://localhost:5000/products/?_page=1&_limit=9${urlfilter}`
    ).then((response) => {
      renderGrid(response);
    });
    closeFilter();
  }
});

export default clickFilter;
