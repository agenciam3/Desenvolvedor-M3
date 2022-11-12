export default function clearAllSelected() {
  const selectButtons = document.querySelectorAll(".select-button");

  selectButtons.forEach((button) => {
    button.classList.remove("selected");
  });
}
