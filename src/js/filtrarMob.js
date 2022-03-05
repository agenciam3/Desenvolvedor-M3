import setCoresMob from "./setCoresMob";
import setTamanhosMob from "./setTamanhosMob";

export default function filtrarMob(varFunc, helperFunction, lista) {
  const holder = document.querySelector(".container");
  const mobMenu = document.createElement("div");
  mobMenu.classList.add("menu-filtrar-mob");

  //FILTRAR
  const filtrarBtn = document.createElement("div");
  filtrarBtn.classList.add("filtrar");

  const titleFiltrar = document.createElement("span");
  titleFiltrar.innerHTML = "FILTRAR";

  const arrow = document.createElement("img");
  arrow.src = '../img/arrow.png';
  filtrarBtn.appendChild(arrow);

  filtrarBtn.appendChild(titleFiltrar);
  mobMenu.appendChild(filtrarBtn);

  //console.log(filtrarBtn)

  //CORES
  const coresBtn = document.createElement("div");
  coresBtn.classList.add("cores");

  const titleCores = document.createElement("span");
  titleCores.innerHTML = "CORES";

  const y = document.createElement("span");
  y.innerHTML = "X";

  coresBtn.appendChild(titleCores);
  coresBtn.appendChild(arrow);
  mobMenu.appendChild(coresBtn);

  const coresOpt = document.createElement("div");
  coresOpt.classList.add("opt-filters");
  coresBtn.appendChild(coresOpt);

  setCoresMob(varFunc, helperFunction, coresOpt);

  //TAMANHOS
  const tamBtn = document.createElement("div");
  tamBtn.classList.add("tamanhos");

  const titleTam = document.createElement("span");
  titleTam.innerHTML = "TAMANHOS";

  const arrow2 = document.createElement("img");
  arrow2.src = '../img/arrow.png';

  tamBtn.appendChild(titleTam);
  tamBtn.appendChild(arrow2);
  mobMenu.appendChild(tamBtn);

  const tamOpt = document.createElement("div");
  tamOpt.classList.add("opt-filters");
  tamBtn.appendChild(tamOpt);

  setTamanhosMob(lista, tamOpt);

  holder.appendChild(mobMenu);

  //console.log(tamOpt);
}