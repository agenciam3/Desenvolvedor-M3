function dropdown(selector){
	document.querySelector(selector).style.position = 'relative';
	document.querySelector(selector).style.display = 'inline-block';
}

function invertArrow(elem){
	if(elem.classList.contains("arrow_down")){
		elem.classList.add('arrow_up');
		elem.classList.remove('arrow_down');
	} else{
		elem.classList.remove('arrow_up');
		elem.classList.add('arrow_down');
	}
}

function changeColorView(){
	var hiddenColors = document.getElementsByClassName("chkh");
	for(let i = 0; i < hiddenColors.length; i++)
		hiddenColors[i].style.display = (hiddenColors[i].style.display!="flex")?"flex":"none";
	var arrow = document.getElementById("colorArrow");
	invertArrow(arrow);
}

function showDrop(){
	document.getElementById('dropMenu').classList.toggle('show');
	invertArrow(document.getElementById("dropArrow"));
}

function updateProducts(obj){
	data = obj.items
	if(!obj.has_more)
		freezeUpdate();
	let parentContainer = document.getElementById("viewport");
	for(let i=0; i < data.length; i++){
		let card = document.createElement("div");
		card.classList.toggle("product");
		let parcel = data[i].price / data[i].installments;
		
		let elem = []
		elem.push(document.createElement("img"));
		elem[0].setAttribute("src",data[i].image);
		elem[0].setAttribute("class","ptumb");
		
		elem.push(document.createElement("span"));
		elem[1].classList.toggle("ptitle");
		elem[1].innerHTML = data[i].name;
		
		elem.push(document.createElement("span"));
		elem[2].classList.toggle("pprice");
		elem[2].innerHTML = data[i].price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
		
		elem.push(document.createElement("span"));
		elem[3].classList.toggle("pdiv");
		elem[3].innerHTML = `até ${data[i].installments}x de ${parcel.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`;
		
		elem.push(document.createElement("button"));
		elem[4].classList.toggle("pbuy");
		elem[4].setAttribute("onclick",`addCart("${data[i].id}")`);
		elem[4].innerHTML = "COMPRAR";
		
		for(let k = 0; k < elem.length; k++)
			card.appendChild(elem[k]);
		parentContainer.appendChild(card);

	}
	document.body.style.overflow = "auto";
	document.getElementById("loading").style.display = "none";
}

function addCart(id){
	try{
		var items = JSON.parse(localStorage.items);
	} catch(e){
		localStorage.items = "{}";
		var items = {};
	}
	var keys = Object.keys(items);
	if( keys.includes(id) )
		items[id] += 1;
	else
		items[id] = 1;
	
	localStorage.items = JSON.stringify(items);
	updateNCart();
}

function updateNCart(){
	var items = JSON.parse(localStorage.items);
	var keys = Object.keys(items);
	let n=0;
	for(let i=0; i < keys.length; i++)
		n += parseInt(items[keys[i]]);
	var cart = document.getElementById("cartqnt");
	if( n > 0 ){
		cart.innerHTML = parseInt(n);
		cart.style.display = "flex";
	}
	else{
		cart.innerHTML = "";
		cart.style.display = "none";
	}
	
}

function start(){
	var raw = localStorage.items;
	if(!raw)
		localStorage.items = "{}";
	sessionStorage.order = 0;
	sessionStorage.filters = "{\"sizes\":[], \"colors\": [], \"prices\": []}";
	clearFilters();
	updateNCart();
	document.getElementById('cartPreview').addEventListener('click',function (e){
	   e.stopPropagation();
	});
}

function freezeUpdate(){
	document.body.style.overflow = "auto";
	document.getElementById("loading").style.display = "none";
	document.getElementById("load").style.display = "none";
}

function render(index, qnt){
	let filter = JSON.parse(sessionStorage.filters);
	if( filter.sizes.length > 0 || filter.colors.length > 0 || filter.prices.length > 0){
		document.querySelector(".viewport").innerHTML = "";
		var parameters = {"method":"POST", "body": JSON.stringify(filter)};
	}
	else
		var parameters = {"method":"GET"};
	
	document.body.style.overflow = "hidden";
	document.getElementById("loading").style.display = "flex";
	var data = fetch(`/ordered/${sessionStorage.order}/${index}/${qnt}`, parameters)
		.then( response => response.json() )
		.then( obj => obj.success?updateProducts(obj):console.log("Falha ao receber dados do servidor.") );
}

function getMoreProducts(){
	var alrLoad = document.getElementsByClassName("product").length;
	render(alrLoad, 3);
}

function orderMPrice(){
	document.querySelector(".viewport").innerHTML = "";
	document.getElementById("load").style.display = "flex";
	sessionStorage.order = 1;
	render(0,6);
	if (window.matchMedia("(max-width: 1024px)").matches)
		closeOrder()
}

function orderHPrice(){
	document.querySelector(".viewport").innerHTML = "";
	document.getElementById("load").style.display = "flex";
	sessionStorage.order = 2;
	render(0,6);
	if (window.matchMedia("(max-width: 1024px)").matches)
		closeOrder()
}

function orderNew(){
	document.querySelector(".viewport").innerHTML = "";
	document.getElementById("load").style.display = "flex";
	sessionStorage.order = 0;
	render(0,6);
	if (window.matchMedia("(max-width: 1024px)").matches)
		closeOrder()
}

window.onclick = function(e) {
	if (!e.target.matches('.dropbtn')) {
		var myDropdown = document.getElementById("dropMenu");
		if (myDropdown.classList.contains('show')) {
			myDropdown.classList.remove('show');
		}
	}
}

window.addEventListener('click', function(e){
	if (!document.getElementById('bag').contains(e.target))
		document.getElementById('cartPreview').style.display = "none";
 
});

function dropItems(caller, qSelector){
	if (window.matchMedia("(max-width: 1024px)").matches) {
		var elem = document.querySelector(qSelector);
		if( elem.style.opacity != "1"){
			elem.style.opacity = "1";
			elem.style.height = "auto";
			caller.getElementsByTagName("span")[0].innerHTML = "-";
		} else{
			elem.style.opacity = "0";
			elem.style.height = "0";
			caller.getElementsByTagName("span")[0].innerHTML = "+";
		}
	}
}

function showFilters(){
	document.querySelector(".menu").style.display = "block";
	document.querySelector(".mainframe").style.display = "none";
	document.body.style.overflow = "hidden";
}
function closeFilters(){
	document.querySelector(".menu").style.display = "none";
	document.querySelector(".mainframe").style.display = "flex";
	document.body.style.overflow = "auto";
}

function showOrders(){
	document.querySelector(".order").style.display = "block";
	document.querySelector("#dropMenu").style.display = "block";
	document.querySelector(".viewport").style.display = "none";
	document.body.style.overflow = "hidden";
}

function closeOrder(){
	document.querySelector(".order").style.display = "none";
	document.querySelector("#dropMenu").style.display = "none";
	document.querySelector(".viewport").style.display = "grid";
	document.body.style.overflow = "auto";
}

function updateFilter(obj){
	if (window.matchMedia("(max-width: 1024px)").matches)
		return;
	var filters = JSON.parse(sessionStorage.filters);
	
	let dictionary = {"pricerangelist":"prices", "sizelist":"sizes", "colorlist":"colors"}
	let type = obj.parentElement.parentElement.id;
	if( obj.checked )
		filters[dictionary[type]].push(obj.id)
	else
		delete filters[dictionary[type]].pop(obj.id)
	sessionStorage.filters = JSON.stringify(filters);
	document.querySelector(".viewport").innerHTML = "";
	render(0,6);
}

function applyFilters(){
	let sizelist = document.querySelectorAll(".sizelist li");
	let colorlist = document.querySelectorAll(".colorlist li");
	let pricelist = document.querySelectorAll(".pricerangelist li");
	let payload = {
		"sizes": [],
		"colors": [],
		"prices": []
	};
	
	// Verify selected filters at the list of sizes
	sizelist.forEach( function(x){
		let input = x.querySelector("input");
		if(input.checked)
			payload.sizes.push(input.id)
	});
	
	// Verify selected filters at the list of colores
	colorlist.forEach( function(x){
		let input = x.querySelector("input");
		if(input.checked)
			payload.colors.push(input.id)
	});
	
	// Verify selected filters at the list of prices
	pricelist.forEach( function(x){
		let input = x.querySelector("input");
		if(input.checked)
			payload.prices.push(input.id)
	});
	
	sessionStorage.filters = JSON.stringify(payload);
	render(0,6);
}

function renderProductPreview(){
	let init = {
		method: "POST",
		body: localStorage.items
	};
	
	document.getElementById("checkout").style.display = "none";
	document.getElementById("emptyCart").style.display = "none";
	document.querySelector(".contentCart img").style.display = "block";
	document.querySelector(".contentCart").style.display = "flex";
	
	let viewport = document.querySelector(".cartViewport");
	viewport.style.display = "none";
	viewport.innerHTML = "";
	
	fetch("/calculator/", init)
		.then( response => response.json() )
		.then( function(data){ 
			document.querySelector(".contentCart img").style.display = "none";
			if( data.items.length > 0){
				
				viewport.style.display = "flex";
				
				document.querySelector(".contentCart").style.display = "grid";
				document.getElementById("checkout").style.display = "flex";
				
				for(let i = 0; i < data.items.length; i++){
					let card = document.createElement("div");
					card.classList.toggle("productPreviw");
					card.id = data.items[i].id;
					
					let elem = []
					elem.push(document.createElement("img"));
					elem[0].setAttribute("src",data.items[i].thumb);
					elem[0].setAttribute("class","thumbnail");
							
					elem.push(document.createElement("div"));
					elem[1].classList.toggle("cartProductColumn");
							
					let name = document.createElement("span");
					name.innerHTML = data.items[i].name;
					elem[1].appendChild(name);
							
					let remove = document.createElement("span");
					remove.innerHTML = "REMOVER ITEM";
					remove.classList.toggle("cartRemove");
					remove.setAttribute("onclick",`removeFromCart("${data.items[i].id}")`);
					elem[1].appendChild(remove);
							
					elem.push(document.createElement("div"));
					elem[2].classList.toggle("cartProductColumn");
							
							
							
					let total = document.createElement("span");
					total.innerHTML = data.items[i].subtotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
					total.classList.toggle("pricePreview");
					elem[2].appendChild(total);
							
					let numberProducts = document.createElement("span");
					let n = data.items[i].quantity;
					let price = data.items[i].price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
					numberProducts.innerHTML = `${n}x ${price}`;
					numberProducts.classList.toggle("numberProducts");
					elem[2].appendChild(numberProducts);

							
					for(let k = 0; k < elem.length; k++)
						card.appendChild(elem[k]);
					viewport.appendChild(card);
				}
				
				
				document.getElementById("subtotal").innerHTML = data.subtotal.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
				let parcel = data.subtotal.price / data.subtotal.installments;
				document.getElementById("installments").innerHTML = `até ${data.subtotal.installments}x de ${parcel.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`

			}
			else
				document.getElementById("emptyCart").style.display = "block";
			
		});
}

function displayBag(e){
	if(e.target.id == "bag" || e.target.parentElement.id == "bag")
		if(document.getElementById('cartPreview').style.display == 'flex'){
			document.getElementById('cartPreview').style.display = "none";
			return
		}
	if (window.matchMedia("(min-width: 1025px)").matches)
		document.getElementById('cartPreview').style.display='flex'
	else
		return;
	
	renderProductPreview();
}


function clearFilters(){
	let sizelist = document.querySelectorAll(".sizelist li");
	let colorlist = document.querySelectorAll(".colorlist li");
	let pricelist = document.querySelectorAll(".pricerangelist li");
	
	// Clear Size List
	sizelist.forEach(x => x.querySelector("input").checked = false);
	
	// Clear Color List
	colorlist.forEach(x => x.querySelector("input").checked = false);
	
	// Clear Price List
	pricelist.forEach(x => x.querySelector("input").checked = false);
	
	// Reload the Product List
	render(0,6);
}

function removeFromCart(id){
	document.getElementById(id).remove();
	var items = JSON.parse(localStorage.items);
	delete items[id]
	localStorage.items = JSON.stringify(items);
	
	updateNCart();
	renderProductPreview();
}