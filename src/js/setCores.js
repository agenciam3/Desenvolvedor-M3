export default function setCores(lista, setAttributes) {
  const optForm = document.querySelector(".opt-filters");

  let repeatedColors = [];
  let unique = [];

  function deleteEquals() {
    let j = 1;

    for (let i = 0; i < lista.length; i++) {
      if (lista[i].color != lista[j].color) {
        unique.push(lista[i].color);
        j++
      } else {
        repeatedColors.push(lista[i].color);
      }
    }
  }
  deleteEquals();

  const titleOptColor = document.createElement("h4");
  titleOptColor.classList.add("opt-filters-title");
  titleOptColor.innerHTML = "CORES";
  optForm.appendChild(titleOptColor);

  let selected = [];
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
    optForm.appendChild(inputSpan);
  });

}
