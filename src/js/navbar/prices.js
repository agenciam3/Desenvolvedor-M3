import { check, uncheck } from "./helpers";

export function radioCheckUncheck(radio) {
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
  }

  else if (radio.dataset.checkStatus === "checked" && radio.checked) {
    radio.checked = false;
    radios.forEach(r => {
      if (r.dataset.checkStatus === "checked") {
        uncheck(r);
        r.dataset.checkStatus = "unchecked";
      }
    });
  }
}
