/*
 * Find the tutorial comic in the cookie, and hide the tutorial if it's already been completed.
 */
comics_read_json = getCookie("comics_read");
if ("" != comics_read_json) {
	var comics_read = JSON.parse(comics_read_json);
	if('end'==comics_read['tutorial']){
		// Hiding tutorial after it's been read
		if (document.getElementById("comic-tutorial")) {
			document.getElementById("comic-tutorial").style.display = "none";
		}
		document.getElementById("tutorial").style.display = "none";

	}
}