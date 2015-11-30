/**
 * Add a pulse blob to the tutorial item on the home page.
 */
window.onload = function(event){ 

	// Adding the pulsing blob
	var tutorial = document.getElementById('comic-tutorial').innerHTML;
	document.getElementById('comic-tutorial').innerHTML = tutorial+'<button id="pulse-0" class="toggle-image pulse"></button>';
	document.getElementById('pulse-0').style.display='block';
	document.getElementById('pulse-0').style.position='absolute';

	// Positioning the pulsing blob based on the image size
	var width = document.getElementById('comic-thumb-tutorial').width;
	var height = document.getElementById('comic-thumb-tutorial').height;

	var pulsewidth = 40;
	document.getElementById('pulse-0').style.top=((height-pulsewidth)/2)+'px';
	document.getElementById('pulse-0').style.left=((width-pulsewidth)/2)+'px';

	// Make pulse button clickable
	var href = document.getElementById('comic-link-1').href;
	document.getElementById('pulse-0').onclick = function(){
		window.location.assign(href);
	};
}
