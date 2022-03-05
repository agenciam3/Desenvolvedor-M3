export default function setTamanhos(lista, tamOpt) {
  let teste = [];

  lista.map(item => {
    item.size.forEach(s => {
      teste.push(s);
    })
  })
  console.log(tamOpt)


  var uniqueSizes = teste.filter(function (elem, index, self) {
    return index === self.indexOf(elem);
  });

  const sizeHolder = document.createElement("div");
  sizeHolder.classList.add("size-holder");
  tamOpt.appendChild(sizeHolder);

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