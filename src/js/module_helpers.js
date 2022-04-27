export { onlyUnique, createElementWithClass, appendById, selectElements, getElementFromParent }

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function createElementWithClass(element, cssClass){
  let el = document.createElement(element);
  el.classList.add(cssClass);

  return el;
}

function appendById(appendable, id) {
  let parent = document.getElementById(id);
  parent.appendChild(appendable)
}

function selectElements(name) {
  return document.querySelectorAll(name)
}

function getElementFromParent(element, child){
  return child.parentElement.querySelector(element)
}
