import { check, uncheck } from "./helpers";

export function radioCheckUncheck(radio, filterList) {
  let radios = document.querySelectorAll(".price-radio");

  if(radio.dataset.checkStatus === "unchecked" && radio.checked){
    radio.dataset.checkStatus = "checked";
    radios.forEach(r => {
      if (r.dataset.checkStatus === "checked" && r !== radio) {
        uncheck(r);
        r.dataset.checkStatus = "unchecked";
      }
    });
    check(radio);
    filterList[0] = parseFloat(radio.dataset.minPrice)
    filterList[1] = parseFloat(radio.dataset.maxPrice)
  }

  else if (radio.dataset.checkStatus === "checked" && radio.checked) {
    radio.checked = false;
    radios.forEach(r => {
      if (r.dataset.checkStatus === "checked") {
        uncheck(r);
        r.dataset.checkStatus = "unchecked";
      }
    });
    filterList[0] = 0
    filterList[1] = 99999
  }
}
