var select = document.getElementsByClassName("select_title");
var i;


for (i = 0; i < select.length; i++) {
  select[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
