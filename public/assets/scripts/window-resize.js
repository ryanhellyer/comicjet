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

	var i = 0;
	while (i < 4) {

		if (document.getElementById('pulse-'+i)) {
			// Pulse buttons
			var position_top = height * (window['pulse_top_'+i] / 100);
			var position_left = width * (window['pulse_left_'+i] / 100);
			document.getElementById("pulse-"+i).style.top = position_top+'px';
			document.getElementById("pulse-"+i).style.left = position_left+'px';

			// Tutorial text
			var position_top = height * (window['tutorial_text_top_'+i] / 100);
			var position_left = width * (window['tutorial_text_left_'+i] / 100);
			var tutorial_width = width * (window['tutorial_text_width_'+i] / 100);
			document.getElementById("tutorial-text-"+i).style.top = position_top+'px';
			document.getElementById("tutorial-text-"+i).style.left = position_left+'px';
			document.getElementById("tutorial-text-"+i).style.width = tutorial_width+'px';
		}

		i++;
	}

	// Setting positioning of the navigation arrows
	var height = image.height;
	document.getElementById("arrow-prev").style.top = '0';
	document.getElementById("arrow-next").style.top = '0';
	document.getElementById("arrow-prev").style.height = height+'px';
	document.getElementById("arrow-next").style.height = height+'px';
	document.getElementById("arrow-prev").style.display = 'block';
	document.getElementById("arrow-next").style.display = 'block';

	// Make correct pulse blobs visible
	show_hide_tutorial();

	// Adding links to arrow buttons
	document.getElementById("arrow-prev").onclick = function(){
		window.location.assign(comicjet_prev_url);
	};
	document.getElementById("arrow-next").onclick = function(){
		window.location.assign(comicjet_next_url);
	};
}
window.onresize = function(event) {
	comic_resize();
};
window.onload = function(event){ 
	comic_resize();
}

function show_hide_tutorial() {
	console.log(tutorial_number);

	if (document.getElementById('pulse-'+tutorial_number)) {
		var elements = document.getElementsByClassName("pulse");
		Array.prototype.forEach.call(elements, function(element) {
			element.style.display = 'none';
		});
		if (document.getElementById('pulse-'+tutorial_number)) {
			var element = document.getElementById("pulse-"+tutorial_number);
			element.style.display = 'block';
		}

		var elements = document.getElementsByClassName("tutorial-text");
		Array.prototype.forEach.call(elements, function(element) {
			element.style.display = 'none';
		});
		if (document.getElementById('tutorial-text-'+tutorial_number)) {
			var element = document.getElementById("tutorial-text-"+tutorial_number);
			element.style.display = 'block';
		}
	}
}
