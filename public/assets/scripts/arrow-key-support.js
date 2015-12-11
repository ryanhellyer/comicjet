document.onkeydown = comicjet_keypress;

/**
 * Change language on pressing ENTER key.
 */
function comicjet_keypress(e) {

	e = e || window.event;

	// ENTER - changes language
	if (e.keyCode == "13") {
		toggle_image();
	}

	if (typeof comicjet_prev_url != "undefined") {
		// LEFT - switches to previous page
		if (e.keyCode == "37") {
			window.location.assign(comicjet_prev_url);
		}
	}

	if (typeof comicjet_next_url != "undefined") {
		// RIGHT - switches to the next page
		if (e.keyCode == "39") {
			window.location.assign(comicjet_next_url);
		}
	}

}

var bla = document.getElementById( 'tutorial-heading' );
console.log(bla);
