window.addEventListener("load", function(){

	// Adding links to arrow buttons
	document.getElementById("arrow-prev").onclick = function(){
		window.location.assign(comicjet_prev_url);
	};
	document.getElementById("arrow-next").onclick = function(){
		window.location.assign(comicjet_next_url);
	};

	// Setting positioning of the navigation arrows
	var image = document.getElementById('bubble');
	var height = image.height;
	document.getElementById("arrow-prev").style.top = '0';
	document.getElementById("arrow-next").style.top = '0';
	document.getElementById("arrow-prev").style.height = height+'px';
	document.getElementById("arrow-next").style.height = height+'px';
	document.getElementById("arrow-prev").style.display = 'block';
	document.getElementById("arrow-next").style.display = 'block';

});