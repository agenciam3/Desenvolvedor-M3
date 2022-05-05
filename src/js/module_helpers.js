export { onlyUnique, createElementWithClass, appendById,
         selectElements, getElementFromParent, removeItemAll,
         hide, show, lockUnlockScroll }

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

function removeItemAll(arr, value) {
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}

function hide(element) {
  element.classList.add('d-none')
}

function show(element) {
  element.classList.remove('d-none')
}


function lockUnlockScroll(){
  let body = document.querySelector('body')
  body.classList.toggle('lock-scroll')
}
