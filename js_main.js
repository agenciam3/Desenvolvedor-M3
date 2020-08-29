 function selectingByPrice(tag)
 {
 	var all = document.getElementsByClassName("filter");			/* All products */
 	var checkboxes = document.getElementById("price-filter");		/* Pricing checkboxes*/
 	var products = [];												/* Array of products array devided by price tag */
 	var showAll = true;												/* Var to verify if none of the checkboxes are checked */

 	/* Hiding all products */
 	for (i=0; i<all.length; i++)
 		all[i].style.display ='none';
  	
  	/* Checkboxes iteration */
  	for (i=0; i<checkboxes.length; i++)
  	{
  		products.push(document.getElementsByClassName(i.toString()));			/* Adding the array of products matching with the price tag */

  		if(checkboxes[i].checked)
  		{
  			showAll = false;

  			/* Iteration for products by a fixed price tag  */													
  			for (j=0; j<products[i].length; j++)
  				products[i][j].style.display = 'block';
  		}
	}

	/* Verifying if it should show every product */
	if (showAll || checkboxes[checkboxes.length-1].checked)
	{
		for (i=0; i<all.length; i++)
			all[i].style.display = 'block';
	}
 }