console.log("Dev m3");

function on() {
  document.getElementById("sidenav").style.display = "block";
}
function on2() {
  document.getElementById("sidenav2").style.display = "block";
}
  
function off() {
  document.getElementById("sidenav").style.display = "none";
}
function off2() {
  document.getElementById("sidenav2").style.display = "none";
}


  function changeBorder(id) {

    document.getElementById(id).style.borderColor = "rgb(0, 192, 238)";

  }

  function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");
    var sizes = document.getElementById("sizes");
    var sz_selector = document.getElementById("sz_selector");
    var prc_selector = document.getElementById("prc_selector");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline"; 
      moreText.style.display = "none";
      
    } else {
      dots.style.display = "none";
      moreText.style.display = "inline";
      myBtn.style.display ="none";
    }

    sizes.style.top = "535px";
    
    sz_selector.style.top = "580px";

    price.style.top = "705px";
    
    prc_selector.style.top = "750px";
  }

  function drop(){
    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;
  
    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function drop() {
      this.classList.toggle("active");
      var dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
      } else {
      dropdownContent.style.display = "block";
      }
      });
    }
  }
