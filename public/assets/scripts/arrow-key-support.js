document.onkeydown = comicjet_keypress;

/**
 * Change language on pressing ENTER key.
 */
function comicjet_keypress(e) {

	e = e || window.event;

	if (typeof comicjet_prev_url != "undefined") {

		// ENTER - changes language
		if (e.keyCode == "13") {
			toggle_image();
		}

		// LEFT - switches to previous page
		if (e.keyCode == "37") {
			window.location.assign(comicjet_prev_url);
		}

		// RIGHT - switches to the next page
		if (e.keyCode == "39") {
			window.location.assign(comicjet_next_url);
		}
	}

}
