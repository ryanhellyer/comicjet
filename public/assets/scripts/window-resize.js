/**
 * Make the bubble visible.
 */
document.getElementById("bubble-2").style.display = 'block';

/**
 * Tutorial.
 */
function comic_resize() {
	var image = document.getElementById('bubble');
	var width = image.width;
	var height = image.height;

	if (document.getElementById('pulse')) {
		var position_top = (height/3.5)-40;
		var position_left = (width/1.6)-40;
		document.getElementById("pulse").style.top = position_top+'px';
		document.getElementById("pulse").style.left = position_left+'px';
	}

	// Setting positioning of the navigation arrows
	var height = image.height;
	if(document.getElementById("arrow-prev")){
		document.getElementById("arrow-prev").style.top = '0';
		document.getElementById("arrow-prev").style.height = height+'px';
		document.getElementById("arrow-prev").style.display = 'block';
	}

	if(document.getElementById("arrow-next")){
		document.getElementById("arrow-next").style.top = '0';
		document.getElementById("arrow-next").style.height = height+'px';
		document.getElementById("arrow-next").style.display = 'block';
	}

	// Make correct pulse blobs visible
	show_hide_tutorial();

	// Adding links to arrow buttons
	if(document.getElementById("arrow-prev")){
		document.getElementById("arrow-prev").onclick = function(){
			window.location.assign(comicjet_prev_url);
		};
	}
	if(document.getElementById("arrow-next")){
		document.getElementById("arrow-next").onclick = function(){
			window.location.assign(comicjet_next_url);
		};
	}

}
window.onresize = function(event) {
	comic_resize();
};
window.onload = function(event){ 
	comic_resize();
}

function show_hide_tutorial() {

	if (document.getElementById('pulse')) {
		if (document.getElementById('pulse')) {
			var element = document.getElementById("pulse");
			element.style.display = 'block';
		}
	}
}
