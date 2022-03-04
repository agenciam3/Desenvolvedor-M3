export default function setCoresMob(lista, setAttributes, coresOpt) {

  let repeatedColors = [];
  let unique = [];

  console.log(coresOpt);

  function deleteEquals() {
    let j = 1;

    for (let i = 0; i < lista.length; i++) {
      //console.log(lista[i].color)
      if (lista[i].color != lista[j].color) {
        //console.log(lista[i].color);
        unique.push(lista[i].color);
        //console.log("rep", repeatedColors);
        j++
        //console.log("i", i),
        //console.log("j", j)
      } else {
        repeatedColors.push(lista[i].color);
        //console.log("uniq", unique);
      }
    }
  }
  deleteEquals();

  unique.map(u => {
    const inputSpan = document.createElement("span");
    const inputCheck = document.createElement("input");
    const inputLabel = document.createElement("label");
    const attributes = {
      type: 'checkbox',
      name: u,
      id: u
    };
    inputSpan.classList.add("color-span");
    inputCheck.classList.add("color-item");
    setAttributes(inputCheck, attributes);
    inputLabel.innerHTML = u;
    inputSpan.appendChild(inputCheck);
    inputSpan.appendChild(inputLabel);
    coresOpt.appendChild(inputSpan);
  });

  let teste = [];

  lista.map(item => {
    item.size.forEach(s => {
      teste.push(s);
    })
  })
  console.log(teste)

}