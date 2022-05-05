import { lockUnlockScroll } from "../module_helpers";

export function closeModal(el) {
  el.parentElement.style.display = 'none';
}

export function showModal(el) {
  document.querySelector(el).style.display = 'block'
}

export function openTab(el) {
  el.nextElementSibling.classList.remove('d-none')
}

export function closeTab(el) {
  el.nextElementSibling.classList.add('d-none')
}

export function openCloseTab(el) {
  if (el.nextElementSibling.classList.contains('d-none')) {
    openTab(el);
  }
  else {
    closeTab(el);
  }
}
