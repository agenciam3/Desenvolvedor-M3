const clearAllSelected = require("./utils/clearSelect");

function addEventListeners() {
  const selectTitle = document.querySelector(".select-title");
  const selectItemsContainer = document.querySelector(".select-items");
  const selectButtons = document.querySelectorAll(".select-button");

  selectTitle.addEventListener("click", (e) => {
    selectItemsContainer.classList.toggle("hidden");
  });

  selectButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.target.classList.contains("select-title")) return;
      clearAllSelected();
      selectItemsContainer.classList.toggle("hidden");
      selectTitle.textContent = e.target.textContent;
      e.target.classList.add("selected");
    });
  });
}

module.exports = addEventListeners;
