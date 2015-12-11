/*
 * Find the tutorial comic in the cookie, and hide the tutorial if it's already been completed.
 */
var tutorial = getCookie('tutorial');
if ('start' == tutorial) {
	var title = '<h1 id="site-title">Introduction to Comic Jet!</h1>';
	var instruction_text1 = 'Click on the comic to switch it to English';
	var instruction_text2 = 'Did you notice the comic switched to English? Click again to switch to Deutsch.';
	var instruction_text3 = 'Congratulations! Click the logo above to begin learning German by reading comics.';
	var instruction = '<div id="tutorial-heading-wrapper"><div id="tutorial-heading"><div id="tutorial-inner"></div></div></div>';

	var pulse = '<button id="pulse" class="toggle-image pulse"></button>';
	var tutorial_html = title+instruction+'<div id="comic-display"><div class="image-display"><img id="bubble-2" src="https://dev.comicjet.com/assets/tutorial/1-en.png" /><img id="bubble" onmouseover="this.style.cursor=\'pointer\'" class="toggle-image" src="https://dev.comicjet.com/assets/tutorial/1-de.png" />'+pulse+'</div></div>';

	document.getElementById('the-tutorial').innerHTML = tutorial_html;

	// Set the current instructions
	var instruction_text;
	document.getElementById('tutorial-inner').innerHTML = instruction_text1;

	document.getElementById('comic-type').style.display = 'none';
	document.getElementById('site-title').style.display = 'none';

	/**
	 * Toggle between images.
	 */
	function toggle_image() {
		var img = document.getElementById("bubble").src;
		if (img.indexOf(bubble_image_1)!=-1) {
			document.getElementById("bubble").src  = bubble_image_0;
		} else {
			document.getElementById("bubble").src = bubble_image_1;
		}

		if(''==document.getElementById('tutorial-inner').innerHTML){
			instruction_text = instruction_text1;
		} else if(instruction_text1==document.getElementById('tutorial-inner').innerHTML){
			instruction_text = instruction_text2;
		} else if(instruction_text2==document.getElementById('tutorial-inner').innerHTML){
			instruction_text = instruction_text3;
			setCookie('tutorial', 'end', 999); // Turn of tutorial
			document.getElementById('pulse').style.display = 'none'; // hide the pulse button since we're at the end of the tutorial
		}
		document.getElementById('tutorial-inner').innerHTML = instruction_text;

	}
	var bubble_image_0 = 'https://dev.comicjet.com/assets/tutorial/1-en.png';
	var bubble_image_1 = 'https://dev.comicjet.com/assets/tutorial/1-de.png';
	var current_language1 = 'en';
	var current_language2 = 'de';
	var toggle_the_image = document.getElementsByClassName('toggle-image');
	for(var i=0;i<toggle_the_image.length;i++){
		toggle_the_image[i].addEventListener('click', toggle_image, false);
	}

} else if ('end' == tutorial) {
	document.getElementById('comic-selection').style.display = 'block';
} else {
}
