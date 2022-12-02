const body = document.querySelector("body");

const page_filter = document.querySelector(".side-bar");

const page_order = document.querySelector(".order_menu");

const colors = document.querySelector("#colors_drop");

const sizes = document.querySelector("#buttons_size");

const prices = document.querySelector('#buttons_price');

const confirmation = document.querySelector('#confirmation');
const clear = document.querySelector('#clear');

const elementlist = [...document.querySelectorAll('#dropdown_toggle')];

let was_opened = 0;

const Filters = () =>{
  page_filter.style.display = "block";
  document.querySelector(".main").style.padding=0;

  elementlist.forEach(color =>{
    if(color)
    {
      color.classList.remove('dropdown_cont');
      color.classList.add('colors_class');
    }
  })

  body.style.overflow = "hidden";
}

const Close_Filter = () => {
  page_filter.style.display = "none";

  body.style.overflow = "auto";

  Update(Products.inventory);
}

const Order = () =>{
  page_order.style.display="block";
  page_order.style.overflow = "hidden";

  element.classList.remove("drop_content");
  element.classList.add("order_check");

  document.querySelector(".navbar").style.display= "none";
  document.querySelector(".order").style.paddingTop=0;
}

const Close_Order = () =>{
  if(window.innerWidth<900) //Verifica se a janela tem menos de 900 px de resolução, para que funcione apenas no mobile, caso contrario sumira com o menu de ordenar na versao de desktop
  {
    page_order.style.display="none";   

    document.querySelector(".navbar").style.display= "flex";
    document.querySelector(".order").style.paddingTop="13px";
  }
}


const Plus_Minus = (container) => {
  const image = container.querySelector('.plus_icon')

  if(image.querySelector('#plus'))
  {
    image.innerHTML = `<img id="minus" src="images/icons/minus.png" alt="Ícone em forma de menos">`;
    was_opened++;
    Show_Hide_Mobile_Buttons();
  }
  else
  {
    image.innerHTML = `<img id="plus" src="images/icons/plus.png" alt="Ícone em forma de X">`;
    was_opened--;
    Show_Hide_Mobile_Buttons();
  }
}

const Toggle_Colors = (e) =>{
  colors.classList.toggle("drop_colors");
  colors.classList.toggle("open_colors");

  Plus_Minus(e);
}

const Toggle_Sizes = (e) =>{
  sizes.classList.toggle("size_buttons");
  sizes.classList.toggle("open_sizes");

  Plus_Minus(e);
}

const Toggle_Prices = (e) =>{
  prices.classList.toggle("price_buttons");
  prices.classList.toggle("open_prices");

  Plus_Minus(e);
}

const Show_Hide_Mobile_Buttons = () =>{
  if(was_opened>=1){
    confirmation.classList.remove('mobile_btn');
    confirmation.classList.add('mobile_btn_show');

    clear.classList.remove('mobile_btn');
    clear.classList.add('mobile_btn_show');
  }
  else{
    confirmation.classList.remove('mobile_btn_show');
    confirmation.classList.add('mobile_btn');

    clear.classList.remove('mobile_btn_show');
    clear.classList.add('mobile_btn');
  }
}

const Uncheck = (radio) =>{
  radio.forEach(button =>{
    button.checked = false;
  })
}

const Clear = () =>{
  const colors_radio = document.getElementsByName("colors");
  const sizes_radio = document.getElementsByName("sizes_name");
  const prices_radio = document.getElementsByName("prices");

  Uncheck(colors_radio);

  Uncheck(sizes_radio);
  Checked(sizes_radio);
  
  Uncheck(prices_radio);

  Close_Filter();

  Update(Products.inventory);
}

const Confirmation = () => {
  Close_Filter();
  
  Products.Filter_SortBy();
}