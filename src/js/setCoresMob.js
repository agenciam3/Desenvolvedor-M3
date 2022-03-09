export default function setCoresMob(lista, setAttributes, coresOpt) {

  let repeatedColors = [];
  let unique = [];

  //console.log(coresOpt);

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

  let selected = [];
  // unique.map(u => {
  //   const inputSpan = document.createElement("span");
  //   const inputCheck = document.createElement("input");
  //   const inputLabel = document.createElement("label");
  //   const attributes = {
  //     type: 'checkbox',
  //     name: u,
  //     id: u
  //   };
  //   inputSpan.classList.add("color-span");
  //   inputCheck.classList.add("color-item");
  //   setAttributes(inputCheck, attributes);
  //   inputLabel.innerHTML = u;
  //   inputSpan.appendChild(inputCheck);
  //   inputSpan.appendChild(inputLabel);
  //   coresOpt.appendChild(inputSpan);
  // });

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
    inputCheck.addEventListener("change", () => {
      selected.push(attributes.id)
      console.log(selected)
      const card = document.querySelectorAll(".prod-card")

      for (let i = 0; i < selected.length; i++) {
        lista.filter(l => {
          card[(l.id) - 1].classList.add("hide");
          if (l.color == selected[i]) {
            card[(l.id) - 1].classList.remove("hide");
            card[(l.id) - 1].classList.add("show");
          }
        });
      }

    });
    setAttributes(inputCheck, attributes);
    inputLabel.innerHTML = u;
    inputSpan.appendChild(inputCheck);
    inputSpan.appendChild(inputLabel);
    coresOpt.appendChild(inputSpan);
  });

}


