let sizesValue = ['P', 'M', 'G', 'GG', 'U', '36', '38', '40', '42', '44', '46'];

let sizes = document.getElementById('sizes');

for(let i in sizesValue) {
  sizes.innerHTML += `
  <button class="size-btn" id="${sizesValue[i]}">${sizesValue[i]}</div>
  `;
}

sizes.onclick = function(e) {
  let id = e.target.id;
  
  let button = document.getElementById(id);

  if(id != 'sizes') {
    searchClass(id);

    button.classList.toggle('size-btn-click');
  }
}

function searchClass(id) {
  for(let j in sizesValue) {
    var buttonClass = document.getElementById(sizesValue[j]);

    if(buttonClass.id === id) continue;
    
    if(buttonClass.classList.contains('size-btn-click')) {
      buttonClass.classList.remove('size-btn-click');

      return;
    }
  }
}