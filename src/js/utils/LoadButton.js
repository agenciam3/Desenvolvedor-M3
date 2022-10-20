export function enableLoadButton() {
  const loadButton = document.querySelector(".loadMore__area__button");
  loadButton.disabled = false;
}

export function disableLoadButton() {
  const loadButton = document.querySelector(".loadMore__area__button");
  loadButton.disabled = true;
}
