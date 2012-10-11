var totalPrice = 0;
var itemID = 0;
var globalTax = 13;
var totalTax = 0;
var store = "";
var shoppingID = 0;
var backPage = "home";

function onBackKeyDown() {
	if (backPage == "confirm") {
		setConfirmBox();
	} else {
 		$.mobile.changePage("#" + backPage);	
 	}
}

function setAbout() {
	$.mobile.changePage('#about');
	backPage = "home";
}

function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);

    $("#add").bind("pageshow", function(){
       	backPage = "calculator";
    });
    $("#compare").bind("pageshow", function(){
      	backPage = "calculator";
    });
    $("#calculator").bind("pageshow", function(){
      	backPage = "home";
    });
    $("#compare2items").bind("pageshow", function(){
       	backPage = "home";
    });
    $("#createList").bind("pageshow", function(){
       	backPage = "confirm";
    });
    $("#storeOverlay").hide();
    $("#overlay").hide();
    $("#deleteOverlay").hide();
} 


function addButton() {
	$.mobile.changePage("#add");
	items = $(".selectName");
	if (items.length > 0) {
		for (i = 0; i < items.length; i++) {
			items[i].className = "singleItem";
			items[i].removeAttribute("onclick");
			deleteButtons[i].setAttribute("style", "z-index:2");
		}
	}
	backPage = "calculator";
}

function cancel() {
	$.mobile.changePage("#calculator");	
	document.getElementById("namefield").value = "";
	document.getElementById("pricefield").value = "";
	document.getElementById("discountfield").value = "";
}

function removeNoTax(id) {
	price = document.getElementById("price" + id).innerHTML;
	totalPrice -= parseFloat(price);
	if (totalPrice < 0) {
		totalPrice = 0;
	}	

	document.getElementById("total").innerHTML = "$" + totalPrice.toFixed(2);
	removeItem("product" + id);
	if ($(".singleItem").length == 0) {
		$("#compareButton").hide();
	}
}

function remove(id) {
	price = document.getElementById("price" + id).innerHTML;
	if (totalPrice < 0) {
		totalPrice = 0;
	}

	tax = price * (globalTax / 100);
	totalTax -= tax;
	totalPrice -= parseFloat(price) + parseFloat(tax);
	document.getElementById("total").innerHTML = "$" + totalPrice.toFixed(2);
	document.getElementById("tax").innerHTML = totalTax.toFixed(2);

	removeItem("product" + id);

	if ($(".singleItem").length == 0) {
		$("#compareButton").hide();
	}

}

function submit() {
	price = document.getElementById("pricefield");
	if (price.value.length < 1) {
		alert("Price must be filled out");
		return;
	}	

	price.value = price.value.replace("$", "");

	discount = document.getElementById("discountfield");
	if (discount.value > 0) {

		var e = document.getElementById("discountType");
		var type = e.options[e.selectedIndex].value;
		if (type == "percent") {
			discount.value = discount.value / 100;
			price.value = price.value * (1 - discount.value);
		} else {
			price.value -= discount.value;
		}
	}

	if (document.getElementById("noTax").checked == false) {
		addTax(price.value);
	} else {
		addNoTax(price.value);
	}

	price.value = parseFloat(price.value).toFixed(2);

	//totalPrice += parseFloat(price.value);
	
	newDelete = document.createElement("a");
	newDelete.setAttribute("data-role", "button");
	newDelete.setAttribute("data-icon", "delete");
	newDelete.setAttribute("data-iconpos", "notext");
	newDelete.setAttribute("class", "delete ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-btn-icon-notext");
	newDelete.setAttribute("data-corners", "true");
	newDelete.setAttribute("data-shadow", "true");
	newDelete.setAttribute("data-iconshadow", "true");
	newDelete.setAttribute("data-wrapperels", "span");
	newDelete.setAttribute("title", "");

	if (document.getElementById("noTax").checked == false) {
		newDelete.setAttribute("onclick", "remove('" + itemID + "')");
	} else {
		newDelete.setAttribute("onclick", "removeNoTax('" + itemID + "')");
	}

	newSpan = document.createElement("span");
	newSpan.setAttribute("class", "ui-icon ui-icon-delete ui-icon-shadow");
	newSpan.innerHTML = "&nbsp;";

	spanContainer = document.createElement("span");
	spanContainer.setAttribute("class", "ui-btn-inner io-btn-corner-all")
	spanContainer.appendChild(newSpan);

	blankSpan = document.createElement("span");
	blankSpan.setAttribute("class", "ui-btn-text");
	
	newDelete.appendChild(spanContainer);

	newItem = document.createElement("div");
	newItem.setAttribute("id", "product" + itemID);
	newItem.setAttribute("class", "singleItem");

	newName = document.createElement("div");
	newName.setAttribute("class", "name");


	newPrice = document.createElement("div");

	if (document.getElementById("noTax").checked == false) {
		newPrice.setAttribute("class", "hasTax fullPrice");
	} else {
		newPrice.setAttribute("class", "noTax fullPrice");
	}

	newPrice.setAttribute("id", "price" + itemID);
	newPrice.innerHTML = parseFloat(price.value).toFixed(2);
	itemID += 1;

	nameDiv = document.createElement("div");
	nameDiv.setAttribute("style", "margin-top:-45px;margin-left:40px;");
	nameDiv.setAttribute("class", "itemName");
	nameDiv.innerHTML = document.getElementById("namefield").value;
	
	newName.appendChild(newDelete);
	newName.appendChild(nameDiv);

	/*hasTax = document.createElement("div");*/
	
	newItem.appendChild(newName);
	newItem.appendChild(newPrice);

	container = document.getElementById("itemsContainer");
	container.appendChild(newItem);

	$("#compareButton").show();
	
	$.mobile.changePage("#calculator");


	document.getElementById("namefield").value = "";
	price.value = "";
	discount.value = "";
}

function addTax(price) {
	tax = price * (globalTax / 100);
	totalTax += tax;
	totalPrice += parseFloat(price) + parseFloat(tax);
	document.getElementById("total").innerHTML = "$" + totalPrice.toFixed(2);
	document.getElementById("tax").innerHTML = totalTax.toFixed(2);
}

function addNoTax(price) {
	totalPrice += parseFloat(price);
	document.getElementById("total").innerHTML = "$" + totalPrice.toFixed(2);
}

function toggleTax() {

	allPrices = $('.hasTax');
	totalPrice = 0;
	for (i=0; i<allPrices.length; i++) {
		totalPrice += parseFloat(allPrices[i].innerHTML);
	}

	globalTax = document.getElementById("editTax").value;
	totalTax = totalPrice * (globalTax / 100);
	totalPrice += totalTax;

	allPricesNoTax = $(".noTax");
	for (i=0; i<allPricesNoTax.length; i++) {
		totalPrice += parseFloat(allPricesNoTax[i].innerHTML);
	}

	document.getElementById("total").innerHTML = "$" + totalPrice.toFixed(2);
	document.getElementById("tax").innerHTML = totalTax.toFixed(2);
}

function updateStore() {
	store = document.getElementById("location").value;
	document.getElementById("storeLocation").innerHTML = store;
	store = store.toLowerCase();
	store = store.replace(/\s/g, "+");
	cancelStoreUpdate();
}

function googleSearch(query, storeName, functionName, filter, backLocation) {

	backPage = backLocation;
	clearDiv("itemList");

	storeName = storeName.toLowerCase();
	query = query.replace(/\s/g, "+");
	if (storeName.length > 0) {
		query = query + "+" + storeName;
	}
	
	$.mobile.showPageLoadingMsg("a", "loading...");
    $.ajax({
        type: "GET",
      //  url: "http://www.searchupc.com/handlers/upcsearch.ashx?request_type=3&access_token=AA5C8628-05DB-46BF-91D9-6064B13368B7&upc=" + upcString, 
      	url: "https://www.googleapis.com/shopping/search/v1/public/products?key=AIzaSyC9OEeuM4-CSogXbDRn7osgGBnyZUvx_AI&country=US&q=" + query + "&alt=json",
        data: "{}",
        dataType: "jsonp",
        success: function(items) {
        	console.log(items);
        	if (items.totalItems > 0) {
        		displayItems(items.items, storeName, functionName, filter);
       		} else {
        		$.mobile.hidePageLoadingMsg();
        		alert("No items found");
        	}	
            
        },
        error: function(msg) {
        	$.mobile.hidePageLoadingMsg();
        	alert("Error: " + msg);
        }
    });
}

function displayItems(items, storeName, functionName, filter) {
	$.mobile.changePage("#displayItems");
	list = $("#itemList");
	for (i = 0; i < items.length; i++) {	

		comLocation = items[i].product.link.indexOf(".com");
		if (comLocation == -1) {
			comLocation = items[i].product.link.indexOf(".net");
		}
		if (comLocation == -1) {
			comLocation = items[i].product.link.indexOf(".ca");
		}
		if (comLocation == -1) {
			comLocation = items[i].product.link.indexOf(".org");
		}

		firstDot = items[i].product.link.indexOf(".");

		if (firstDot < comLocation) {
			itemLocation = items[i].product.link.substring(firstDot + 1, comLocation);
		} else {
			itemLocation = items[i].product.link.substring(7, comLocation);
		}
		

		if (filter == "all" || storeName == itemLocation){
			list.append($("<li onclick='" + functionName + "(" + i + ")'>")
						.data("theme", "a")
						.append($("<a>")
						.append($("<div id='item" + i + "'>")
							.append("<div class='listName'>" + items[i].product.title + "</div><div class='listPrice'>$" + items[i].product.inventories[0].price + "</div><br /><div class='itemLocation'>" + itemLocation + "</div><div class='link'>" + items[i].product.link + "</div>")
						)));
		}
	}
	list.listview('refresh');
}

function getCoordinates() {
	$.mobile.showPageLoadingMsg("a", "loading...");
	options = { enableHighAccuracy : true, timeout : 60000, maximumAge : 0 }
	navigator.geolocation.getCurrentPosition(getStoreName, geolocationError, options);

	function geolocationError(msg) {}
}

function getStoreName(coords) {
	var latlon = new google.maps.LatLng(coords.coords.latitude,coords.coords.longitude);

  map = new google.maps.Map(document.getElementById('map'), {
      center: latlon,
      zoom: 15
    });

	 var request = {
    location: latlon,
    radius: '500',
    rankby: "DISTANCE",
    types: ['store', 'bicycle_store', 'book_store', 'casino', 'clothing_store', 'convenience_store', 'department_store', 'electronics_store', 'grocery_or_supermarket', 'hardware_store', 'home_goods_store', 'jewelry_store', 'liquor_store', 'pet_store', 'shopping_mall']
  };

  service = new google.maps.places.PlacesService(map);
  service.search(request, callback);

  function callback(results, status) {
  	document.getElementById("storeLocation").innerHTML = results[0].name;
  	cancelStoreUpdate();
  	$.mobile.hidePageLoadingMsg();
  }
	
}

function selectItem(itemID) {
	item = document.getElementById("item" + itemID);
	document.getElementById("namefield").value = item.getElementsByClassName("listName")[0].innerHTML;
	document.getElementById("pricefield").value = item.getElementsByClassName("listPrice")[0].innerHTML;

	$.mobile.changePage("#add");
}

function toggleCompare() {
	items = $(".singleItem");
	deleteButtons = $(".delete");
	if (items.length > 0) {
		for (i = 0; i < items.length; i++) {
			items[i].className = "selectName";
			items[i].setAttribute("onclick", "compare('" + items[i].id + "')");
			deleteButtons[i].setAttribute("style", "z-index:-3");
		}
	} else {
		items = $(".selectName");
		if (items.length > 0) {
			for (i = 0; i < items.length; i++) {
				items[i].className = "singleItem";
				items[i].removeAttribute("onclick");
				deleteButtons[i].setAttribute("style", "z-index:2");
			}
		}
	}
}

function compare(id) {
	$.mobile.changePage("#compare");
	items = $(".selectName");
	deleteButtons = $(".delete");
	if (items.length > 0) {
		for (i = 0; i < items.length; i++) {
			items[i].className = "singleItem";
			items[i].setAttribute("onclick", "");
			deleteButtons[i].setAttribute("style", "z-index:2");
		}
	}
	
	item = document.getElementById(id)
	document.getElementById("compareName1").innerHTML = item.getElementsByClassName("itemName")[0].innerHTML;
	document.getElementById("comparePrice1").innerHTML = "$" + item.getElementsByClassName("fullPrice")[0].innerHTML;
	document.getElementById("compareLocation1").innerHTML = store;
}

function compareItem(itemID) {
	$.mobile.changePage("#compareItems");
	item = document.getElementById("item" + itemID);	
	console.log(itemID);
	console.log(item);

	price1 = document.getElementById("comparePrice1").innerHTML;
	price2 = item.getElementsByClassName("listPrice")[0].innerHTML;
	price1 = price1.replace("$", "");
	price2 = price2.replace("$", "");

	document.getElementById("finalName1").innerHTML = document.getElementById("compareName1").innerHTML;
	document.getElementById("finalPrice1").innerHTML = "$" + price1;
	if (store.length > 0) {
		document.getElementById("finalLocation1").innerHTML = store;
	} else {
		document.getElementById("finalLocation1").innerHTML = "&nbsp;";
	}

	document.getElementById("finalName2").innerHTML = item.getElementsByClassName("listName")[0].innerHTML;
	document.getElementById("finalPrice2").innerHTML = "$" + price2;
	document.getElementById("finalLocation2").innerHTML = item.getElementsByClassName("itemLocation")[0].innerHTML;
	document.getElementById("itemLink").setAttribute("onclick", "openLinkInBrowser(item.getElementsByClassName('link')[0].innerHTML)");

	difference = parseFloat(price1) - parseFloat(price2);
	document.getElementById("difference").innerHTML = "$" + difference.toFixed(2);

	clearDiv("itemList");
}

function addToQuickList() {
	item = document.getElementById('newItemInput');

	if (item.value != "") {
		addItem(item.value);
		item.value = '';
	}
}

function addItem(input) {

	$("<div class='newitem' id='shopping" + shoppingID + "'><div class='itemText'>" + input + "</div></div>")
		.hide()
		.appendTo("#newItems")
		.fadeIn(1000);

	newDelete = document.createElement("a");
	newDelete.setAttribute("data-role", "button");
	newDelete.setAttribute("data-icon", "delete");
	newDelete.setAttribute("data-iconpos", "notext");
	newDelete.setAttribute("class", "removeButton ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-btn-icon-notext");
	newDelete.setAttribute("data-corners", "true");
	newDelete.setAttribute("data-shadow", "true");
	newDelete.setAttribute("data-iconshadow", "true");
	newDelete.setAttribute("data-wrapperels", "span");
	newDelete.setAttribute("title", "");
	newDelete.setAttribute("onclick", "");
	
	newSpan = document.createElement("span");
	newSpan.setAttribute("class", "ui-icon ui-icon-delete ui-icon-shadow");
	newSpan.innerHTML = "&nbsp;";

	spanContainer = document.createElement("span");
	spanContainer.setAttribute("class", "ui-btn-inner io-btn-corner-all")
	spanContainer.appendChild(newSpan);

	blankSpan = document.createElement("span");
	blankSpan.setAttribute("class", "ui-btn-text");
	
	newDelete.appendChild(spanContainer);

	parent = document.getElementById("shopping" + shoppingID);
	parent.insertBefore(newDelete,parent.firstChild);

	removeButtons = $(".removeButton");
	removeButtons.hide();
	items = $(".setRemove");
	if (items.length > 0) {
		for (i = 0; i < items.length; i++) {
			items[i].className = "newitem";
		//	items[i].setAttribute("onclick", "");
		//	removeButtons[i].setAttribute("style", "z-index:-3");
		}
	}

	$("#shopping" + shoppingID).bind("swiperight", function(newItem) {
		newItem.delegateTarget.lastChild.setAttribute("style", "text-decoration:line-through");
	})
	.bind("swipeleft", function(newItem) {
		newItem.delegateTarget.lastChild.setAttribute("style", "text-decoration:none");
	});
    shoppingID += 1;

}

function toggleRemove() {
	items = $(".newitem");
	removeButtons = $(".removeButton");
	if (items.length > 0) {
		for (i = 0; i < items.length; i++) {
			items[i].className = "setRemove";
			items[i].setAttribute("onclick", "removeItem('" + items[i].id + "')");
		//	removeButtons[i].setAttribute("style", "z-index:2");
		}
		removeButtons.show();
	} else {
		items = $(".setRemove");
		if (items.length > 0) {
			for (i = 0; i < items.length; i++) {
				items[i].className = "newitem";
				items[i].removeAttribute("onclick");
			//	removeButtons[i].setAttribute("style", "z-index:-3");
			}
		}
		
		removeButtons.hide();
	}
}

function removeItem(id) {
	$("#" + id).fadeOut(1000, function() { $(this).remove(); });
}

function setSaveBox() {
	$("#overlay").show();
	//document.getElementById("overlay").setAttribute("style", "margin-left:-30px");
	document.getElementById("fileContainer").setAttribute("style", "margin-left:-125px");
}

function setStoreBox() {
//	document.getElementById("storeOverlay").setAttribute("style", "margin-left:-30px");
	$("#storeOverlay").show();
	document.getElementById("storeContainer").setAttribute("style", "margin-left:-125px");
}

function cancelStoreUpdate() {
	//document.getElementById("storeOverlay").setAttribute("style", "margin-left:-9999px");
	$("#storeOverlay").hide();
	document.getElementById("location").value = "";
	document.getElementById("storeContainer").setAttribute("style", "margin-left:-9999px");
}

function save() {
	//localStorage.clear();
	
	file = document.getElementById("saveAsName").value;
	if (localStorage.getItem("filenames") == null) {
		var newFile = [];
		newFile[0] = file;
		localStorage.setItem("filenames", JSON.stringify(newFile));
	} else {
		fileNames = JSON.parse(localStorage.getItem("filenames"));		
		fileNames[fileNames.length] = file;
		localStorage.setItem("filenames", JSON.stringify(fileNames));
	}

	items = $(".itemText");
    text = "";
    for (i = 0; i < items.length; i++) {
       	text += items[i].innerHTML;
       	if (i != items.length - 1) {
       		text += ",";
       	}
    }
    localStorage.setItem(file, text);
    cancelSave();
	alert("List saved!");
}

function readFileNames(skipTo) {
//	localStorage.clear();
	clearDiv("newItems");
	clearDiv("savedList");
	files = localStorage.getItem("filenames");
//	backPage = "home";	

	if ( files == null) {
		$.mobile.changePage("#" + skipTo);
		
		if (skipTo == "createList") {
	//		backPage = "confirm";
		}

	} else {

		if (files.length == 2) {
			$.mobile.changePage("#" + skipTo);
			if (skipTo == "createList") {
	//			backPage = "confirm";
			}
		} else {
			backPage = "home";	
			$.mobile.changePage("#displayLists");
			fileNames = JSON.parse(files);
			list = $("#savedList");
			for (i = (fileNames.length - 1); i > -1; i--) {
				list.append($("<div id='saved" + i + "' class='savedItem'><div class='deleteClickHelper' onclick='setDeleteListBox(this.parentNode.id, \"" + fileNames[i] + "\")'><a data-role='button' data-icon='delete' data-iconpos='notext' class='delete ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-undefined' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' style='z-index:5;float:left;position:relative;top:2px;margin-left:10px' ><span class='ui-btn-inner io-btn-corner-all'><span class='ui-icon ui-icon-delete ui-icon-shadow'>&nbsp;</span></span></a></div><div class='textContainer' onclick='read(\"" + fileNames[i] + "\")'><div style='position:relative;top:12px'>" + fileNames[i] + "</div></div></div>"))
			}
		}
	}
}

function read(filename) {
	text = localStorage.getItem(filename);
	result = text.split(",");
    for (i = 0; i < result.length; i++) {
        addItem(result[i])
    }
    $.mobile.changePage("#createList");
 //   backPage = "confirm";	
}

function removeByValue(arr){
    var what, a= arguments, L= a.length, ax;
    while(L> 1 && arr.length){
        what= a[--L];
        while((ax= arr.indexOf(what))!= -1){
            arr.splice(ax, 1);
        }
    }
    return arr;
}

function setDeleteListBox(id, key) {
	//document.getElementById("deleteOverlay").setAttribute("style", "margin-left:-30px");
	$("#deleteOverlay").show();
	document.getElementById("confirmDelete").setAttribute("style", "margin-left:-125px");
	document.getElementById("deleteListButton").setAttribute("onclick", "deleteList('" + id + "','" + key + "')")
}

function cancelDeleteList() {
	//document.getElementById("deleteOverlay").setAttribute("style", "margin-left:-9999px");
	$("#deleteOverlay").hide();
	document.getElementById("confirmDelete").setAttribute("style", "margin-left:-9999px");
}

function deleteList(id, key) {
	filenames = JSON.parse(localStorage.getItem("filenames"));
	filenames = removeByValue(filenames, key);
	localStorage.setItem("filenames", JSON.stringify(filenames));
	localStorage.removeItem(key);
	cancelDeleteList();
    
    $("#" + id).fadeOut(1000);
}

function clearDiv(name) {
	itemList = document.getElementById(name);
	while (itemList.hasChildNodes()) {
    	itemList.removeChild(itemList.lastChild);
	}
}

function cancelSave() {
//	document.getElementById("overlay").setAttribute("style", "margin-left:-9999px");
	$("#overlay").hide();
	document.getElementById("saveAsName").value = "";
	document.getElementById("fileContainer").setAttribute("style", "margin-left:-9999px");
}

function searchItem1() {
	query = document.getElementById("itemSearchName").value;
	storeName = document.getElementById("item1SearchLocation").value;
	filter = "all";
	functionName = "fillItem1";
	backLocation = "compare2items";
	googleSearch(query, storeName, functionName, filter, backLocation);
	
}

function fillItem1(id) {
	item = document.getElementById("item" + id);
	document.getElementById("item1Name").innerHTML = item.getElementsByClassName("listName")[0].innerHTML;
	document.getElementById("item1Price").innerHTML = item.getElementsByClassName("listPrice")[0].innerHTML;
	document.getElementById("item1Location").innerHTML = item.getElementsByClassName("itemLocation")[0].innerHTML;
	document.getElementById("item1Link").setAttribute("onclick", "openLinkInBrowser(item.getElementsByClassName('link')[0].innerHTML)");
	document.getElementById("itemSearchName").value = item.getElementsByClassName("listName")[0].innerHTML;

	clearDiv("itemList");
	$("#search1").hide();
	$("#search2").show();

	document.getElementById("item1contents").setAttribute("style", "margin-left:0");
	$("#item1contents").show();
	$.mobile.changePage("#compare2items");
}

function searchItem2() {
	
	query = document.getElementById("itemSearchName").value;
	storeName = document.getElementById("item2SearchLocation").value;
	filter = "all";
	functionName = "fillItem2";
	backLocation = "compare2items";
	googleSearch(query, storeName, functionName, filter, backLocation);
	
}

function fillItem2(id) {
	item = document.getElementById("item" + id);
	document.getElementById("item2Name").innerHTML = item.getElementsByClassName("listName")[0].innerHTML;
	document.getElementById("item2Price").innerHTML = item.getElementsByClassName("listPrice")[0].innerHTML;
	document.getElementById("item2Location").innerHTML = item.getElementsByClassName("itemLocation")[0].innerHTML;
	document.getElementById("item2Link").setAttribute("onclick", "openLinkInBrowser(item.getElementsByClassName('link')[0].innerHTML)");

	clearDiv("itemList");
	$("#search2").hide();

	document.getElementById("item2contents").setAttribute("style", "margin-left:0");
	$("#item2contents").show();
	$.mobile.changePage("#compare2items");
}

function resetCompare() {
	document.getElementById("itemSearchName").value = "";
	document.getElementById("item1SearchLocation").value = "";
	document.getElementById("item2SearchLocation").value = "";
	$("#item1contents").hide();
	$("#item2contents").hide();
	$("#search1").show();
	$("#search2").hide();
}

function setConfirmBox() {
	//document.getElementById("overlay").setAttribute("style", "margin-left:-30px");
	$("#overlay").show();
	document.getElementById("confirmBack").setAttribute("style", "margin-left:-125px");
}

function cancelConfirm() {
	$("#overlay").hide();
	//document.getElementById("overlay").setAttribute("style", "margin-left:-9999px");
	document.getElementById("confirmBack").setAttribute("style", "margin-left:-9999px");
}

function okConfirm() {
	readFileNames('home');
	$("#overlay").hide();
	//document.getElementById("overlay").setAttribute("style", "margin-left:-9999px");
	document.getElementById("confirmBack").setAttribute("style", "margin-left:-9999px");
}

function openLinkInBrowser(link) {
	decodedLink = $('<div />').html(link).text();
    navigator.app.loadUrl(decodedLink, { openExternal:true } ); 
}
