import setCoresMob from "./setCoresMob";

export default function filtrarMob(varFunc, helperFunction) {
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

  console.log(filtrarBtn)

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
  mobMenu.appendChild(coresOpt);


  setCoresMob(varFunc, helperFunction, coresOpt);

  holder.appendChild(mobMenu);

  console.log(varFunc);
}