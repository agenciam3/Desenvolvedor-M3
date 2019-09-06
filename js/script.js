fetch("./data/products.json")
	.then(function(resp){
		return resp.json();

	}) 
	.then(function(data){
		var arrayProducts = data.products
		//console.log(arrayProducts)
		var qtdPar;
		$.each(arrayProducts, function(indice, produto){
			$(".produtos")
				.append($("<div/>").addClass("item").attr('id', "prod-"+produto.id));
				if(produto.id > 300){
					qtdPar = 5
				} else {
					qtdPar = 3 
				}

				$("#prod-"+produto.id)
				
				.append($("<img/>").addClass("item-content").addClass("prod-img").attr("src", produto.image))
				.append($("<p/>").addClass("item-content").addClass("prod-name").text(produto.name))
				.append($("<span/>").addClass("item-content").addClass("prod-price").text(produto.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })))
				.append($("<span/>").addClass("item-content").addClass("prod-parc"). text( "até " +qtdPar + "x de " + (produto.price/qtdPar).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })  ))
				.append($("<input/>").addClass("item-content").addClass("prod-button").attr("type", "submit").attr("value", "COMPRAR"))


		})
		
	});