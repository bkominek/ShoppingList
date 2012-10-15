var totalPrice = 0;
var itemID = 0;
var globalTax = 13;
var totalTax = 0;
var store = "";
var shoppingID = 0;

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
}

function cancel() {
	$.mobile.changePage("#calculator");	
	document.getElementById("namefield").value = "";
	document.getElementById("pricefield").value = "";
	document.getElementById("discountfield").value = "";
}

function removeNoTax(id) {

}

function remove(id) {

}

function submit() {
	price = document.getElementById("pricefield");
	if (price.value.length < 1) {
		alert("Price must be filled out");
		return;
	}	

	
}

function addTax(price) {

}

function addNoTax(price) {

}

function toggleTax() {

}

function updateStore() {
	store = document.getElementById("location").value;
	document.getElementById("storeLocation").innerHTML = store;
	store = store.toLowerCase();
	store = store.replace(/\s/g, "+");
	cancelStoreUpdate();
}

function googleSearch(query, storeName, functionName, filter, backLocation) {
	document.getElementById("displayItemsBack").setAttribute("onclick", "$.mobile.changePage('#" + backLocation + "');");
	clearDiv("itemList");

	storeName = storeName.toLowerCase();
	query = query.replace(/\s/g, "+");
	if (storeName.length > 0) {
		query = query + "+" + storeName;
	}
	
	$.mobile.showPageLoadingMsg("a", "loading...");
    $.ajax({
        type: "GET",
      	url: "https://www.googleapis.com/shopping/search/v1/public/products?key=  ****INSERT KEY HERE****          &q=" + query + "&alt=json",
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
	
	//loop through each item here

	list.listview('refresh');
}

function getCoordinates() {
	$.mobile.showPageLoadingMsg();
	options = { enableHighAccuracy : true, timeout : 60000, maximumAge : 0 }
	navigator.geolocation.getCurrentPosition(getStoreName, geolocationError, options);

	function geolocationError(msg) {}
}

function getStoreName(coords) {
	var latlon = new google.maps.LatLng(coords.coords.latitude,coords.coords.longitude);

}

function selectItem(itemID) {

}

function toggleCompare() {
	
}

function compare(id) {

}

function compareItem(itemID) {

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
	document.getElementById("overlay").setAttribute("style", "margin-left:-30px");
	document.getElementById("fileContainer").setAttribute("style", "margin-left:-125px");
}

function setStoreBox() {
	document.getElementById("storeOverlay").setAttribute("style", "margin-left:-30px");
	document.getElementById("storeContainer").setAttribute("style", "margin-left:-125px");
}

function cancelStoreUpdate() {
	document.getElementById("storeOverlay").setAttribute("style", "margin-left:-9999px");
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
	//localStorage.clear();
	clearDiv("newItems");
	clearDiv("savedList");
	files = localStorage.getItem("filenames");

	if ( files == null) {
		$.mobile.changePage("#" + skipTo);
	} else {

		if (files.length == 2) {
			$.mobile.changePage("#" + skipTo);
		} else {
			$.mobile.changePage("#displayLists");
			fileNames = JSON.parse(files);
			list = $("#savedList");
			for (i = (fileNames.length - 1); i > -1; i--) {
				list.append($("<div id='saved" + i + "' class='savedItem'><a data-role='button' data-icon='delete' data-iconpos='notext' class='delete ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-undefined' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' style='z-index:5;float:left;position:relative;top:2px;margin-left:10px' onclick='deleteList(this.parentNode.id, \"" + fileNames[i] + "\")'><span class='ui-btn-inner io-btn-corner-all'><span class='ui-icon ui-icon-delete ui-icon-shadow'>&nbsp;</span></span></a><div class='textContainer' onclick='read(\"" + fileNames[i] + "\")'><div style='position:relative;top:12px'>" + fileNames[i] + "</div></div></div>"))
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

function deleteList(id, key) {
	filenames = JSON.parse(localStorage.getItem("filenames"));
	filenames = removeByValue(filenames, key);
	localStorage.setItem("filenames", JSON.stringify(filenames));
	localStorage.removeItem(key);
    
    $("#" + id).fadeOut(1000);
}

function clearDiv(name) {
	itemList = document.getElementById(name);
	while (itemList.hasChildNodes()) {
    	itemList.removeChild(itemList.lastChild);
	}
}


function errorHandler(e) {
    var msg = '';
    console.log(e);
    switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
        msg = 'QUOTA_EXCEEDED_ERR';
        break;
    case FileError.NOT_FOUND_ERR:
        msg = 'NOT_FOUND_ERR';
        break;
    case FileError.SECURITY_ERR:
         msg = 'SECURITY_ERR';
         break;
    case FileError.INVALID_MODIFICATION_ERR:
         msg = 'INVALID_MODIFICATION_ERR';
         break;
    case FileError.INVALID_STATE_ERR:
         msg = 'INVALID_STATE_ERR';
         break;
    default:
         msg = 'Unknown Error';
        break;
    };

    console.log('Error: ' + msg);
}

function cancelSave() {
	document.getElementById("overlay").setAttribute("style", "margin-left:-9999px");
	document.getElementById("saveAsName").value = "";
	document.getElementById("fileContainer").setAttribute("style", "margin-left:-9999px");
}

function searchItem1() {
	//set up variables here

	googleSearch(query, storeName, functionName, filter, backLocation);
}

function fillItem1(id) {
	// fill in elements here

	clearDiv("itemList");  // clear the search results

	document.getElementById("item1contents").setAttribute("style", "margin-left:0");  // make contents visible
	$("#item1contents").show();
	$.mobile.changePage("#compare2items");
}

function searchItem2() {
	// set up variables here
	
	googleSearch(query, storeName, functionName, filter, backLocation);
	$("#search2").hide();
}

function fillItem2(id) {
	// fill in elements here

	clearDiv("itemList");

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
	document.getElementById("overlay").setAttribute("style", "margin-left:-30px");
	document.getElementById("confirmBack").setAttribute("style", "margin-left:-125px");
}

function cancelConfirm() {
	document.getElementById("overlay").setAttribute("style", "margin-left:-9999px");
	document.getElementById("confirmBack").setAttribute("style", "margin-left:-9999px");
}

function okConfirm() {
	readFileNames('home');
	document.getElementById("overlay").setAttribute("style", "margin-left:-9999px");
	document.getElementById("confirmBack").setAttribute("style", "margin-left:-9999px");
}

function openLinkInBrowser(link) {
	decodedLink = $('<div />').html(link).text();

    blackberry.invoke.invoke({
   //     target: "sys.browser",
        uri: decodedLink
    }, onInvokeSuccess, onInvokeError);
}

function onInvokeSuccess() {
	/*console.log("invoke success");*/
//	alert("invoke success");
}
function onInvokeError(err) {
	/*console.log("invoke error: " + err);*/
	//alert(err);
}