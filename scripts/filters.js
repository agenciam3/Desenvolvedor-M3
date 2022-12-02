const colors_list = [...document.querySelectorAll('#dropdown_toggle')];

const size_list = [...document.querySelectorAll('#size_label')];

const MoreColors = () => {
  colors_list.forEach(color => {
    if(color)
    {
      color.classList.toggle('dropdown_cont');
      color.classList.toggle('colors_class');
    }
  })
}

const Checked = (e) => {
  size_list.forEach(size => {
    let value = size.querySelector("input[name='sizes_name']");
    
    if(value.value == e.value){
      size.classList.remove('size_class');
      size.classList.add('size_class_checked');
    }
    else{
      size.classList.remove('size_class_checked');
      size.classList.add('size_class');
    }
  })
}