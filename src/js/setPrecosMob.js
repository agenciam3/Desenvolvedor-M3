export default function setPrecos(prOpt, helperFunction) {

  //FAIXA 1
  const inputSpan = document.createElement("span");
  const inputFaixa1 = document.createElement("input");
  const labelFaixa1 = document.createElement("label");
  const attributes = {
    type: 'checkbox',
    name: "faixa1",
    id: "faixa1"
  }
  helperFunction(inputFaixa1, attributes);
  labelFaixa1.setAttribute("for", "faixa1");
  labelFaixa1.innerHTML = "de R$0 até R$50";
  inputSpan.classList.add("price-span")
  inputSpan.appendChild(inputFaixa1);
  inputSpan.appendChild(labelFaixa1);
  prOpt.appendChild(inputSpan);

  //FAIXA 2
  const inputSpan2 = document.createElement("span");
  const inputFaixa2 = document.createElement("input");
  const labelFaixa2 = document.createElement("label");
  const attributes2 = {
    type: 'checkbox',
    name: "faixa2",
    id: "faixa2"
  }
  helperFunction(inputFaixa2, attributes2);
  labelFaixa2.setAttribute("for", "faixa2");
  labelFaixa2.innerHTML = "de R$51 até R$150";
  inputSpan2.classList.add("price-span")
  inputSpan2.appendChild(inputFaixa2);
  inputSpan2.appendChild(labelFaixa2);
  prOpt.appendChild(inputSpan2);

  //FAIXA 3
  const inputSpan3 = document.createElement("span");
  const inputFaixa3 = document.createElement("input");
  const labelFaixa3 = document.createElement("label");
  const attributes3 = {
    type: 'checkbox',
    name: "faixa3",
    id: "faixa3"
  }
  helperFunction(inputFaixa3, attributes3);
  labelFaixa3.setAttribute("for", "faixa3");
  labelFaixa3.innerHTML = "de R$151 até R$300";
  inputSpan3.classList.add("price-span")
  inputSpan3.appendChild(inputFaixa3);
  inputSpan3.appendChild(labelFaixa3);
  prOpt.appendChild(inputSpan3);

  //FAIXA 4
  const inputSpan4 = document.createElement("span");
  const inputFaixa4 = document.createElement("input");
  const labelFaixa4 = document.createElement("label");
  const attributes4 = {
    type: 'checkbox',
    name: "faixa4",
    id: "faixa4"
  }
  helperFunction(inputFaixa4, attributes4);
  labelFaixa4.setAttribute("for", "faixa4");
  labelFaixa4.innerHTML = "de R$301 até R$500";
  inputSpan4.classList.add("price-span")
  inputSpan4.appendChild(inputFaixa4);
  inputSpan4.appendChild(labelFaixa4);
  prOpt.appendChild(inputSpan4);

  //FAIXA 5
  const inputSpan5 = document.createElement("span");
  const inputFaixa5 = document.createElement("input");
  const labelFaixa5 = document.createElement("label");
  const attributes5 = {
    type: 'checkbox',
    name: "faixa5",
    id: "faixa5"
  }
  helperFunction(inputFaixa5, attributes5);
  labelFaixa5.setAttribute("for", "faixa5");
  labelFaixa5.innerHTML = "a partir de R$ 500";
  inputSpan5.classList.add("price-span")
  inputSpan5.appendChild(inputFaixa5);
  inputSpan5.appendChild(labelFaixa5);
  prOpt.appendChild(inputSpan5);
}