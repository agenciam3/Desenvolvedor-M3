export default function clearAllSelected() {
  const selectButtons = document.querySelectorAll(".select-button");

  selectButtons.forEach((button) => {
    button.classList.remove("selected");
  });
}

export function uncheckAll() {
  const checkboxes = document.querySelectorAll(".color");
  const sizes = document.querySelectorAll(".shirt-size");
  const prices = document.querySelectorAll(".price");

  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  sizes.forEach((size) => {
    size.classList.remove("selected");
  });

  prices.forEach((price) => {
    price.checked = false;
  });
}
