export default function setTamanhos(lista, optForm) {
  let teste = [];

  lista.map(item => {
    item.size.forEach(s => {
      teste.push(s);
    })
  })
  //console.log(teste)


  var uniqueSizes = teste.filter(function (elem, index, self) {
    return index === self.indexOf(elem);
  })

  const titleOptSize = document.createElement("h4");
  titleOptSize.classList.add("opt-filters-title");
  titleOptSize.innerHTML = "TAMANHOS";
  optForm.appendChild(titleOptSize);

  const sizeHolder = document.createElement("div");
  sizeHolder.classList.add("size-holder");
  optForm.appendChild(sizeHolder);

  uniqueSizes.map(un => {
    const btnSize = document.createElement("button");
    btnSize.addEventListener("click", function (e) {
      e.preventDefault();
      this.classList.add("size-item-selected");
    });
    btnSize.classList.add("size-item");
    btnSize.innerHTML = un;
    sizeHolder.appendChild(btnSize);
  });
}