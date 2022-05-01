import { getElementFromParent, createElementWithClass } from "../module_helpers"

export function check(checkable){
  let customCb = getElementFromParent(".custom-checkbox", checkable)
  let checker = createElementWithClass('div', 'check')
  customCb.appendChild(checker)
}

export function uncheck(checkable) {
  let customCb = getElementFromParent(".check", checkable)
  customCb.remove()
}

export function redirectClick(cb) {
  cb.parentElement.querySelector('label').click()
}
