const element = document.querySelector("#order_btns");

const Toggle_Order = () => {
  element.classList.toggle("drop_content");
  element.classList.toggle("order_check");
}

window.onclick = function(event){
  if(window.innerWidth>900)
  {
    if(!event.target.matches('.drop_btn')){
      if(element.classList.contains('order_check'))
      {
        element.classList.remove("order_check");
        element.classList.add("drop_content");
      }
    }
  }
}