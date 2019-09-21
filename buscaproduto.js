$.getJSON("./products.json", function (data) {

    //alert("Carregou o list.json");
    var products = data[0].data.recommendation
    var tempHtml = '<ul>';
   
   for (var i = 0; i < products.length; i++) {
     var product = products[i];
     tempHtml += "<li><p>" + product.name + "</p><ul>";
     tempHtml += "</ul></li>";
   
   }
   tempHtml += "</ul>";
   
   $('#main__interess__list').html(tempHtml);
   });

   //-----------
